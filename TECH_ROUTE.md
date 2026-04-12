# Tech Route

## Recommendation

Start with the simplest stack that lets us move quickly and stay consistent.

The first version should be easy to run manually, easy to change, and cheap to maintain.

This route should also fit the PSF version of the TBO framework, meaning it should be local, lightweight, and easy to evolve as the project learns.

Current lean recommendation:

- GitHub Free as the private repo host
- beehiiv as the base layer
- Neon Free as the hosted Postgres default
- Postgres as the operational source of truth
- a small internal admin tool for review and correction
- separate ingestion helpers for social, email, web, and direct submissions
- only add custom code where the platform or workflow has a clear gap
- the PBO queue and dashboard as the planning surface for work items, blockers, and handoffs

## Launch-Ready Minimum

Before the first newsletter send, PSF only needs the pieces required to move one item from intake to send without confusion.

Must have:

- a private git repo
- a hosted Postgres account
- Beehiiv signup forms and newsletter sending
- a working sender identity
- a simple admin/editing surface
- a small set of core tables for sources, raw items, cleaned events, subscribers, and send logs
- one plain-English review queue for approving and correcting event items
- one reliable way to get events into the queue from manual entry and email first

Can wait:

- a custom dashboard app
- sophisticated automation across every channel
- advanced subscriber segmentation
- a public archive
- a full event directory
- complex search or filters
- broad scraping coverage before the workflow is stable

## Best Early Stack

- landing page / site: beehiiv website builder
- signup form: beehiiv subscribe forms
- email platform: beehiiv
- repo host: GitHub Free
- event storage: Postgres
- event collection: AI-assisted ingestion plus manual review plus direct submissions
- publishing: manual newsletter send from beehiiv
- ops box: a dedicated Mac mini for isolated workers, triage, and scheduled jobs
- planning layer: PBO dashboard, board, and initiative ingest packets

## Stack Shape

We should think about the base layer in four parts:

1. public site / signup surface
2. email and audience layer
3. operational data and event collection workflow
4. project management and orchestration via PBO

The stack choice is mostly about how much of those four we want in one tool versus split across tools.

## Repo Structure

Keep the PSF repo focused on operations, not on duplicating Beehiiv or trying to become the website itself.

Recommended top-level shape:

```text
/
  docs/                # PSF decisions, workflow notes, runbooks
  apps/
    admin/             # internal review and correction tool
  packages/
    core/              # shared types, utilities, and domain logic
    ingestion/         # source adapters and normalizers
    workers/           # scheduled jobs and background tasks
  db/
    schema/            # migrations or schema definitions
    seeds/             # sample data and fixtures
  scripts/             # one-off maintenance or import scripts
  ops/                 # Mac mini runbooks, setup notes, and service configs
  source_notes/        # preserved raw planning notes
```

Principles:

- keep shared domain logic out of one-off scripts
- keep ingestion code separate from the admin UI
- keep database schema changes explicit
- keep Mac mini operational notes in `ops/`
- keep the repo usable even if Beehiiv or the admin UI changes later
- keep PBO planning docs visible at the repo root so the queue is easy to find

## Options

### 1. Beehiiv

Best if the newsletter is the product.

Strengths:

- newsletter-first
- website plus email in one place
- referral and growth features
- monetisation features later
- multi-publication support at higher tiers

Tradeoffs:

- less of a general-purpose website platform than Wix
- custom workflow needs may still require separate tools

### 2. Wix

Best if the website is the product surface.

Strengths:

- easy site building
- subscribe forms
- built-in email marketing
- good for a branded public site

Tradeoffs:

- not as newsletter-native as beehiiv
- can become a more general website project than a list growth system

### 3. BYO

Best if we need a custom product later.

Strengths:

- full control
- custom data model
- custom scraping and workflow options

Tradeoffs:

- slower
- more maintenance
- easier to overbuild

## Stack Decision Bias

Prefer tools that make these things easy:

- editing the landing page without friction
- collecting signups cleanly
- tagging subscribers by region
- assembling the weekly newsletter quickly
- keeping the event list tidy
- running review and correction workflows without friction
- supporting AI-assisted extraction and deduplication

## Why This Route

- fastest to launch
- lowest maintenance burden
- easier for the two-person team to maintain
- lets us validate the audience before building complex software

## What The Tech Needs To Do

- capture emails
- segment subscribers by city or interest
- store events in a simple structure
- support a weekly send
- make sponsor placement easy later
- support multiple cities from the beginning
- allow a "coming soon" city experience
- make semi-manual content creation manageable
- accept content from Instagram, email, websites, WhatsApp, and direct submissions
- support event recutting rules such as "feature for X weeks" or "feature until date"
- let the PBO layer show what is now, next, later, blocked, waiting, and done
- let initiative handoffs be copied into a fresh Codex chat without rereading the full thread

## First Usable Run Sequence

The simplest end-to-end sequence should be:

1. capture an event from intake
2. store the raw item in Postgres
3. normalize it into a clean event record
4. review and correct it in the admin surface
5. mark the send status and recut rules
6. add it to the weekly issue draft in Beehiiv
7. send the issue
8. log what was sent and what should change next time

At the start, the review step can be mostly manual. The system only needs to be structured enough that the same process can happen again next week without confusion.

## What The Tech Does Not Need Yet

- accounts and logins
- complex search
- geo-fencing
- a public custom app
- a full marketplace

## Practical Data Structure

For the early stage, a simple event record is enough, but it should live in Postgres so it can support better workflow later:

- title
- gym name
- city
- state
- date
- event type
- source link
- notes
- source channel
- confidence or review status

And a subscriber record:

- email
- home city or region
- climbing level band
- primary interest
- secondary interest
- signup source or QR / UTM metadata

## Suggested Build Order

1. Choose the repo host and create the private repo.
2. Choose the Postgres host and create the database.
3. Choose the email platform and confirm the sender identity.
4. Check which Beehiiv plan features are available for later automation, especially API access and webhooks.
5. Create the signup page.
6. Create the newsletter template.
7. Set up the core tables and simple admin/editing surface.
8. Create the repo structure and shared domain model.
9. Build a minimal internal review queue for event correction.
10. Add a simple event submission form and intake routes.
11. Add ingestion helpers for social, email, web, and WhatsApp if they save time without creating fragility.
12. Wire the PBO queue to the active work items and handoff packets.
13. Send the first issue manually.

## Later Upgrade Path

After traction:

- move the public archive into a website
- add filtering and city pages
- add automated imports if needed
- migrate to a more custom stack only if the manual system becomes painful

## Decision Rule

Choose tools that keep the work moving this month, not tools that look impressive in a year.
