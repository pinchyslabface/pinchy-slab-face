# Thread Handoff

## Coverage

This handoff is based on the source notes archived in `source_notes/`:

- `source_notes/PSF_1.txt`
- `source_notes/PSF_2.txt`
- `source_notes/PSF_3.txt`
- `source_notes/PSF_4._B.txt`
- `source_notes/PSF_4_A.txt`
- `source_notes/PSF_5_A.txt`
- `source_notes/PSF_5_B.txt`
- `source_notes/PSF_6.txt`
- `source_notes/PSF_7.txt`

I have not seen any older chat history outside those files, so this handoff only claims coverage of what is preserved here.

It also reflects the current coordination docs in the repo, which now frame PSF as a separate home project with a local PBO layer.

## Current State

The project has converged on one primary near-term business:

- a weekly indoor climbing events newsletter
- paired with a simple landing page and email capture
- supported by manual and semi-manual event curation from gyms, websites, and Instagram

For project management, the current working model is:

- PSF is a separate home project
- the team is just Josiah and Mike
- PBO is the local planning and orchestration layer
- the coordination goal is to keep the next action, dependencies, blockers, and handoffs visible
- the working queue should stay short and readable, with a consistent weekly check-in template
- the PSF dashboard should be read from `PBO_DASHBOARD.md`
- the app-shaped dashboard scaffold should be read from `PBO_APP_SPEC.md`
- the PSF-local skill behavior should be read from `PBO_SKILLS.md`
- the PSF PM layer should keep the same core TBO-style views: dashboard, board, backlog, initiatives, milestones, project status, and WBS
- the runnable local skills now exist as `psf-pbo`, `psf-pbo-promoter`, and `psf-pbo-launch-deck`
- the current dashboard scaffold lives under `psf-dashboard/`
- the runnable local PSF planning app now lives under `pbo_app/` and launches from `./run_pbo`
- the local planning app now exposes `/health` and `/api/state` so the read surface has a cleaner internal contract
- the PBO metadata should be plain-English and non-technical
- initiative-level ingest prompts should be used when a fresh Codex chat needs to continue work
- the handoff packet should be a short copy/paste block that links the repo docs and the open questions
- reusable initiative packets should live in `initiative_handoffs/`
- the dashboard and initiatives pages should expose a visible copy button for that packet
- event tracking tooling is now captured as a dedicated lane in `EVENT_TRACKING_TOOLING_PLAN.md`
- the event tracking pickup packet lives in `initiative_handoffs/event-tracking-tooling.md`
- the first event monitoring tool is `sponsor_research/build_event_monitor_queue.mjs`, which generates `sponsor_research/event_monitor_queue.csv`
- the first public web collection tool is `sponsor_research/collect_web_sources.mjs`, which writes `sponsor_research/source_snapshots.csv` and raw/text snapshots under `event_intel/source_snapshots/`
- the first candidate parsing tool is `sponsor_research/parse_event_candidates.mjs`, which writes review-only candidates to `sponsor_research/event_candidates.csv`
- the first validation overlay tool is `sponsor_research/validate_event_candidates.mjs`, which writes review-priority scoring to `sponsor_research/event_candidate_validation.csv`
- the first human review helper is `sponsor_research/review_event_candidates.mjs`, which writes `sponsor_research/event_candidate_review_queue.csv`, `sponsor_research/event_candidate_reviews.csv`, and optionally `sponsor_research/reviewed_events_staging.csv`
- the first weekly export helper is `sponsor_research/export_weekly_event_views.mjs`, which writes `sponsor_research/weekly_event_export.csv` and `sponsor_research/weekly_event_export_summary.csv` from manually approved staging rows
- the first PBO ingest is captured in `PBO_INITIAL_INGEST.md`
- the first PBO ingest should populate the project snapshot, queue, backlog, initiatives, milestones, handoff packet, and ingest prompt before deeper work starts

The email list is the main asset. The website and richer database are supporting tools, not the first product.

## Current Pivot

Because the Ballina trip is this week, PSF is now cutting the first public moment down to a soft MVP launch:

- flyer or card handouts
- QR code to Beehiiv
- state-team-cohort landing page copy
- broader PSF "coming soon" value proposition
- minimal signup fields
- welcome email
- manual review of signup signal after the trip

This replaces the fuller launch loop as the immediate focus.

The comp, referral loop, sponsor packaging, gym partner pack, paid social, and custom web work are still useful, but they should not block the Ballina QR signup path.

## Decisions Already Made

- Start with content-first distribution, not a full platform
- Focus on indoor climbing events and discovery
- Use a multi-city structure from the start
- Keep the MVP lean, but allow semi-manual scraping helpers
- Delay bigger product ideas until the audience exists
- Use a PSF-local PBO layer to sequence work and maintain weekly execution rhythm
- Keep the planning assumptions lightweight enough for a two-person team

## Recommended Immediate Focus

1. Josiah creates the Beehiiv Ballina soft launch landing page
2. Josiah sets the signup form, confirmation message, and coming-soon welcome email
3. Josiah sends Mike the final landing page URL
4. Mike locks the QR flyer/card copy and print-ready asset
5. Mike generates the QR URL with clear source tracking where practical
6. Use `initiative_handoffs/first-market-and-signup-flow.md` if a fresh chat needs to continue the signup path
7. After Ballina, review signups by source, state, and role before deciding the next market and first-send priority
8. Refine from real use instead of adding more planning layers

## Assumptions

- Melbourne is the most likely first newsletter market, but the structure should support other cities from day one
- Ballina is the first launch marketing moment, not automatically the first newsletter market
- The first audience segment is indoor climbers who want to know what is on this week
- Manual and semi-manual curation is acceptable for the early stage
- The current working team is just Josiah and Mike unless a later doc says otherwise
- the launch comp should attract real climbers rather than broad generic comp-chaser traffic
- gyms should be treated as ecosystem partners first, not the first paying sponsor lane

## Open Questions

- What rule should decide whether Melbourne stays the first newsletter market or another city moves ahead?
- Which content mix will best drive opens and retention?
- Which brand name will we use publicly: Pinchy Slab Face, a newsletter name, or both?
- How much paid social should happen before the organic, referral, and gym loops are proven?
- What is the minimum viable launch sponsor package that is credible before audience scale exists?
- Which parts of PBO should stay as docs first versus be turned into tooling later?
- What is the right subscriber schema and Beehiiv field mapping for segmented sending without overcomplicating launch?
- How should Beehiiv segmentation, webhooks, and content assembly integrate with the Postgres operating model?

## Risks

- If event data goes stale, trust drops quickly
- If the scope expands too early, the project may stall
- If the first niche is too broad, the messaging may lose clarity
- If promotion is treated like too many equal-priority channels at once, the team may spread effort too thin before the core signup loop works
- If the comp is too broad or the prizes are not climbing-native enough, PSF may attract noisy low-fit subscribers that weaken the audience asset
- If PBO becomes heavy or duplicated, the team will spend more time managing the system than moving the project forward

## Recommended Next Thread Prompt

“Read the PSF planning docs, then use `initiative_handoffs/basic-tech-setup-working.md` or `initiative_handoffs/first-market-and-signup-flow.md` to pick up the right initiative in the correct lane and write any real decisions back into the repo.”
