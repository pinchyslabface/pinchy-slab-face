import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { parseCsv, toCsv } from "./csv_utils.mjs";

const repoRoot = process.cwd();
const dataDir = path.join(repoRoot, "sponsor_research");

const snapshotsPath = path.join(dataDir, "source_snapshots.csv");
const outputPath = path.join(dataDir, "event_candidates.csv");

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

const includeNoChange = args.get("include-no-change") === "true";
const reset = args.get("reset") === "true";
const limit = Number(args.get("limit") || 0);

const candidateHeaders = [
  "candidate_id",
  "candidate_key",
  "created_at",
  "snapshot_id",
  "source_key",
  "host_id",
  "host_name",
  "source_url",
  "source_checked_at",
  "source_detected_change",
  "candidate_title",
  "date_clues",
  "location_clues",
  "event_type_clues",
  "raw_text_excerpt",
  "parser_confidence",
  "missing_fields",
  "review_status",
  "parser_notes"
];

const eventKeywords = [
  "competition",
  "comp",
  "finals",
  "qualifier",
  "qualifiers",
  "titles",
  "social",
  "jam",
  "pumpfest",
  "grip",
  "rip",
  "workshop",
  "clinic",
  "class",
  "yoga",
  "league",
  "meet",
  "session",
  "festival",
  "round",
  "fundraiser",
  "movie night",
  "setter"
];

const strongEventKeywords = [
  "competition",
  "comp",
  "finals",
  "qualifier",
  "qualifiers",
  "titles",
  "jam",
  "pumpfest",
  "grip & rip",
  "league",
  "round",
  "festival"
];

const navNoise = new Set([
  "home",
  "menu",
  "close",
  "open menu",
  "close menu",
  "instagram",
  "facebook",
  "youtube",
  "pricing",
  "contact us",
  "online waiver",
  "privacy policy",
  "copyright"
]);

const rejectPatterns = [
  /\bopening hours?\b/i,
  /\bpublic holidays?\b/i,
  /\bgoogle reviews?\b/i,
  /\bbirthday part(?:y|ies)\b/i,
  /\bcall us\b/i,
  /\bphone:\b/i,
  /\bemail:\b/i,
  /\bpricing\b/i,
  /\bfirst time visitor\b/i,
  /\bgift certificate\b/i,
  /\bnew merchandise\b/i,
  /\bonline store\b/i,
  /\baddress\b/i,
  /\bdirections\b/i,
  /\bjoin our facebook community\b/i,
  /\bnew climbs every\b/i,
  /\b\d+\s+routes?\b/i,
  /\b\d+\s+boulder problems?\b/i,
  /\b\d+\s*m2\s*bouldering\b/i,
  /\b\d+-\d+\s*m high walls?\b/i
];

const datePattern = new RegExp([
  "\\b\\d{1,2}(?:st|nd|rd|th)?\\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\\b",
  "\\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\\s+\\d{1,2}(?:st|nd|rd|th)?\\b",
  "\\b(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\\s+\\d{1,2}(?:st|nd|rd|th)?\\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\\b",
  "\\b\\d{1,2}/\\d{1,2}(?:/\\d{2,4})?\\b",
  "\\b\\d{4}-\\d{2}-\\d{2}\\b"
].join("|"), "ig");

const timePattern = /\b\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/ig;

function hash(value) {
  return crypto.createHash("sha256").update(value || "").digest("hex").slice(0, 16);
}

function compact(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function readExistingCandidates() {
  if (reset) return Promise.resolve([]);
  return fs.readFile(outputPath, "utf8")
    .then((text) => parseCsv(text))
    .catch((error) => {
      if (error.code === "ENOENT") return [];
      throw error;
    });
}

function isParseableSnapshot(row) {
  if (row.status !== "fetched") return false;
  if (!row.extracted_text_path) return false;
  if (includeNoChange) return true;
  return row.detected_change === "first_snapshot" || row.detected_change === "changed_since_last_check";
}

function lineLooksUseful(line, context) {
  const text = compact(line);
  if (text.length < 8 || text.length > 260) return false;
  if (navNoise.has(text.toLowerCase())) return false;
  if (rejectPatterns.some((pattern) => pattern.test(text))) return false;

  const contextText = compact(context);
  if (rejectPatterns.some((pattern) => pattern.test(contextText)) && !/comp|final|qualifier|title|jam|league|round|festival/i.test(contextText)) {
    return false;
  }

  const lower = text.toLowerCase();
  const contextLower = contextText.toLowerCase();
  const hasStrongKeyword = strongEventKeywords.some((keyword) => lower.includes(keyword));
  const hasActivityKeyword = eventKeywords.some((keyword) => lower.includes(keyword) || contextLower.includes(keyword));
  const hasDate = datePattern.test(contextText);
  const hasTime = timePattern.test(contextText);
  datePattern.lastIndex = 0;
  timePattern.lastIndex = 0;

  return hasStrongKeyword || hasDate || (hasActivityKeyword && hasTime);
}

function extractMatches(pattern, text) {
  const matches = text.match(pattern) || [];
  pattern.lastIndex = 0;
  return [...new Set(matches.map(compact))];
}

function eventTypeClues(text) {
  const lower = text.toLowerCase();
  return eventKeywords.filter((keyword) => lower.includes(keyword)).slice(0, 8);
}

function locationClues(text) {
  const clues = [];
  const addressMatch = text.match(/\b\d{1,5}\s+[A-Z][A-Za-z'.-]+(?:\s+[A-Z][A-Za-z'.-]+){0,5}\s+(?:Street|St|Road|Rd|Avenue|Ave|Drive|Dr|Lane|Ln|Boulevard|Blvd|Highway|Hwy)\b/g);
  if (addressMatch) clues.push(...addressMatch);
  const stateMatch = text.match(/\b(?:NSW|VIC|QLD|WA|SA|ACT|TAS|NT)\b/g);
  if (stateMatch) clues.push(...stateMatch);
  return [...new Set(clues.map(compact))].slice(0, 6);
}

function nearestTitle(lines, index) {
  const candidates = [];
  for (let offset = 0; offset <= 4; offset += 1) {
    for (const cursor of [index - offset, index + offset]) {
      const line = compact(lines[cursor]);
      if (!line || navNoise.has(line.toLowerCase())) continue;
      if (line.length < 4 || line.length > 90) continue;
      candidates.push(line);
    }
  }

  return candidates.find((line) => {
    const lower = line.toLowerCase();
    return strongEventKeywords.some((keyword) => lower.includes(keyword));
  }) || candidates[0] || compact(lines[index]).slice(0, 90);
}

function confidenceFor(text, dateClues, types, locations) {
  let score = 0.25;
  if (dateClues.length > 0) score += 0.25;
  if (types.length > 0) score += 0.15;
  if (types.some((type) => strongEventKeywords.includes(type))) score += 0.15;
  if (locations.length > 0) score += 0.1;
  if (text.length > 80) score += 0.05;
  return Math.min(score, 0.9).toFixed(2);
}

function missingFields(title, dateClues, locations) {
  const missing = [];
  if (!title) missing.push("title");
  if (dateClues.length === 0) missing.push("date");
  if (locations.length === 0) missing.push("location");
  return missing.length ? missing.join(";") : "";
}

async function candidatesFromSnapshot(snapshot, createdAt) {
  const textPath = path.join(repoRoot, snapshot.extracted_text_path);
  const text = await fs.readFile(textPath, "utf8");
  const lines = text.split(/\r?\n/).map(compact).filter(Boolean);
  const candidates = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const contextLines = lines.slice(Math.max(0, index - 2), Math.min(lines.length, index + 4));
    const context = compact(contextLines.join(" | "));
    if (!lineLooksUseful(line, context)) continue;
    const dateClues = [
      ...extractMatches(datePattern, context),
      ...extractMatches(timePattern, context)
    ];
    const types = eventTypeClues(context);
    const locations = locationClues(context);
    const title = nearestTitle(lines, index);
    const key = hash([
      snapshot.source_key,
      title.toLowerCase(),
      dateClues.join("|").toLowerCase()
    ].join("::"));

    candidates.push({
      candidate_id: `cand_${key}`,
      candidate_key: key,
      created_at: createdAt,
      snapshot_id: snapshot.snapshot_id,
      source_key: snapshot.source_key,
      host_id: snapshot.host_id,
      host_name: snapshot.host_name,
      source_url: snapshot.url,
      source_checked_at: snapshot.checked_at,
      source_detected_change: snapshot.detected_change,
      candidate_title: title,
      date_clues: dateClues.join("; "),
      location_clues: locations.join("; "),
      event_type_clues: types.join("; "),
      raw_text_excerpt: context,
      parser_confidence: confidenceFor(context, dateClues, types, locations),
      missing_fields: missingFields(title, dateClues, locations),
      review_status: "candidate",
      parser_notes: "Heuristic parse from captured source text; needs human validation before event use."
    });
  }

  const deduped = new Map();
  for (const candidate of candidates) {
    deduped.set(candidate.candidate_key, candidate);
  }
  return [...deduped.values()];
}

const snapshots = parseCsv(await fs.readFile(snapshotsPath, "utf8"));
const existingCandidates = await readExistingCandidates();
const existingKeys = new Set(existingCandidates.map((candidate) => candidate.candidate_key));
const parseableSnapshots = snapshots
  .filter(isParseableSnapshot)
  .slice(0, limit || undefined);

const createdAt = new Date().toISOString();
const newCandidates = [];

for (const snapshot of parseableSnapshots) {
  const candidates = await candidatesFromSnapshot(snapshot, createdAt);
  for (const candidate of candidates) {
    if (!existingKeys.has(candidate.candidate_key)) {
      existingKeys.add(candidate.candidate_key);
      newCandidates.push(candidate);
    }
  }
}

const allCandidates = [...existingCandidates, ...newCandidates]
  .sort((a, b) => b.created_at.localeCompare(a.created_at) || a.host_name.localeCompare(b.host_name));

await fs.writeFile(outputPath, toCsv(allCandidates, candidateHeaders));

console.log(`Parsed ${parseableSnapshots.length} source snapshots.`);
console.log(`Added ${newCandidates.length} new event candidates.`);
console.log(`Candidate index: ${path.relative(repoRoot, outputPath)}`);
for (const candidate of newCandidates.slice(0, 8)) {
  console.log(`- ${candidate.host_name}: ${candidate.candidate_title} (${candidate.date_clues || "no date clue"})`);
}
