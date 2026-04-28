# Sponsor Research Handoff

## What this work is

This task is building a near-exhaustive database of Australian climbing gyms and competition hosts first, then using the last roughly 24 months of events to build a full sponsor overlap database.

This is intentionally separate from the future all-gyms CRM, but the two should connect cleanly.

The reusable join layer is:

- `hosts.csv`

That file should later map into the dedicated gym CRM through:

- `crm_entity_id`

## Current folder

Work from the repo root, then use:

- `sponsor_research/`

Key files:

- `COMP_RESEARCH_SYSTEM.md`
- `COMP_DATA_DICTIONARY.md`
- `hosts.csv`
- `host_locations.csv`
- `host_contacts.csv`
- `host_people.csv`
- `host_update_channels.csv`
- `host_review_queue.csv`
- `events.csv`
- `event_sponsors.csv`
- `sponsors_master.csv`

## What is already done

- The research system and data model have been set up.
- A seeded host universe has been created in `hosts.csv`.
- A prioritized review queue has been created in `host_review_queue.csv`.
- Example rows have been added to `events.csv`, `event_sponsors.csv`, and `sponsors_master.csv` to show expected structure.
- An early sponsor seed workbook exists, but this handoff is for the event-first system that should become much more complete.

## Important rules

### 0. Completeness first, then depth

The host universe should become close to a national census.

That means:

- capture every indoor climbing gym or operator you can confirm in Australia
- separate operator rows from venue rows
- do not delay capture because the ranking is imperfect
- use ranking to prioritize review depth, not to decide whether a host belongs in the file

### 1. Work host-by-host, not sponsor-first

Do not start from brands.

Start from hosts:

- associations
- gym operators
- venues
- discovery/event platforms

Then:

1. find events
2. log events in `events.csv`
3. extract sponsors into `event_sponsors.csv`
4. normalize sponsor entities into `sponsors_master.csv`

### 2. For multi-location operators, capture all locations

This is important.

For any operator with multiple venues:

- make sure all locations are represented in `hosts.csv`
- use separate venue rows where comps are venue-specific
- keep operator-level rows when the brand runs cross-location or network-wide events

Examples where this matters:

- Boulder Lab
- Urban Climb
- 9 Degrees
- Beyond Bouldering
- Northside Boulders
- BlocHaus
- Pulse
- Portside Boulders
- Adrenaline Vault

If needed, add:

- one operator-level host row
- multiple venue-level host rows

### 2A. Add influence fields once the host is captured

For meaningful gyms and operators, add:

- `market_tier`
- `influence_score`
- `footprint_signal`
- `social_reach_signal`
- `event_activity_signal`
- `scene_centrality_signal`
- `influence_notes`

Use those fields as a practical research-priority model, not as a claim of exact attendance.

Useful reminder:

- `market_tier` can include `national`, `statewide`, `major_metro`, `regional_anchor`, or `local`

### 2B. Separate enrichment from the census

Do not overload `hosts.csv` with every contact and staff detail.

Use linked enrichment files instead:

- `host_locations.csv`
- `host_contacts.csv`
- `host_people.csv`
- `host_update_channels.csv`

Use them to capture:

- street address and suburb/postcode
- venue-level phone and email contacts
- owner, founder, manager, coach, or routesetter leads
- extra socials and mailing-list paths
- the actual channels where events are announced

### 3. Event completeness matters more than perfect sponsor extraction at first

If an event is confirmed, add it even if sponsors are still unknown.

### 4. Keep evidence quality explicit

Prefer:

- `official_page`
- `results_page`
- `host_social`
- `ticketing_page`

Use `third_party_mention` only when necessary and label confidence correctly.

## Immediate next tasks

### Phase 1. Expand the host universe

Before deep event logging, improve `hosts.csv`:

- capture the full national gym/operator universe as far as practical
- confirm multi-location operators all have locations represented
- add missing venue-level rows where events are venue-specific
- add missing state associations, clubs, and likely event brands if found

Priority examples to review first:

- Sport Climbing Australia
- Sport Climbing Victoria
- Sport Climbing Queensland
- Sport Climbing NSW
- Boulder Lab
- Rocket Climbing
- 1UP / Up Climbing references
- Urban Climb
- 9 Degrees
- Beyond Bouldering
- Northside Boulders
- Stax Climbing

### Phase 2. Build out the event list

Populate `events.csv` with confirmed competition and comp-adjacent events from the last 24 months.

Include:

- national titles
- state titles
- local gym comps
- bouldering jams
- league rounds
- youth comps
- university comps
- fundraiser/community comps if sponsor-supported

### Phase 3. Build sponsor overlap

For each event:

- find sponsor logos
- find sponsor mentions in captions and posts
- find sponsor/partner pages
- add one row per sponsor appearance to `event_sponsors.csv`
- normalize sponsor names in `sponsors_master.csv`

## Social/logo extraction note

Some sponsor discovery will likely come from logos on Instagram images, posters, recap graphics, or story screenshots.

There are two valid approaches:

### Option A. Manual extraction first

Good for:

- first 50-100 event sponsor captures
- getting clean sponsor normalization rules
- seeing which logo styles are common

### Option B. Add a helper script

Possible future workflow:

- collect image URLs or screenshots into a review folder
- run OCR and logo-text extraction
- output candidate sponsor names into a review CSV
- manually verify before adding to `event_sponsors.csv`

This should be treated as an assistive step, not a fully trusted automation.

## Recommended operating sequence for the next session

1. Read `COMP_RESEARCH_SYSTEM.md`
2. Read `COMP_DATA_DICTIONARY.md`
3. Expand `hosts.csv` toward a national gym census
4. Add influence/ranking fields for the strongest hosts
5. Open `host_review_queue.csv`
6. Start populating `events.csv`
7. As real events are added, add sponsor appearances to `event_sponsors.csv`
8. Normalize recurring sponsors into `sponsors_master.csv`

## Definition of good progress

A good next session should produce:

- improved `hosts.csv` national coverage
- clearer influence ranking for top hosts
- a real first batch of confirmed event rows in `events.csv`
- at least some sponsor appearance rows in `event_sponsors.csv`
- early normalization in `sponsors_master.csv`

## What not to do

- do not collapse everything into one spreadsheet
- do not skip event logging just because sponsor details are incomplete
- do not create inconsistent status/type labels; use the data dictionary
- do not treat operator-level and venue-level hosts as interchangeable

## Goal

The goal is to reach a system where we can answer:

- which sponsors show up most often
- which sponsors appear across multiple states
- which gyms and operators repeatedly attract sponsors
- which sponsor relationships look local vs national
- which prospects should go into the sponsorship CRM first
