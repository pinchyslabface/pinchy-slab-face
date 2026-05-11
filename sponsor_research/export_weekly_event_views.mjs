import fs from "node:fs/promises";
import path from "node:path";
import { parseCsv, toCsv } from "./csv_utils.mjs";

const repoRoot = process.cwd();
const dataDir = path.join(repoRoot, "sponsor_research");

const stagingPath = path.join(dataDir, "reviewed_events_staging.csv");
const outputPath = path.join(dataDir, "weekly_event_export.csv");
const summaryPath = path.join(dataDir, "weekly_event_export_summary.csv");

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

const cityFilter = args.get("city") || "";
const stateFilter = args.get("state") || "";
const startDate = args.get("start") || new Date().toISOString().slice(0, 10);
const days = Number(args.get("days") || 14);
const includeUndated = args.get("include-undated") === "true";

const exportHeaders = [
  "export_run_at",
  "export_window_start",
  "export_window_end",
  "city_filter",
  "state_filter",
  "candidate_id",
  "event_name",
  "host_name",
  "venue_name",
  "city_or_region",
  "state_or_territory",
  "date_start",
  "date_end",
  "time_display",
  "registration_url",
  "source_url",
  "reviewed_by",
  "reviewed_at",
  "publish_status",
  "newsletter_title",
  "newsletter_blurb",
  "editor_notes"
];

const summaryHeaders = [
  "export_run_at",
  "export_window_start",
  "export_window_end",
  "city_filter",
  "state_filter",
  "approved_staging_rows",
  "exported_rows",
  "undated_rows_excluded",
  "status",
  "next_action"
];

function addDays(dateString, count) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + count);
  return date.toISOString().slice(0, 10);
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function inWindow(row, windowStart, windowEnd) {
  if (!row.date_start) return includeUndated;
  return row.date_start >= windowStart && row.date_start <= windowEnd;
}

function matchesFilters(row) {
  if (cityFilter && normalize(row.city_or_region) !== normalize(cityFilter)) return false;
  if (stateFilter && normalize(row.state_or_territory) !== normalize(stateFilter)) return false;
  return true;
}

function newsletterTitle(row) {
  return row.event_name || `${row.host_name} event`;
}

function newsletterBlurb(row) {
  const where = [row.venue_name, row.city_or_region].filter(Boolean).join(", ");
  const when = [row.date_start, row.time_display].filter(Boolean).join(" ");
  return [when, where].filter(Boolean).join(" | ");
}

const windowEnd = addDays(startDate, days);
const runAt = new Date().toISOString();
const stagingRows = parseCsv(await fs.readFile(stagingPath, "utf8"));
const approvedRows = stagingRows.filter((row) => row.publish_status === "reviewed_not_newsletter_ready");
const undatedExcluded = approvedRows.filter((row) => !row.date_start && !includeUndated).length;

const exportRows = approvedRows
  .filter((row) => inWindow(row, startDate, windowEnd))
  .filter(matchesFilters)
  .sort((a, b) => {
    return (a.date_start || "9999-99-99").localeCompare(b.date_start || "9999-99-99")
      || (a.city_or_region || "").localeCompare(b.city_or_region || "")
      || (a.event_name || "").localeCompare(b.event_name || "");
  })
  .map((row) => ({
    export_run_at: runAt,
    export_window_start: startDate,
    export_window_end: windowEnd,
    city_filter: cityFilter,
    state_filter: stateFilter,
    candidate_id: row.candidate_id,
    event_name: row.event_name,
    host_name: row.host_name,
    venue_name: row.venue_name,
    city_or_region: row.city_or_region,
    state_or_territory: row.state_or_territory,
    date_start: row.date_start,
    date_end: row.date_end,
    time_display: row.time_display,
    registration_url: row.registration_url,
    source_url: row.source_url,
    reviewed_by: row.reviewed_by,
    reviewed_at: row.reviewed_at,
    publish_status: row.publish_status,
    newsletter_title: newsletterTitle(row),
    newsletter_blurb: newsletterBlurb(row),
    editor_notes: "Export candidate only; final newsletter copy still needs editorial review."
  }));

const status = exportRows.length > 0
  ? "ready_for_editorial_review"
  : approvedRows.length > 0
    ? "no_approved_rows_in_window"
    : "no_manually_approved_rows_yet";

const nextAction = exportRows.length > 0
  ? "Review exported rows and write newsletter copy separately."
  : approvedRows.length > 0
    ? "Adjust city/date filters or review future windows."
    : "Use event_candidate_review_queue.csv to approve real events before exporting weekly views.";

const summaryRows = [{
  export_run_at: runAt,
  export_window_start: startDate,
  export_window_end: windowEnd,
  city_filter: cityFilter,
  state_filter: stateFilter,
  approved_staging_rows: approvedRows.length,
  exported_rows: exportRows.length,
  undated_rows_excluded: undatedExcluded,
  status,
  next_action: nextAction
}];

await fs.writeFile(outputPath, toCsv(exportRows, exportHeaders));
await fs.writeFile(summaryPath, toCsv(summaryRows, summaryHeaders));

console.log(`Approved staging rows: ${approvedRows.length}`);
console.log(`Weekly export rows: ${exportRows.length}`);
console.log(`Weekly export: ${path.relative(repoRoot, outputPath)}`);
console.log(`Export summary: ${path.relative(repoRoot, summaryPath)}`);
console.log(`Status: ${status}`);
console.log(`Next action: ${nextAction}`);
