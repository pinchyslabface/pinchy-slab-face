import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { parseCsv, toCsv } from "./csv_utils.mjs";

const repoRoot = process.cwd();
const dataDir = path.join(repoRoot, "sponsor_research");

const candidatesPath = path.join(dataDir, "event_candidates.csv");
const outputPath = path.join(dataDir, "event_candidate_validation.csv");

const validationHeaders = [
  "candidate_id",
  "candidate_key",
  "validation_run_at",
  "host_id",
  "host_name",
  "source_url",
  "candidate_title",
  "event_key",
  "duplicate_group_id",
  "duplicate_group_size",
  "is_likely_duplicate",
  "completeness_score",
  "evidence_score",
  "noise_score",
  "overall_validation_score",
  "validation_bucket",
  "suggested_review_status",
  "validation_reasons",
  "missing_fields",
  "review_notes"
];

const strongEventTerms = [
  "competition",
  "comp",
  "final",
  "finals",
  "qualifier",
  "qualifiers",
  "titles",
  "jam",
  "pumpfest",
  "grip",
  "rip",
  "league",
  "round",
  "festival",
  "state",
  "youth",
  "open"
];

const noisyTitlePatterns = [
  /\bnew climbs every\b/i,
  /\bopening hours?\b/i,
  /\bphone\b/i,
  /\baddress\b/i,
  /\bpricing\b/i,
  /\bcontact\b/i,
  /\bfacebook community\b/i,
  /\bgaller(?:y|ies)\b/i,
  /\bview gallery\b/i,
  /\bcompetitor categories\b/i,
  /\bmale & female\b/i,
  /\bmasters\b/i,
  /\binclusive\b/i,
  /\bdownload\b/i,
  /\blog your climbs\b/i
];

const noisyContextPatterns = [
  /\bopening hours?\b/i,
  /\bphone\s*:/i,
  /\bemail\s*:/i,
  /\baddress\s*:/i,
  /\bparking\b/i,
  /\bpublic transport\b/i,
  /\bonline waiver\b/i,
  /\bprivacy policy\b/i,
  /\bcopyright\b/i
];

function hash(value) {
  return crypto.createHash("sha256").update(value || "").digest("hex").slice(0, 12);
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(qualifiers are now open|competition schedule|competitor categories|download toplogger|view gallery)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitList(value) {
  return String(value || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean);
}

function firstDateKey(candidate) {
  const dateClues = splitList(candidate.date_clues);
  return normalize(dateClues[0] || "");
}

function eventKey(candidate) {
  const title = normalize(candidate.candidate_title);
  const context = normalize(candidate.raw_text_excerpt);
  let baseTitle = title;

  if (/qualifier|final|category|schedule|download|log your climbs/.test(baseTitle)) {
    const gripMatch = context.match(/grip\s+rip\s+\d{2,4}|grip\s+rip/);
    if (gripMatch) baseTitle = gripMatch[0];
  }

  if (!baseTitle && context.includes("grip rip")) {
    baseTitle = "grip rip";
  }

  return [
    candidate.host_id,
    baseTitle,
    firstDateKey(candidate)
  ].filter(Boolean).join("::");
}

function scoreCompleteness(candidate) {
  let score = 0;
  if (candidate.candidate_title) score += 25;
  if (splitList(candidate.date_clues).length > 0) score += 30;
  if (splitList(candidate.location_clues).length > 0) score += 20;
  if (splitList(candidate.event_type_clues).length > 0) score += 15;
  if (candidate.source_url) score += 10;
  return Math.min(score, 100);
}

function scoreEvidence(candidate) {
  const context = `${candidate.candidate_title} ${candidate.event_type_clues} ${candidate.raw_text_excerpt}`.toLowerCase();
  let score = Number(candidate.parser_confidence || 0) * 45;
  if (strongEventTerms.some((term) => context.includes(term))) score += 25;
  if (splitList(candidate.date_clues).length > 0) score += 15;
  if (splitList(candidate.location_clues).length > 0) score += 10;
  if (/presented by|presents|sponsor|prize|entry|register|ticket|toplogger/i.test(context)) score += 5;
  return Math.min(Math.round(score), 100);
}

function scoreNoise(candidate) {
  const title = candidate.candidate_title || "";
  const context = candidate.raw_text_excerpt || "";
  let score = 0;
  for (const pattern of noisyTitlePatterns) {
    if (pattern.test(title)) score += 25;
  }
  for (const pattern of noisyContextPatterns) {
    if (pattern.test(context)) score += 8;
  }
  if (!candidate.date_clues) score += 15;
  if (!candidate.location_clues) score += 10;
  if ((candidate.raw_text_excerpt || "").length > 900) score += 5;
  return Math.min(score, 100);
}

function validationBucket(overallScore, noiseScore, duplicateGroupSize, completenessScore) {
  if (noiseScore >= 55) return "likely_noise";
  if (overallScore >= 75 && completenessScore >= 70) return "strong_candidate";
  if (duplicateGroupSize > 1 && overallScore >= 55) return "likely_duplicate_group";
  if (overallScore >= 50) return "needs_human_review";
  return "weak_candidate";
}

function suggestedReviewStatus(bucket) {
  if (bucket === "strong_candidate") return "needs_review";
  if (bucket === "likely_duplicate_group") return "duplicate_review";
  if (bucket === "likely_noise") return "likely_reject";
  if (bucket === "weak_candidate") return "low_priority_review";
  return "needs_review";
}

function reasons(candidate, scores, duplicateGroupSize) {
  const reasonList = [];
  if (scores.completeness >= 70) reasonList.push("has core fields");
  if (scores.evidence >= 70) reasonList.push("strong source evidence");
  if (scores.noise >= 55) reasonList.push("generic or noisy page text");
  if (duplicateGroupSize > 1) reasonList.push(`possible duplicate group of ${duplicateGroupSize}`);
  if (!candidate.date_clues) reasonList.push("missing date clue");
  if (!candidate.location_clues) reasonList.push("missing location clue");
  return reasonList.join("; ");
}

const candidates = parseCsv(await fs.readFile(candidatesPath, "utf8"));
const keys = new Map();

for (const candidate of candidates) {
  const key = eventKey(candidate);
  if (!keys.has(key)) keys.set(key, []);
  keys.get(key).push(candidate.candidate_id);
}

const runAt = new Date().toISOString();
const rows = candidates.map((candidate) => {
  const key = eventKey(candidate);
  const duplicateIds = keys.get(key) || [];
  const completeness = scoreCompleteness(candidate);
  const evidence = scoreEvidence(candidate);
  const noise = scoreNoise(candidate);
  const overall = Math.max(0, Math.min(100, Math.round((completeness * 0.45) + (evidence * 0.45) - (noise * 0.35))));
  const bucket = validationBucket(overall, noise, duplicateIds.length, completeness);
  const duplicateGroupId = `dup_${hash(key)}`;

  return {
    candidate_id: candidate.candidate_id,
    candidate_key: candidate.candidate_key,
    validation_run_at: runAt,
    host_id: candidate.host_id,
    host_name: candidate.host_name,
    source_url: candidate.source_url,
    candidate_title: candidate.candidate_title,
    event_key: key,
    duplicate_group_id: duplicateGroupId,
    duplicate_group_size: duplicateIds.length,
    is_likely_duplicate: duplicateIds.length > 1 ? "yes" : "no",
    completeness_score: completeness,
    evidence_score: evidence,
    noise_score: noise,
    overall_validation_score: overall,
    validation_bucket: bucket,
    suggested_review_status: suggestedReviewStatus(bucket),
    validation_reasons: reasons(candidate, { completeness, evidence, noise }, duplicateIds.length),
    missing_fields: candidate.missing_fields,
    review_notes: "Review-only validation overlay; do not publish without human confirmation."
  };
});

rows.sort((a, b) => {
  const bucketOrder = {
    strong_candidate: 0,
    likely_duplicate_group: 1,
    needs_human_review: 2,
    weak_candidate: 3,
    likely_noise: 4
  };
  return (bucketOrder[a.validation_bucket] ?? 9) - (bucketOrder[b.validation_bucket] ?? 9)
    || Number(b.overall_validation_score) - Number(a.overall_validation_score)
    || a.host_name.localeCompare(b.host_name);
});

await fs.writeFile(outputPath, toCsv(rows, validationHeaders));

const counts = rows.reduce((acc, row) => {
  acc[row.validation_bucket] = (acc[row.validation_bucket] || 0) + 1;
  return acc;
}, {});

console.log(`Validated ${rows.length} event candidates.`);
console.log(`Validation overlay: ${path.relative(repoRoot, outputPath)}`);
for (const [bucket, count] of Object.entries(counts)) {
  console.log(`${bucket}: ${count}`);
}
console.log("Top review candidates:");
for (const row of rows.slice(0, 8)) {
  console.log(`- ${row.validation_bucket} (${row.overall_validation_score}): ${row.host_name} - ${row.candidate_title}`);
}
