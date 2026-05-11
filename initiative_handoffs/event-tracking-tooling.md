# Event Tracking Tooling Handoff

## Purpose

This packet lets Josiah or a fresh Codex chat continue the PSF event-tracking tooling lane without needing the original discussion.

The goal is to build robust, scalable tooling that finds, validates, parses, and exports climbing events and activities for the weekly PSF sends.

## Current State

The repo now has a first tooling plan:

- `EVENT_TRACKING_TOOLING_PLAN.md`

The repo also has a first working script:

- `sponsor_research/build_event_monitor_queue.mjs`
- `sponsor_research/collect_web_sources.mjs`
- `sponsor_research/parse_event_candidates.mjs`
- `sponsor_research/validate_event_candidates.mjs`
- `sponsor_research/review_event_candidates.mjs`
- `sponsor_research/export_weekly_event_views.mjs`

The monitoring script reads:

- `sponsor_research/hosts.csv`
- `sponsor_research/host_update_channels.csv`

And writes:

- `sponsor_research/event_monitor_queue.csv`

The script has been run once and generated 74 monitoring rows.

The public web collector reads:

- `sponsor_research/event_monitor_queue.csv`

And writes:

- `sponsor_research/source_snapshots.csv`
- `event_intel/source_snapshots/`

The collector has been smoke-tested with `--limit 5`. It fetched four sources, recorded one broken/blocked source, wrote raw HTML/text snapshots, and correctly reported no changes on a second run against the same batch.

The candidate parser reads:

- `sponsor_research/source_snapshots.csv`
- extracted text files under `event_intel/source_snapshots/`

And writes:

- `sponsor_research/event_candidates.csv`

The parser has been smoke-tested against the current public web snapshots. It creates review-only candidates and is intentionally not a validation or publish-readiness tool.

The validation script reads:

- `sponsor_research/event_candidates.csv`

And writes:

- `sponsor_research/event_candidate_validation.csv`

The validator has been smoke-tested against 41 current event candidates. It surfaced 4 strong candidates, 6 likely duplicate-group rows, 11 needs-review rows, 17 weak candidates, and 3 likely-noise rows. The overlay is for prioritising human review only.

The human review helper reads:

- `sponsor_research/event_candidate_validation.csv`
- `sponsor_research/event_candidates.csv`

And writes:

- `sponsor_research/event_candidate_review_queue.csv`
- `sponsor_research/event_candidate_reviews.csv`
- optionally `sponsor_research/reviewed_events_staging.csv` with `--promote-approved`

The review helper has been smoke-tested. It created 41 review rows, 21 prioritized queue rows, and an empty reviewed-events staging file because no candidates have been manually approved yet.

The weekly export helper reads:

- `sponsor_research/reviewed_events_staging.csv`

And writes:

- `sponsor_research/weekly_event_export.csv`
- `sponsor_research/weekly_event_export_summary.csv`

The exporter has been smoke-tested. It correctly produced zero export rows and a `no_manually_approved_rows_yet` status because no candidates have been manually approved.

## Important Decision

This should not be treated as just a scraper project.

It should be treated as an event intelligence pipeline with human review at the right points.

The working architecture is:

1. source registry
2. collection
3. change detection
4. event candidate parsing
5. validation and enrichment
6. weekly-send export

## Core Principle

Every event should trace back to a monitored source.

Parsing creates candidates, not final events.

Validation and publishing should remain separate from discovery.

## Planned Skills

Build toward three PSF-specific skills:

- `psf-event-watch`
  Refresh sources, run monitoring queues, review changed sources, and create event candidates.
- `psf-event-validate`
  Clean, dedupe, confidence-score, and promote event candidates.
- `psf-weekly-send-builder`
  Select reviewed events by city/date and turn them into weekly-send-ready copy.

## Agent Roles

If agents are used later, keep them narrow:

- Source Scout
- Change Monitor
- Event Extractor
- Event Validator
- Weekly Editor

Rule:

- no single agent should both discover and approve an event for publishing

## Build Order

Recommended next build sequence:

1. Harden the source registry.
2. Improve and run the monitoring queue.
3. Add a source snapshot script for public web pages. Done.
4. Add event candidate parsing from captured source text. Done.
5. Add validation and duplicate scoring. Done.
6. Add a simple human review workflow. Done.
7. Add weekly export views for city and date windows. Done.
8. Add browser-assisted Instagram and Facebook review workflows. Next.
9. Move the proven schema into Postgres and a small admin UI.

## Immediate Next Step

Add browser-assisted Instagram and Facebook review workflows.

Good outcome:

- it reads the monitoring queue and selects social sources that require manual/browser review
- it creates a social review queue for the logged-in `psf_climb` account and public Facebook pages
- it records manual capture notes without pretending social scraping is automated
- it can accept copied caption/post text into the same candidate pipeline later
- it preserves source URLs, review dates, and uncertainty

Suggested future files:

- `sponsor_research/build_social_review_queue.mjs`
- `sponsor_research/social_review_queue.csv`
- `sponsor_research/social_capture_notes.csv`

## Fresh Chat Prompt

Use this prompt in a fresh Codex chat:

```text
Read PROJECT_INDEX.md, EVENT_TRACKING_TOOLING_PLAN.md, sponsor_research/COMP_RESEARCH_SYSTEM.md, and initiative_handoffs/event-tracking-tooling.md.

Continue the PSF event-tracking tooling lane. Start by checking the existing source registry, monitoring queue, source snapshots, event candidates, validation overlay, human review files, and weekly export status. Then implement the next small useful tool in the build order: browser-assisted Instagram and Facebook review workflows. The tool should create a prioritized social review queue and a place to record manual social capture notes without pretending social scraping is automated.

Keep the workflow conservative: every event must trace back to a monitored source, parsing should create candidates only, and validation must remain separate from discovery.
```
