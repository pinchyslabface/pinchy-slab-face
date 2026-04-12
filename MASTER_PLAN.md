# PSF Master Plan

## Purpose

Pinchy Slab Face exists to become the most trusted indoor climbing scene inbox and community layer, starting as a useful newsletter and growing into a broader audience and relationship asset.

## The Big Idea

People currently have to track climbing news across scattered social posts, gym pages, group chats, and word of mouth.

PSF should reduce that friction by becoming:

- the easiest way to stay in the loop
- the best place for gyms and climbers to be seen
- a growing audience that can support future products and sponsorship

## Internal Goal

Build the world’s most trusted indoor climbing audience.

More specifically:

- own the relationship with climbers
- become valuable to gyms
- grow city-by-city, then country-by-country, then globally
- create a durable media and community asset

## Public Promise

PSF should feel like:

- the easiest way to know what’s on in indoor climbing
- the place where the local climbing scene gets seen

Shorter working version:

- the world’s best indoor climbing scene inbox

## Product Definition

The core product is not a full website.

It is:

- a signup surface
- a subscriber list
- a weekly email
- a lightweight content and event collection system

## Core Jobs To Be Done

For climbers:

- tell me what is happening
- tell me where it is happening
- tell me what I should not miss

For gyms and community contributors:

- help me get seen
- help me get attendance
- help me stay connected to the local scene

## Content Model

PSF should have three layers:

### 1. Utility Layer

The core reason to open the email.

Examples:

- events
- comps
- socials
- recurring sessions
- theme nights
- major gym updates
- notable deadlines or reminders

### 2. Community Layer

The layer that makes PSF feel alive and beloved.

Examples:

- gym owner or staff interviews
- coach or setter spotlights
- climber spotlights
- photo or video of the week
- training tips
- interesting local scene moments

### 3. Global Layer

Optional, secondary, and never dominant.

Examples:

- funny climbing content
- notable newsworthy items
- interesting global stories that add flavour

Rule:

- global content should support the brand, not replace the local focus

## Audience Strategy

Primary audience:

- indoor climbers

Secondary audience:

- gyms
- coaches
- setters
- event organisers

Audience structure:

- multi-city from day one
- city-specific signups
- “coming soon” cities available early
- one active city at launch if needed

## Launch Strategy

The first real launch moment is Ballina at Youth Nationals in mid-May.

This is a launch marketing moment, not necessarily the first full newsletter market.

Melbourne remains the most likely first market for the actual newsletter send, while the wider multi-city structure stays in place from day one.

Launch mechanics:

- QR cards
- on-site signup
- comp or giveaway
- sponsor support for the giveaway

## Monetisation Path

Early monetisation tests:

- sponsor block
- featured event
- gym shout-out
- giveaway sponsor

Later possibilities:

- newsletter sponsorship packages
- directory products
- city pass products
- physical products

## Operating Rules

- keep the MVP weekly and lean
- do not let global content take over the local premise
- test what people want before overbuilding
- keep gyms as partners, not just sources
- use the audience to learn what should come next

## Current Decisions

- PSF should use a local PBO layer for project management and orchestration, borrowed from the useful parts of the tinyme-build-orchestrator idea but renamed and simplified for PSF
- the first proper PBO ingest should seed the project with the project snapshot, queue, backlog, initiatives, milestones, handoff note, and ingest prompt
- the current working team is just Josiah and Mike, so planning assumptions should stay lightweight and fit a two-person operating model
- multi-city structure from day one
- Melbourne is the most likely first active newsletter market
- Ballina is the first launch marketing moment, not the default first newsletter market
- community content is allowed and encouraged
- global flavour is allowed but secondary
- scraping helpers can be used if they reduce work
- a comp/giveaway can be part of ongoing growth
- beehiiv is the publishing layer
- GitHub Free is the private repo host
- Neon Free is the current hosted Postgres default
- Postgres is the operational source of truth for PSF content and subscriber data
- AI-assisted ingestion can be used across social, email, web, and direct submissions
- source attribution is useful for analysis, but core segmentation should be driven by city, level, and interest
- the primary public domain is `pinchyslabface.com`
- Fastmail is the PSF mailbox layer, with `founder@pinchyslabface.com` as the main login mailbox
- `hello@`, `ops@`, `gyms@`, and `newsletter@` are aliased into the main mailbox
- Beehiiv should use the PSF newsletter sender identity, with the publication URL temporarily on Beehiiv's default domain until the custom domain is wired up
- `pinchyslabface.com.au` is deferred until the PSF entity can legitimately hold it
- the PM layer should keep the project queue, dependencies, blockers, handoffs, and next actions visible so the next chat can decide what should happen next without re-litigating the whole project
- the working queue should stay short and readable, with simple statuses like now, next, later, blocked, waiting, and done
- weekly PM updates should use a consistent check-in template so handoffs stay skimmable
- the PSF-local dashboard should live in `PBO_DASHBOARD.md`
- the app-shaped dashboard scaffold should live in `PBO_APP_SPEC.md`
- the PSF-local skill behavior should live in `PBO_SKILLS.md`
- the first PBO ingest should live in `PBO_INITIAL_INGEST.md`
- the PSF PM layer should keep the familiar TBO-style view set: dashboard, board, backlog, initiatives, milestones, project status, and WBS
- the current PSF dashboard scaffold lives under `psf-dashboard/`
- PBO metadata and handoffs should be written in plain English so Josiah can pick up an initiative without needing a dev translator
- initiative-level ingest prompts should be used when a fresh Codex chat needs to continue the work
- the first PBO population should be readable without re-opening the whole chat history

## Open Questions

- how much granularity the city structure should have
- which content types drive the most opens and retention
- what should be inline versus click-through
- how much community content can be sustained reliably
- which tools best support the workflow
- which parts of PBO should stay documentation-only versus be turned into tooling later

## Update Protocol

When a separate chat clarifies one of these areas, update the relevant section here:

- strategy or scope changes go in `Purpose`, `Internal Goal`, or `Launch Strategy`
- audience changes go in `Audience Strategy`
- content changes go in `Content Model`
- monetisation changes go in `Monetisation Path`
- execution changes go in `Operating Rules` or `Current Decisions`
- unresolved matters go in `Open Questions`

Treat this file as the master reference for PSF.

## Framework Boundary

PSF uses a local adaptation of the TBO framework.

That means:

- PSF stays separate from Tinyme
- PSF docs should not assume hosted TBO infrastructure
- PSF reference docs should be written so they can be updated by separate chats
- if a doc needs framework context, point it back to `TBO_ADAPTATION.md` and `PROJECT_BOUNDARIES.md`

For the PSF-specific framing, see `TBO_FOR_PSF.md`.

## Project Flow

PSF should move through the same loop every time:

1. discuss the question in the relevant chat
2. decide on the current direction or assumption
3. update the matching PSF doc
4. if the decision changes the project broadly, update this master plan
5. let the next chat read the updated docs instead of starting from scratch

Rule:

- if it matters enough to act on, it matters enough to write down
