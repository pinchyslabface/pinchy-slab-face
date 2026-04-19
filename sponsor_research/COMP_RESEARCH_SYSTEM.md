# Competition Research System

This folder now supports a repeatable workflow for building an exhaustive-ish database of Australian climbing competitions and their sponsors over the last 24 months.

The key design choice is:

- keep `hosts` separate from `events`
- keep `events` separate from `event_sponsors`
- keep `event_sponsors` separate from the normalized `sponsors` CRM

That makes it possible to:

- reuse `hosts` later in the all-gyms CRM
- add new events without redoing sponsor normalization
- see sponsor overlap across multiple states, gyms, and event types
- identify where distributor relationships sit between global brands and local event support

## Files

- `hosts.csv`
  Shared host universe. This is the join layer for future gym CRM work.
- `events.csv`
  Master event index. One row per comp or event.
- `event_sponsors.csv`
  Sponsor appearances. One row per `event x sponsor`.
- `sponsors_master.csv`
  Normalized sponsor CRM. One row per sponsor company / organization.

## Entity Model

### 1. Hosts

Use `hosts.csv` for:

- gym operators
- individual gym venues when they run venue-specific comps
- national/state associations
- university clubs
- community orgs
- event brands

Important notes:

- `host_id` is the durable key.
- `crm_entity_id` is reserved for linking this host later to the dedicated all-gyms CRM.
- `host_level` separates operator-level hosts from venue-level hosts.

### 2. Events

Use `events.csv` for:

- state titles
- national titles
- local gym comps
- bouldering jams
- league rounds
- youth comps
- university comps
- social/fundraiser comps if they had sponsors or prize support

Each row should represent one event instance, not just a recurring series name.

Examples:

- `Boulder Lab Winter Boulder Series Round 2` is one event row
- `Victorian State Bouldering Titles 2025` is one event row

### 3. Event Sponsors

Use `event_sponsors.csv` for every sponsor appearance discovered on:

- event pages
- sponsor logo pages
- recap pages
- host Instagram posts
- Facebook events
- ticketing pages

This table is where overlap analysis happens.

### 4. Sponsors Master

Use `sponsors_master.csv` to normalize:

- alternate spellings
- global brand vs Australian distributor
- local-only sponsor vs national sponsor
- category and contact path

## Coverage Standard

Treat event evidence in four levels:

- `official_page`
- `host_social`
- `ticketing_page`
- `third_party_mention`

Rules:

- include any event confirmed by `official_page`, `host_social`, or `ticketing_page`
- include `third_party_mention` rows only if clearly likely and mark them `probable`
- if multiple sources exist, keep the strongest source in `primary_source_type` and add others to notes

## Exhaustive Collection Workflow

### Step 1. Build and maintain the host universe

For every likely host, capture:

- official website
- event page
- news/blog page
- Instagram
- Facebook
- ticketing hints

### Step 2. Work host by host

Do not try to search only by event name.

For each host, search:

- website event pages
- website blog/news posts
- Instagram posts and reels
- Facebook posts and events
- Eventbrite / Humanitix / TryBooking / other ticketing pages
- Google searches constrained to the host domain or host name

### Step 3. Add every event first

Do not wait until sponsors are known.

Populate:

- event identity
- host
- venue and city/state
- date
- event type
- evidence level

### Step 4. Extract sponsor appearances second

Only after the event row exists:

- add one row per sponsor appearance to `event_sponsors.csv`
- normalize the sponsor into `sponsors_master.csv`

### Step 5. Normalize overlap regularly

Examples:

- `Black Diamond` vs `Black Diamond Equipment`
- `Arc'teryx` vs `Arcteryx`
- global brand vs local distributor

## Suggested Search Patterns

Use these patterns host by host:

- `site:HOSTDOMAIN competition OR comp OR bouldering jam`
- `site:HOSTDOMAIN event OR events climbing`
- `site:HOSTDOMAIN sponsors competition`
- `"HOST NAME" competition climbing`
- `"HOST NAME" instagram climbing comp`
- `"HOST NAME" facebook event climbing`
- `"HOST NAME" Eventbrite climbing`
- `"HOST NAME" Humanitix climbing`

## Prioritization

Start with hosts in this order:

1. national and state associations
2. major gym chains and multi-site operators
3. major independent gyms in Melbourne, Sydney, Brisbane, Adelaide, Perth
4. university clubs and local event brands
5. smaller regional gyms

## Recommended Next Pass

The next high-leverage research pass should focus on:

- Boulder Lab
- Rocket Climbing
- 1UP Bouldering / Up Climbing mentions
- Stax Climbing as event brand / partner / sponsor
- Urban Climb
- 9 Degrees
- Beyond Bouldering
- Northside Boulders
- Sport Climbing Australia
- state associations

That should rapidly improve both event coverage and sponsor overlap analysis.
