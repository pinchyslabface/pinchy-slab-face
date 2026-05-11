import fs from "node:fs/promises";
import path from "node:path";
import { parseCsv, toCsv } from "./csv_utils.mjs";

const repoRoot = process.cwd();
const dataDir = path.join(repoRoot, "sponsor_research");

const validationPath = path.join(dataDir, "event_candidate_validation.csv");
const candidatesPath = path.join(dataDir, "event_candidates.csv");
const queuePath = path.join(dataDir, "event_candidate_review_queue.csv");
const reviewsPath = path.join(dataDir, "event_candidate_reviews.csv");
const stagingPath = path.join(dataDir, "reviewed_events_staging.csv");

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

const limit = Number(args.get("limit") || 25);
const includeLowPriority = args.get("include-low-priority") === "true";
const promoteApproved = args.get("promote-approved") === "true";

const queueHeaders = [
  "review_rank",
  "candidate_id",
  "host_name",
  "candidate_title",
  "validation_bucket",
  "overall_validation_score",
  "duplicate_group_id",
  "duplicate_group_size",
  "suggested_review_status",
  "source_url",
  "date_clues",
  "location_clues",
  "event_type_clues",
  "raw_text_excerpt",
  "validation_reasons",
  "existing_review_decision",
  "review_instruction"
];

const reviewHeaders = [
  "candidate_id",
  "candidate_key",
  "review_decision",
  "reviewed_by",
  "reviewed_at",
  "event_name",
  "date_start",
  "date_end",
  "time_display",
  "venue_name",
  "city_or_region",
  "state_or_territory",
  "registration_url",
  "source_url",
  "review_notes"
];

const stagingHeaders = [
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
  "review_notes",
  "publish_status"
];

function byId(rows) {
  return new Map(rows.map((row) => [row.candidate_id, row]));
}

async function readCsvIfExists(filePath) {
  try {
    return parseCsv(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function blankReview(candidate, validation) {
  return {
    candidate_id: candidate.candidate_id,
    candidate_key: candidate.candidate_key,
    review_decision: "",
    reviewed_by: "",
    reviewed_at: "",
    event_name: validation.validation_bucket === "strong_candidate" ? candidate.candidate_title : "",
    date_start: "",
    date_end: "",
    time_display: "",
    venue_name: "",
    city_or_region: "",
    state_or_territory: "",
    registration_url: "",
    source_url: candidate.source_url,
    review_notes: ""
  };
}

function reviewInstruction(validation) {
  if (validation.validation_bucket === "strong_candidate") {
    return "Check source evidence, then fill event fields and set review_decision to approved, rejected, duplicate, or needs_more_info.";
  }
  if (validation.validation_bucket === "likely_duplicate_group") {
    return "Choose the best row in this duplicate group; mark the rest duplicate.";
  }
  if (validation.validation_bucket === "likely_noise") {
    return "Reject unless a human sees a real event in the source excerpt.";
  }
  return "Review only after strong candidates and duplicate groups.";
}

function reviewIsOpen(review) {
  return !review?.review_decision;
}

function shouldQueue(validation, review) {
  if (!reviewIsOpen(review)) return false;
  if (includeLowPriority) return true;
  return ["strong_candidate", "likely_duplicate_group", "needs_human_review"].includes(validation.validation_bucket);
}

function bucketRank(bucket) {
  return {
    strong_candidate: 0,
    likely_duplicate_group: 1,
    needs_human_review: 2,
    weak_candidate: 3,
    likely_noise: 4
  }[bucket] ?? 9;
}

function promoteRows(reviews, candidatesById) {
  return reviews
    .filter((review) => review.review_decision === "approved")
    .map((review) => {
      const candidate = candidatesById.get(review.candidate_id) || {};
      return {
        candidate_id: review.candidate_id,
        event_name: review.event_name || candidate.candidate_title,
        host_name: candidate.host_name || "",
        venue_name: review.venue_name,
        city_or_region: review.city_or_region,
        state_or_territory: review.state_or_territory,
        date_start: review.date_start,
        date_end: review.date_end,
        time_display: review.time_display,
        registration_url: review.registration_url,
        source_url: review.source_url || candidate.source_url,
        reviewed_by: review.reviewed_by,
        reviewed_at: review.reviewed_at,
        review_notes: review.review_notes,
        publish_status: "reviewed_not_newsletter_ready"
      };
    });
}

const validations = parseCsv(await fs.readFile(validationPath, "utf8"));
const candidates = parseCsv(await fs.readFile(candidatesPath, "utf8"));
const existingReviews = await readCsvIfExists(reviewsPath);

const candidatesById = byId(candidates);
const reviewsById = byId(existingReviews);

const mergedReviews = [...existingReviews];
const knownReviewIds = new Set(existingReviews.map((review) => review.candidate_id));

for (const validation of validations) {
  if (knownReviewIds.has(validation.candidate_id)) continue;
  const candidate = candidatesById.get(validation.candidate_id);
  if (!candidate) continue;
  mergedReviews.push(blankReview(candidate, validation));
}

const refreshedReviewsById = byId(mergedReviews);
const queue = validations
  .filter((validation) => shouldQueue(validation, refreshedReviewsById.get(validation.candidate_id)))
  .sort((a, b) => {
    return bucketRank(a.validation_bucket) - bucketRank(b.validation_bucket)
      || Number(b.overall_validation_score) - Number(a.overall_validation_score)
      || a.host_name.localeCompare(b.host_name);
  })
  .slice(0, limit || undefined)
  .map((validation, index) => {
    const candidate = candidatesById.get(validation.candidate_id) || {};
    const review = refreshedReviewsById.get(validation.candidate_id) || {};
    return {
      review_rank: index + 1,
      candidate_id: validation.candidate_id,
      host_name: validation.host_name,
      candidate_title: validation.candidate_title,
      validation_bucket: validation.validation_bucket,
      overall_validation_score: validation.overall_validation_score,
      duplicate_group_id: validation.duplicate_group_id,
      duplicate_group_size: validation.duplicate_group_size,
      suggested_review_status: validation.suggested_review_status,
      source_url: validation.source_url,
      date_clues: candidate.date_clues,
      location_clues: candidate.location_clues,
      event_type_clues: candidate.event_type_clues,
      raw_text_excerpt: candidate.raw_text_excerpt,
      validation_reasons: validation.validation_reasons,
      existing_review_decision: review.review_decision,
      review_instruction: reviewInstruction(validation)
    };
  });

await fs.writeFile(reviewsPath, toCsv(mergedReviews, reviewHeaders));
await fs.writeFile(queuePath, toCsv(queue, queueHeaders));

if (promoteApproved) {
  await fs.writeFile(stagingPath, toCsv(promoteRows(mergedReviews, candidatesById), stagingHeaders));
}

const openReviews = mergedReviews.filter(reviewIsOpen).length;
const decidedReviews = mergedReviews.length - openReviews;

console.log(`Review rows: ${mergedReviews.length}`);
console.log(`Open review rows: ${openReviews}`);
console.log(`Decided review rows: ${decidedReviews}`);
console.log(`Review queue rows: ${queue.length}`);
console.log(`Review queue: ${path.relative(repoRoot, queuePath)}`);
console.log(`Review decisions: ${path.relative(repoRoot, reviewsPath)}`);
if (promoteApproved) {
  console.log(`Reviewed event staging: ${path.relative(repoRoot, stagingPath)}`);
}
console.log("Top review queue:");
for (const row of queue.slice(0, 8)) {
  console.log(`- ${row.review_rank}. ${row.validation_bucket} (${row.overall_validation_score}): ${row.host_name} - ${row.candidate_title}`);
}
