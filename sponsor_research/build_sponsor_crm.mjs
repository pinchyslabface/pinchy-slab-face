import fs from "node:fs/promises";
import path from "node:path";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";

const cwd = process.cwd();
const inputPath = path.join(cwd, "sponsor_prospects.json");
const outputPath = path.join(cwd, "PSF_Sponsor_CRM_Seed.xlsx");

const raw = JSON.parse(await fs.readFile(inputPath, "utf8"));
const prospects = raw.prospects;
const sources = raw.sources;

const workbook = Workbook.create();

const theme = {
  navy: "#0F2742",
  teal: "#137A7F",
  sand: "#F3EBDD",
  cream: "#FFF9F2",
  ink: "#1D2430",
  softBlue: "#DCECF4",
  softGreen: "#D7ECE1",
  softAmber: "#FCE7C3",
  softRose: "#F7D9D7"
};

function setHeaderStyle(range, fillColor = theme.navy) {
  range.format.fill.color = fillColor;
  range.format.font.bold = true;
  range.format.font.color = "#FFFFFF";
  range.format.wrapText = true;
}

function setThinGrid(range) {
  const edges = ["top", "bottom", "left", "right", "insideHorizontal", "insideVertical"];
  for (const edge of edges) {
    const border = range.format.borders[edge];
    border.style = "Continuous";
    border.weight = 1;
    border.color = "#D7DCE2";
  }
}

function addTitleBlock(sheet, title, subtitle, fillColor) {
  sheet.getRange("A1:N1").merge();
  sheet.getRange("A1").values = [[title]];
  sheet.getRange("A2:N2").merge();
  sheet.getRange("A2").values = [[subtitle]];

  const titleRange = sheet.getRange("A1:N2");
  titleRange.format.fill.color = fillColor;
  titleRange.format.font.color = "#FFFFFF";
  titleRange.format.wrapText = true;
  titleRange.format.verticalAlignment = "Center";

  sheet.getRange("A1").format.font.bold = true;
  sheet.getRange("A1").format.font.size = 18;
  sheet.getRange("A2").format.font.size = 10;
  sheet.getRange("A1:N2").format.rowHeight = 24;
}

const summarySheet = workbook.worksheets.add("Summary");
summarySheet.showGridLines = false;
addTitleBlock(
  summarySheet,
  "Pinchy Slab Face Sponsor CRM Seed",
  `Built ${raw.generated_at}. Seeded from recent climbing event sponsor pages and state/community partner sources.`,
  theme.navy
);

const totalProspects = prospects.length;
const countsByPriority = ["A", "B", "C"].map((tier) => ({
  tier,
  count: prospects.filter((p) => p.priority_tier === tier).length
}));
const countsByBucket = [...new Set(prospects.map((p) => p.prospect_bucket))].map((bucket) => ({
  bucket,
  count: prospects.filter((p) => p.prospect_bucket === bucket).length
}));

summarySheet.getRange("A4:D8").values = [
  ["Metric", "Value", "Notes", ""],
  ["Total prospects", totalProspects, "Current seed list across brands, gyms, distributors, and community partners", ""],
  ["A-tier prospects", countsByPriority.find((row) => row.tier === "A")?.count ?? 0, "Best immediate outreach targets", ""],
  ["With public email", prospects.filter((p) => p.contact_email).length, "Direct public inbox available", ""],
  ["Needs distributor/local rep", prospects.filter((p) => p.local_distributor_needed === "Yes" || p.local_distributor_needed === "Maybe").length, "Worth splitting into local rep vs direct brand outreach", ""]
];
setHeaderStyle(summarySheet.getRange("A4:D4"), theme.teal);
summarySheet.getRange("A5:D8").format.fill.color = theme.cream;
setThinGrid(summarySheet.getRange("A4:D8"));

const priorityTable = [
  ["Priority tier", "Count", "How to use"],
  ...countsByPriority.map((row) => [row.tier, row.count, row.tier === "A" ? "Start here this week" : row.tier === "B" ? "Second wave outreach" : "Keep warm / lower fit"])
];
const priorityEndRow = 10 + priorityTable.length - 1;
summarySheet.getRange(`A10:C${priorityEndRow}`).values = priorityTable;
setHeaderStyle(summarySheet.getRange("A10:C10"), theme.teal);
summarySheet.getRange(`A11:C${priorityEndRow}`).format.fill.color = theme.cream;
setThinGrid(summarySheet.getRange(`A10:C${priorityEndRow}`));

const bucketTable = [
  ["Prospect bucket", "Count", "Notes"],
  ...countsByBucket.map((row) => [row.bucket, row.count, row.bucket === "Gym operator" ? "Direct media/customer fit" : row.bucket === "Brand sponsor" ? "Most obvious prize and campaign sponsors" : "Useful adjacency / access point"])
];
const bucketEndRow = 4 + bucketTable.length - 1;
summarySheet.getRange(`E4:G${bucketEndRow}`).values = bucketTable;
setHeaderStyle(summarySheet.getRange("E4:G4"), theme.teal);
summarySheet.getRange(`E5:G${bucketEndRow}`).format.fill.color = theme.cream;
setThinGrid(summarySheet.getRange(`E4:G${bucketEndRow}`));

const recommendedRows = prospects
  .filter((p) => p.priority_tier === "A")
  .slice(0, 8)
  .map((p) => [p.company_name, p.prospect_bucket, p.geography, p.outreach_angle, p.contact_email || p.contact_url]);

const recommendedTable = [
  ["Recommended first 8", "Bucket", "Geography", "Best angle", "Contact path"],
  ...recommendedRows
];
const recommendedEndRow = 4 + recommendedTable.length - 1;
summarySheet.getRange(`I4:M${recommendedEndRow}`).values = recommendedTable;
setHeaderStyle(summarySheet.getRange("I4:M4"), theme.teal);
summarySheet.getRange(`I5:M${recommendedEndRow}`).format.fill.color = theme.cream;
summarySheet.getRange(`I4:M${recommendedEndRow}`).format.wrapText = true;
setThinGrid(summarySheet.getRange(`I4:M${recommendedEndRow}`));

summarySheet.getRange("A18:M22").values = [
  ["Next step", "Detail", "", "", "", "", "", "", "", "", "", "", ""],
  ["1", "Split outreach into gyms, brands, and distributors so each pitch matches the buyer.", "", "", "", "", "", "", "", "", "", "", ""],
  ["2", "Add named contacts from LinkedIn, local distributor teams, and marketing/partnership inboxes for A-tier rows first.", "", "", "", "", "", "", "", "", "", "", ""],
  ["3", "Track outcome fields next: first_contacted, response_status, follow_up_date, sponsor_package_interest.", "", "", "", "", "", "", "", "", "", "", ""],
  ["4", "Expand the seed list by reviewing 2024-2026 state titles, local gym comps, and event recap posts.", "", "", "", "", "", "", "", "", "", "", ""]
];
setHeaderStyle(summarySheet.getRange("A18:M18"), theme.navy);
summarySheet.getRange("A19:M22").format.fill.color = theme.sand;
summarySheet.getRange("A18:M22").format.wrapText = true;
setThinGrid(summarySheet.getRange("A18:M22"));

summarySheet.freezePanes.freezeRows(2);
summarySheet.getRange("A:M").format.autofitColumns();

const prospectsSheet = workbook.worksheets.add("Prospects");
prospectsSheet.getRange("A1:Q1").values = [[
  "company_name",
  "company_type",
  "prospect_bucket",
  "priority_tier",
  "geography",
  "climbing_adjacency",
  "local_distributor_needed",
  "source_event_or_org",
  "source_type",
  "sponsor_signal",
  "fit_notes",
  "outreach_angle",
  "website",
  "contact_email",
  "contact_url",
  "source_url",
  "status"
]];
setHeaderStyle(prospectsSheet.getRange("A1:Q1"), theme.navy);

prospectsSheet.getRange(`A2:Q${prospects.length + 1}`).values = prospects.map((p) => [
  p.company_name,
  p.company_type,
  p.prospect_bucket,
  p.priority_tier,
  p.geography,
  p.climbing_adjacency,
  p.local_distributor_needed,
  p.source_event_or_org,
  p.source_type,
  p.sponsor_signal,
  p.fit_notes,
  p.outreach_angle,
  p.website,
  p.contact_email,
  p.contact_url,
  p.source_url,
  "Not contacted"
]);
prospectsSheet.getRange(`A2:Q${prospects.length + 1}`).format.wrapText = true;
prospectsSheet.getRange(`A2:Q${prospects.length + 1}`).format.verticalAlignment = "Top";
prospectsSheet.getRange(`A2:Q${prospects.length + 1}`).format.fill.color = theme.cream;
setThinGrid(prospectsSheet.getRange(`A1:Q${prospects.length + 1}`));
prospectsSheet.freezePanes.freezeRows(1);
prospectsSheet.freezePanes.freezeColumns(4);
prospectsSheet.getRange("A:Q").format.autofitColumns();

const sourcesSheet = workbook.worksheets.add("Sources");
sourcesSheet.getRange("A1:D1").values = [[
  "source_name",
  "source_category",
  "source_url",
  "notes"
]];
setHeaderStyle(sourcesSheet.getRange("A1:D1"), theme.navy);
sourcesSheet.getRange(`A2:D${sources.length + 1}`).values = sources.map((s) => [
  s.source_name,
  s.source_category,
  s.source_url,
  s.notes
]);
sourcesSheet.getRange(`A2:D${sources.length + 1}`).format.fill.color = theme.cream;
sourcesSheet.getRange(`A2:D${sources.length + 1}`).format.wrapText = true;
setThinGrid(sourcesSheet.getRange(`A1:D${sources.length + 1}`));
sourcesSheet.freezePanes.freezeRows(1);
sourcesSheet.getRange("A:D").format.autofitColumns();

const prospectPreview = await workbook.inspect({
  sheetId: prospectsSheet.sheetId,
  range: `A1:F8`,
  kind: "table",
  include: "values",
  maxChars: 2000
});
console.log(prospectPreview.ndjson);

const summaryRender = await workbook.render({
  sheetName: "Summary",
  range: "A1:M22",
  format: "png",
  scale: 1.5
});
console.log(`summary_render_bytes=${summaryRender.size}`);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(`saved=${outputPath}`);
