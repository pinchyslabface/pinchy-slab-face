# Event Tracking Tooling Plan

## Purpose

PSF needs a lightweight intelligence system for keeping up with events across climbing gyms, state bodies, national bodies, community organisers, and adjacent industry sources.

The goal is not to automate every source immediately.

The goal is to make event discovery repeatable enough that PSF can reliably answer:

- what is happening soon?
- which gyms or organisations changed since the last check?
- which sources should be checked first this week?
- which events are ready for newsletter review?
- which events need human confirmation?

## Operating Shape

Use six layers.

### 1. Source Universe

The source universe lives in `sponsor_research/`.

Core files:

- `hosts.csv`
- `host_update_channels.csv`
- `host_review_queue.csv`
- `events.csv`

These files should track gyms, associations, venues, community organisers, and known update channels.

Rule:

- add the source before trying to automate it

Every source should eventually track:

- `source_id`
- `host_id`
- `source_type`
- `url`
- `platform`
- `access_method`
- `priority`
- `check_frequency`
- `last_checked_at`
- `last_changed_at`
- `last_success_at`
- `last_error`
- `trust_level`
- `notes`

### 2. Monitoring Queue

The monitoring queue decides what should be checked next.

It should rank sources by:

- host priority
- host influence
- event likelihood
- channel priority
- update frequency
- current review status

First tool:

- `sponsor_research/build_event_monitor_queue.mjs`

Output:

- `sponsor_research/event_monitor_queue.csv`

### 3. Collection

Collectors fetch or capture raw source material.

Likely collector types:

- public web collector
- association calendar collector
- ticketing page collector
- Instagram review collector
- Facebook review collector
- manual submission collector
- email forward collector

Near-term tools to build:

- `collect_web_sources.mjs`
- `collect_ticketing_sources.mjs`
- `snapshot_source_pages.mjs`
- `extract_source_text.mjs`

Social collection should begin as browser-assisted review, not brittle background scraping.

### 4. Change Detection

Before parsing a source, the system should know whether it changed.

Store source snapshots with:

- `source_id`
- `checked_at`
- `url`
- `raw_html_path`
- `extracted_text_path`
- `text_hash`
- `content_hash`
- `status_code`
- `detected_change`
- `change_summary`

Useful states:

- `changed_since_last_check`
- `no_change`
- `new_post_or_page_detected`
- `source_broken`
- `needs_manual_login`

### 5. Event Candidate Parsing

Parsing should produce candidates, not final events.

An event candidate should carry:

- `candidate_id`
- `source_id`
- `host_id`
- `raw_title`
- `parsed_title`
- `event_type`
- `date_start`
- `date_end`
- `time`
- `venue`
- `city`
- `state`
- `registration_url`
- `source_url`
- `raw_text_excerpt`
- `parser_confidence`
- `parser_notes`
- `missing_fields`
- `confidence_by_field`
- `possible_duplicate_keys`
- `created_at`
- `review_status`

Use an LLM parser only after source text has been captured.

The LLM should receive bounded source text and return structured JSON with uncertainty. It should not browse freely and approve events on its own.

### 6. Validation, Review, And Weekly Export

The event capture layer turns discovered updates into event rows.

Near-term storage:

- `sponsor_research/events.csv`
- `sponsor_research/event_candidates.csv`

Later storage:

- Postgres-backed event store when the newsletter workflow needs structured review, correction, and publishing states.

Required fields before an event can become newsletter-ready:

- event name
- host
- date or date range
- city/state or online status
- source URL
- confidence level
- review status

Recommended fields:

- venue
- registration or ticket URL
- start time
- event category
- audience level
- cost
- deadline
- image or poster URL
- sponsor or prize notes

Review states:

- `candidate`
- `needs_review`
- `validated`
- `publish_ready`
- `published`
- `rejected`
- `duplicate`
- `stale`

Newsletter-ready fields should be separate from raw source fields:

- `newsletter_title`
- `newsletter_blurb`
- `city`
- `date_display`
- `venue_display`
- `cta_label`
- `cta_url`
- `editor_notes`
- `publish_status`

## First Tooling Milestones

### Milestone 1. Make the weekly source check obvious

Good outcome:

- one command generates a ranked review queue
- the queue says which host and channel to check
- the queue explains why the item is high priority
- the queue is useful even before scraping exists

### Milestone 2. Add source-specific collection helpers

Start with public web sources.

Recommended order:

1. official event pages
2. association event calendars
3. ticketing pages
4. Instagram profile review prompts
5. Facebook event/page review prompts

Do not start with brittle fully automated social scraping.

### Milestone 3. Add event candidate extraction

Good outcome:

- a helper can turn a page or copied social text into event candidates
- candidates include source URL, date, city, host, confidence, and review notes
- nothing gets published without human review

### Milestone 4. Connect to newsletter production

Good outcome:

- reviewed events can be filtered by city and date window
- newsletter-ready fields are separate from raw discovery notes
- stale or uncertain events are clearly marked

## Skill Shape

Build toward three PSF-specific skills.

### `psf-event-watch`

Use it when a chat needs to:

- refresh the monitoring queue
- review a host or association for new events
- add event candidates to the dataset
- create a handoff note about source coverage
- decide which sources are most important this week

Skill behavior should be conservative:

- read the source universe first
- prefer official pages and association pages
- keep Instagram and Facebook review human-assisted
- record uncertainty explicitly
- update the relevant CSVs and docs rather than leaving findings only in chat

### `psf-event-validate`

Use it when a chat needs to:

- clean event candidates
- dedupe candidates against existing events
- check required fields
- score confidence
- compare event details against source evidence
- promote candidates to reviewed events
- flag missing or uncertain information

### `psf-weekly-send-builder`

Use it when a chat needs to:

- select reviewed events by city and date
- group events into weekly newsletter sections
- produce send-ready blurbs
- keep editor notes separate from publishable copy
- export to a Beehiiv/manual draft format

## Agent Roles

When agents are used, keep the roles narrow.

### Source Scout

Finds new gyms, associations, calendars, ticketing pages, and social accounts.

Output:

- source registry updates only

### Change Monitor

Checks known sources for changes.

Output:

- source snapshots
- changed-source queue
- broken-source notes

### Event Extractor

Turns captured source text into structured event candidates.

Output:

- candidate rows
- evidence snippets
- parser confidence

### Event Validator

Checks candidates against evidence, dedupes, and assigns review status.

Output:

- validated event rows
- review notes
- duplicate or rejection notes

### Weekly Editor

Turns validated events into newsletter-ready copy.

Output:

- weekly send candidate list
- publishable blurbs
- editor notes

Rule:

- no single agent should both discover and approve an event for publishing

## Weekly Rhythm

Recommended weekly loop:

1. Run the monitoring queue script.
2. Review A-priority association and high-activity gym channels.
3. Add or update event rows.
4. Mark uncertain findings for review.
5. Pull newsletter-ready events for the next city send.
6. Add source gaps back into the queue.

## Near-Term Command

From the repo root:

```bash
node sponsor_research/build_event_monitor_queue.mjs
node sponsor_research/collect_web_sources.mjs --limit 20
node sponsor_research/parse_event_candidates.mjs
node sponsor_research/validate_event_candidates.mjs
node sponsor_research/review_event_candidates.mjs
node sponsor_research/export_weekly_event_views.mjs
```

The commands write:

```text
sponsor_research/event_monitor_queue.csv
sponsor_research/source_snapshots.csv
sponsor_research/event_candidates.csv
sponsor_research/event_candidate_validation.csv
sponsor_research/event_candidate_review_queue.csv
sponsor_research/event_candidate_reviews.csv
sponsor_research/reviewed_events_staging.csv
sponsor_research/weekly_event_export.csv
sponsor_research/weekly_event_export_summary.csv
event_intel/source_snapshots/
```

Current status:

- `build_event_monitor_queue.mjs` exists and generates the ranked monitoring queue.
- `collect_web_sources.mjs` exists and can capture public web source snapshots from the monitoring queue.
- A smoke test on 2026-04-28 checked five public web sources, captured raw HTML/text, and correctly treated the second run as no-change for the same batch.
- `parse_event_candidates.mjs` exists and can create review-only event/activity candidates from captured source text.
- The parser is intentionally heuristic and noisy enough to require human review; it must not be treated as validation.
- `validate_event_candidates.mjs` exists and writes a review-only validation overlay to `event_candidate_validation.csv`.
- `review_event_candidates.mjs` exists and writes a ranked review queue plus a separate human decision file.
- `export_weekly_event_views.mjs` exists and writes weekly export views from manually approved reviewed-event staging rows.
- The exporter currently reports `no_manually_approved_rows_yet`, which is expected until a human approves candidates.
- The next useful build step is browser-assisted Instagram and Facebook review workflows.

## Build Order

Build in this order:

1. Harden the source registry.
2. Improve and run the monitoring queue.
3. Add a source snapshot script for public web pages. Done as `sponsor_research/collect_web_sources.mjs`.
4. Add event candidate parsing from captured source text. Done as `sponsor_research/parse_event_candidates.mjs`.
5. Add validation and duplicate scoring. Done as `sponsor_research/validate_event_candidates.mjs`.
6. Add a simple human review workflow. Done as `sponsor_research/review_event_candidates.mjs`.
7. Add weekly export views for city and date windows. Done as `sponsor_research/export_weekly_event_views.mjs`.
8. Add browser-assisted Instagram and Facebook review workflows. Next.
9. Move the proven schema into Postgres and a small admin UI.

Do not start with maximum automation.

Start with tools that improve coverage, freshness, source traceability, confidence, review speed, and newsletter usability.

## Future Data Store

Near term:

- CSVs in `sponsor_research/`
- source snapshots in `event_intel/source_snapshots/`
- parsed candidates in `sponsor_research/event_candidates.csv`
- reviewed events in `events.csv`

Later:

- Postgres tables
- admin review UI
- Beehiiv export or integration

Suggested future tables:

- `hosts`
- `source_channels`
- `source_snapshots`
- `event_candidates`
- `event_candidate_validation`
- `event_candidate_reviews`
- `reviewed_events_staging`
- `weekly_event_export`
- `events`
- `event_evidence`
- `event_reviews`
- `newsletter_event_exports`

## Design Rules

- keep raw discovery separate from reviewed newsletter content
- keep hosts separate from events
- make freshness visible
- preserve source URLs
- prefer boring repeatable tools over clever one-off scraping
- make each script useful to a non-technical operator through clear output fields
- every event should trace back to a monitored source
- parsing creates candidates, not approved events
- validation should be a separate step from discovery
- publishable newsletter copy should be separate from raw source text
