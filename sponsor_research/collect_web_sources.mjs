import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { parseCsv, toCsv } from "./csv_utils.mjs";

const repoRoot = process.cwd();
const dataDir = path.join(repoRoot, "sponsor_research");
const snapshotRoot = path.join(repoRoot, "event_intel", "source_snapshots");

const queuePath = path.join(dataDir, "event_monitor_queue.csv");
const outputPath = path.join(dataDir, "source_snapshots.csv");

const args = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i];
  if (arg.startsWith("--")) {
    const [key, inlineValue] = arg.slice(2).split("=");
    const nextValue = process.argv[i + 1];
    if (inlineValue !== undefined) {
      args.set(key, inlineValue);
    } else if (nextValue && !nextValue.startsWith("--")) {
      args.set(key, nextValue);
      i += 1;
    } else {
      args.set(key, "true");
    }
  }
}

const limit = Number(args.get("limit") || 0);
const includeSocial = args.get("include-social") === "true";
const timeoutMs = Number(args.get("timeout-ms") || 15000);

const snapshotHeaders = [
  "snapshot_id",
  "source_key",
  "checked_at",
  "monitor_rank",
  "host_id",
  "host_name",
  "channel_type",
  "channel_value",
  "url",
  "status",
  "status_code",
  "detected_change",
  "content_hash",
  "text_hash",
  "raw_html_path",
  "extracted_text_path",
  "error",
  "notes"
];

function slugify(value) {
  return String(value || "source")
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90) || "source";
}

function hash(value) {
  return crypto.createHash("sha256").update(value || "").digest("hex");
}

function stripHtml(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<\/(p|div|section|article|li|ul|ol|h[1-6]|tr|br)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

function isPublicWebSource(row) {
  if (!row.url?.startsWith("http")) return false;
  if (row.access_method !== "public web") return false;
  if (includeSocial) return true;
  return !/(instagram\.com|facebook\.com|fb\.me|tiktok\.com|youtube\.com)/i.test(row.url);
}

function sourceKey(row) {
  return [
    row.host_id,
    row.channel_type,
    slugify(row.url)
  ].join("__");
}

async function readExistingSnapshots() {
  try {
    return parseCsv(await fs.readFile(outputPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function latestBySource(rows) {
  const latest = new Map();
  for (const row of rows) {
    const current = latest.get(row.source_key);
    if (!current || row.checked_at > current.checked_at) {
      latest.set(row.source_key, row);
    }
  }
  return latest;
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "PinchySlabFaceEventMonitor/0.1 (+https://pinchyslabface.com)"
      }
    });
  } finally {
    clearTimeout(timeout);
  }
}

const queue = parseCsv(await fs.readFile(queuePath, "utf8"));
const existingSnapshots = await readExistingSnapshots();
const latestSnapshots = latestBySource(existingSnapshots);
const candidates = queue.filter(isPublicWebSource).slice(0, limit || undefined);

const checkedAt = new Date().toISOString();
const dateFolder = checkedAt.slice(0, 10);
const outputDir = path.join(snapshotRoot, dateFolder);
await fs.mkdir(outputDir, { recursive: true });

const newRows = [];

for (const row of candidates) {
  const key = sourceKey(row);
  const snapshotId = `${checkedAt.replace(/[:.]/g, "-")}__${slugify(key)}`;
  const rawPath = path.join(outputDir, `${snapshotId}.html`);
  const textPath = path.join(outputDir, `${snapshotId}.txt`);
  const rawRelPath = path.relative(repoRoot, rawPath);
  const textRelPath = path.relative(repoRoot, textPath);

  try {
    const response = await fetchWithTimeout(row.url);
    const html = await response.text();
    const text = stripHtml(html);
    const contentHash = hash(html);
    const textHash = hash(text);
    const previous = latestSnapshots.get(key);
    const detectedChange = !previous
      ? "first_snapshot"
      : previous.text_hash === textHash
        ? "no_change"
        : "changed_since_last_check";

    await fs.writeFile(rawPath, html);
    await fs.writeFile(textPath, text);

    newRows.push({
      snapshot_id: snapshotId,
      source_key: key,
      checked_at: checkedAt,
      monitor_rank: row.monitor_rank,
      host_id: row.host_id,
      host_name: row.host_name,
      channel_type: row.channel_type,
      channel_value: row.channel_value,
      url: row.url,
      status: response.ok ? "fetched" : "source_broken",
      status_code: response.status,
      detected_change: detectedChange,
      content_hash: contentHash,
      text_hash: textHash,
      raw_html_path: rawRelPath,
      extracted_text_path: textRelPath,
      error: "",
      notes: response.ok ? "Captured public web source for later parsing and review." : response.statusText
    });
  } catch (error) {
    newRows.push({
      snapshot_id: snapshotId,
      source_key: key,
      checked_at: checkedAt,
      monitor_rank: row.monitor_rank,
      host_id: row.host_id,
      host_name: row.host_name,
      channel_type: row.channel_type,
      channel_value: row.channel_value,
      url: row.url,
      status: "fetch_error",
      status_code: "",
      detected_change: "unknown",
      content_hash: "",
      text_hash: "",
      raw_html_path: "",
      extracted_text_path: "",
      error: error.name === "AbortError" ? `Timed out after ${timeoutMs}ms` : error.message,
      notes: "Fetch failed; keep source in review queue."
    });
  }
}

const allRows = [...existingSnapshots, ...newRows];
await fs.writeFile(outputPath, toCsv(allRows, snapshotHeaders));

const changedCount = newRows.filter((row) => row.detected_change === "changed_since_last_check").length;
const firstSnapshotCount = newRows.filter((row) => row.detected_change === "first_snapshot").length;
const errorCount = newRows.filter((row) => row.status === "fetch_error" || row.status === "source_broken").length;

console.log(`Checked ${newRows.length} public web sources.`);
console.log(`First snapshots: ${firstSnapshotCount}`);
console.log(`Changed since last check: ${changedCount}`);
console.log(`Errors or broken sources: ${errorCount}`);
console.log(`Snapshot index: ${path.relative(repoRoot, outputPath)}`);
console.log(`Snapshot files: ${path.relative(repoRoot, outputDir)}`);
