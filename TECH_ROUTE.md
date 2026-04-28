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
- a clear comp and referral path that fits the Beehiiv setup we actually have
- a working sender identity
- Beehiiv Scale rather than Launch so referrals, automations, and webhooks are available
- one publication architecture that supports segmented sends instead of assuming many separate publications
- a simple admin/editing surface
- a small set of core tables for sources, raw items, cleaned events, subscribers, and send logs
- one plain-English review queue for approving and correcting event items
- one reliable way to get events into the queue from manual entry and email first
- one practical social research workflow that uses the logged-in `psf_climb` research account plus AI extraction helpers for gyms, comps, state bodies, and sponsor clues
- DNS and domain-authentication setup for the Beehiiv sending domain, including SPF, DKIM, and DMARC alignment
- a plan for Beehiiv custom-domain warming so early sends ramp cleanly on the branded domain

Can wait:

- a custom dashboard app
- sophisticated automation across every channel
- advanced subscriber segmentation
- a public archive
- a full event directory
- complex search or filters
- broad scraping coverage before the workflow is stable
- full ambassador or sponsor program build-out
- gym ambassador structures

## Best Early Stack

- landing page / site: beehiiv website builder
- signup form: beehiiv subscribe forms
- email platform: beehiiv
- Beehiiv plan target: Scale
- repo host: GitHub Free
- event storage: Postgres
- event collection: AI-assisted ingestion plus manual review plus direct submissions
- social discovery: `psf_climb` as the primary logged-in research account, with AI helpers for triage, extraction, and normalization
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

Current PSF implementation bias:

- one Beehiiv publication is the default operating model
- one sending domain is the default sending model
- local, national, and later international audiences should be handled through segmentation, not by multiplying publications early
- the repo and database should preserve enough structure to support more advanced personalization later without forcing that complexity into launch

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
- segment subscribers by country and broader region when needed
- support optional second-step profile capture without making primary signup heavy
- store events in a simple structure
- support a weekly send
- make sponsor placement easy later
- support multiple cities from the beginning
- allow a "coming soon" city experience
- make semi-manual content creation manageable
- accept content from Instagram, email, websites, WhatsApp, and direct submissions
- support event recutting rules such as "feature for X weeks" or "feature until date"
- support issue assembly that can combine global blocks, country blocks, and city-specific blocks
- preserve a clean path to preference-center driven targeting later
- let the PBO layer show what is now, next, later, blocked, waiting, and done
- let initiative handoffs be copied into a fresh Codex chat without rereading the full thread

## AI-Assisted Social Research Workflow

The first useful research system should stay semi-manual and evidence-led.

Use `psf_climb` as the logged-in discovery surface for:

- following Australian climbing gyms, state bodies, competition brands, routesetters, and likely sponsors
- seeing Instagram suggestions, tagged posts, followers/following overlaps, reels, and story highlights that a logged-out scraper will miss
- saving likely hosts and sponsor leads before they become structured records

Use AI helpers for assistance, not blind trust:

- discovery helper: turn a shortlist of known gyms or associations into a broader host list by state and city
- extraction helper: turn screenshots, captions, posters, and event pages into draft structured rows
- normalization helper: merge duplicate host or sponsor names and suggest the right entity type
- review helper: flag missing fields, weak evidence, or likely duplicate events before they hit the main tables

Operating rules:

- discover hosts first, not sponsors first
- use Instagram and Facebook for discovery, then confirm against official sites, ticketing pages, or association pages where possible
- treat AI output as draft material that must keep a source URL, screenshot, or note trail
- prefer lightweight capture and verification over full unattended scraping
- add more automation only after the manual-plus-AI loop is stable and clearly painful

Practical sequence:

1. use `psf_climb` to discover or monitor host accounts
2. save candidate gyms, comps, state bodies, and sponsor clues
3. capture source evidence as URLs, screenshots, or copied captions
4. use AI to turn that evidence into draft host, event, or sponsor rows
5. verify the draft against the source and normalize names
6. write approved records into the research tables
7. promote durable learnings back into the PSF queue if the workflow or tooling needs to change

Primary discovery surfaces:

- Instagram profile networks, tagged posts, reels, and highlights
- Facebook pages and event listings
- official gym and association websites
- ticketing platforms such as Humanitix, Eventbrite, and TryBooking
- recap pages or results pages that expose sponsor relationships after the fact

Recommended repo touchpoints for this workflow:

- `sponsor_research/hosts.csv` for the host universe
- `sponsor_research/host_review_queue.csv` for the next review order
- `sponsor_research/events.csv` for event instances
- `sponsor_research/event_sponsors.csv` for sponsor appearances
- `sponsor_research/sponsors_master.csv` for normalized sponsor entities
- `sponsor_research/COMP_RESEARCH_SYSTEM.md` for the working runbook

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

Subscriber and sending model:

- Beehiiv remains the sending surface, but Postgres should hold the richer subscriber profile and workflow state
- Beehiiv subscriber records should at least map to email, status, city, country, region, interests, signup source, and preference-center relevant fields
- webhook-driven sync should be designed in from the start even if some launch steps are manual
- issue composition should assume a reusable block structure so the same send can be tailored by segment without cloning the whole workflow

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
11. Add the `psf_climb`-led social research loop and keep it tied to the research CSVs before building heavier scraping.
12. Add ingestion helpers for social, email, web, and WhatsApp if they save time without creating fragility.
13. Wire the PBO queue to the active work items and handoff packets.
14. Send the first issue manually.

## Later Upgrade Path

After traction:

- move the public archive into a website
- add filtering and city pages
- add automated imports if needed
- migrate to a more custom stack only if the manual system becomes painful

## Decision Rule

Choose tools that keep the work moving this month, not tools that look impressive in a year.
