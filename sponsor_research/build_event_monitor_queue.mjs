import fs from "node:fs/promises";
import path from "node:path";
import { parseCsv, toCsv } from "./csv_utils.mjs";

const repoRoot = process.cwd();
const dataDir = path.join(repoRoot, "sponsor_research");

const hostsPath = path.join(dataDir, "hosts.csv");
const channelsPath = path.join(dataDir, "host_update_channels.csv");
const outputPath = path.join(dataDir, "event_monitor_queue.csv");

function scorePriorityTier(priorityTier) {
  return { A: 30, B: 18, C: 8 }[priorityTier] ?? 4;
}

function scoreCompLikelihood(compLikelihood) {
  return { High: 25, Medium: 12, Low: 3 }[compLikelihood] ?? 0;
}

function scoreChannelPriority(priority) {
  return { A: 20, B: 10, C: 4 }[priority] ?? 2;
}

function scoreFrequency(frequency) {
  return { high: 12, medium: 7, low: 2 }[frequency?.toLowerCase()] ?? 0;
}

function scoreStatus(status) {
  return { verified: 8, seeded: 4, needs_review: 12, parked: -20 }[status] ?? 0;
}

function reviewCadence(updateFrequency) {
  const normalized = updateFrequency?.toLowerCase();
  if (normalized === "high") return "twice weekly during launch";
  if (normalized === "medium") return "weekly";
  if (normalized === "low") return "fortnightly";
  return "manual review";
}

function monitoringReason(host, channel) {
  const reasons = [];
  if (host.priority_tier === "A") reasons.push("A-tier host");
  if (host.comp_likelihood === "High") reasons.push("high event likelihood");
  if (Number(host.influence_score || 0) >= 4) reasons.push("strong scene influence");
  if (channel.priority === "A") reasons.push("A-priority update channel");
  if (channel.status === "needs_review") reasons.push("channel needs review");
  return reasons.join("; ") || "coverage source";
}

const hosts = parseCsv(await fs.readFile(hostsPath, "utf8"));
const channels = parseCsv(await fs.readFile(channelsPath, "utf8"));
const hostsById = new Map(hosts.map((host) => [host.host_id, host]));

const queue = channels
  .map((channel) => {
    const host = hostsById.get(channel.host_id) ?? {};
    const influenceScore = Number(host.influence_score || 0);
    const score =
      scorePriorityTier(host.priority_tier) +
      scoreCompLikelihood(host.comp_likelihood) +
      scoreChannelPriority(channel.priority) +
      scoreFrequency(channel.update_frequency_guess) +
      scoreStatus(channel.status) +
      Math.max(0, influenceScore * 3);

    return {
      monitor_rank: 0,
      monitor_score: score,
      host_id: channel.host_id,
      host_name: host.host_name ?? "",
      host_type: host.host_type ?? "",
      state_scope: host.state_scope ?? "",
      city_or_region: host.city_or_region ?? "",
      priority_tier: host.priority_tier ?? "",
      comp_likelihood: host.comp_likelihood ?? "",
      influence_score: host.influence_score ?? "",
      channel_type: channel.channel_type,
      channel_value: channel.channel_value,
      url: channel.url,
      purpose: channel.purpose,
      update_frequency_guess: channel.update_frequency_guess,
      recommended_cadence: reviewCadence(channel.update_frequency_guess),
      access_method: channel.access_method,
      channel_priority: channel.priority,
      channel_status: channel.status,
      reason: monitoringReason(host, channel),
      next_action: channel.status === "needs_review"
        ? "Confirm this channel and check for upcoming events."
        : "Check for upcoming events, deadlines, recaps, and sponsor clues."
    };
  })
  .filter((row) => row.channel_status !== "parked")
  .sort((a, b) => b.monitor_score - a.monitor_score || a.host_name.localeCompare(b.host_name))
  .map((row, index) => ({ ...row, monitor_rank: index + 1 }));

const headers = [
  "monitor_rank",
  "monitor_score",
  "host_id",
  "host_name",
  "host_type",
  "state_scope",
  "city_or_region",
  "priority_tier",
  "comp_likelihood",
  "influence_score",
  "channel_type",
  "channel_value",
  "url",
  "purpose",
  "update_frequency_guess",
  "recommended_cadence",
  "access_method",
  "channel_priority",
  "channel_status",
  "reason",
  "next_action"
];

await fs.writeFile(outputPath, toCsv(queue, headers));

console.log(`Wrote ${queue.length} monitoring rows to ${path.relative(repoRoot, outputPath)}`);
console.log("Top sources:");
for (const row of queue.slice(0, 8)) {
  console.log(`${row.monitor_rank}. ${row.host_name} - ${row.channel_type} - ${row.reason}`);
}
