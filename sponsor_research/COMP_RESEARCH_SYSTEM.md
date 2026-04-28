# Competition Research System

This folder now supports a repeatable workflow for building an exhaustive-ish database of Australian climbing gyms, competitions, state-body activity, and sponsor relationships over the last 24 months.

The key design choice is:

- keep `hosts` separate from `events`
- keep `events` separate from `event_sponsors`
- keep `event_sponsors` separate from the normalized `sponsors` CRM

That makes it possible to:

- reuse `hosts` later in the all-gyms CRM
- add new events without redoing sponsor normalization
- see sponsor overlap across multiple states, gyms, and event types
- identify where distributor relationships sit between global brands and local event support
- identify where media sellers, affiliate-capable retailers, and advertiser infrastructure already exist in the scene
- treat state bodies and gym/operator accounts as the main discovery network rather than relying on generic search alone

## Files

- `hosts.csv`
  Shared host universe. This is the join layer for future gym CRM work and the base for national gym coverage.
- `host_review_queue.csv`
  Ranked next-pass queue for event and sponsor research.
- `events.csv`
  Master event index. One row per comp or event.
- `event_sponsors.csv`
  Sponsor appearances. One row per `event x sponsor`.
- `sponsors_master.csv`
  Normalized sponsor CRM. One row per sponsor company / organization.
- `sponsor_fit_classification.csv`
  Overlay that separates strong climber-facing sponsor prospects from infrastructure nodes, B2B map entities, and low-fit local-only supporters.
- `sponsor_contact_paths.csv`
  Operational contact-path overlay that records the best Australian route to each priority sponsor, whether that route is a brand team, distributor, retailer, or service operator.

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
- `hosts.csv` should become the near-complete national indoor climbing host census, not just a comp-host shortlist.
- use influence fields to prioritize research, but never let ranking stop a host from being captured for completeness.

### Host coverage standard

The target is to capture every relevant indoor climbing host in Australia:

- all commercial indoor climbing gyms and bouldering gyms
- operator-level brands
- venue-level locations where event activity is local
- national and state sport-climbing bodies
- university clubs and meaningful community/event brands where relevant

Think of this in two passes:

1. completeness pass
2. influence and research-priority pass

Completeness comes first.

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

Important note:

Not every high-value monetisation lead will first appear as a direct event sponsor.

Some of the best later-stage prospects may first appear as:

- specialist climbing media
- affiliate-capable retailers
- demo-tour and activation brands
- gym software and B2B infrastructure providers
- hold brands and routesetting suppliers

### 4A. Sponsor Fit Classification

Use `sponsor_fit_classification.csv` as an overlay, not a replacement for the CRM.

Its purpose is to answer a different question:

- not just `is this in the climbing economy?`
- but `is this a strong first-wave newsletter sponsor target?`

Current bucket logic:

- `consumer_facing_high_fit`
- `community_service_high_fit`
- `retail_distributor_infrastructure`
- `industry_b2b_lower_immediate_fit`
- `ecosystem_context_low_priority`
- `local_event_only_low_fit`

Important rule:

- keep B2B and ecosystem nodes in the map
- do not let them dominate first-wave sponsor prioritisation unless the product audience shifts toward setters gym operators or industry buyers

### 4B. Sponsor Contact Paths

Use `sponsor_contact_paths.csv` to record the best practical route into a sponsor in Australia.

This is intentionally different from a naive `brand contact` concept.

For many climbing categories, the best route is actually:

- a distributor
- an importer
- a wholesaler
- a lead retailer
- or a direct service operator

The key question is:

- `who is the best commercial path to this sponsor in Australia right now?`

Recommended fields to maintain:

- `best_au_contact_path`
- `contact_path_owner`
- `contact_path_type`
- `contact_email`
- `confidence`
- `next_best_path`

Examples:

- `Ocun -> ALS Trade`
- `Unparallel -> Friction Addiction`
- `Petzl -> Spelean`
- `DMM -> Southern Cross Equipment`
- `Edelrid -> Southern Cross Equipment`
- `Butora -> Climbing Anchors`

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

Discovery priority inside the host universe:

- national and state sport-climbing bodies
- major multi-site gym operators
- venue-level gym accounts where events are local rather than operator-wide
- university clubs and local event brands
- sponsor or partner brands that repeatedly appear in event recaps
- media outlets and platforms that already aggregate or monetize climbing attention

Practical completion rule for this step:

- first get every gym/operator/association into `hosts.csv`
- then enrich the strongest hosts with ranking and better notes
- do not wait for perfect ranking data before capturing a real host

### Step 1A. National gym census pass

This is the easiest high-value part of the system and should be pushed close to complete.

For each gym or operator, capture at minimum:

- host identity
- operator vs venue level
- state and city/region
- website
- best-known Instagram handle or Facebook page
- current status

Then add:

- `market_tier`
- `influence_score`
- `footprint_signal`
- `social_reach_signal`
- `event_activity_signal`
- `scene_centrality_signal`
- `influence_notes`

Use these fields to answer questions like:

- which gyms matter most in Melbourne right now?
- which operators are national or multi-state?
- which venues are most likely to generate repeat event and sponsor signal?

Do not rely on ad hoc browsing alone when trying to make the census feel complete.

Run a repeatable search matrix for each state and major regional cluster:

- city or region name + `indoor climbing`
- city or region name + `bouldering gym`
- city or region name + `rock climbing centre`
- city or region name + `climbing club`

Apply that matrix across:

- capital cities
- secondary metros such as Gold Coast, Newcastle, Wollongong, Geelong, Townsville, Sunshine Coast
- regional anchors such as Cairns, Toowoomba, Albury-Wodonga, Coffs Harbour, Rockhampton, Hervey Bay, Mandurah

Then cross-check each candidate through multiple lenses before upgrading confidence:

- official operator or venue site
- official Instagram or Facebook
- state-body venue references
- theCrag or climbing directories
- tourism or city listings for smaller regional venues

Use `status` aggressively during this pass:

- `verified` when the venue has strong current official evidence
- `needs_review` when the venue is likely real but the live source quality is weaker or mixed
- `parked` when the lead looks historical, closed, or too weak to keep active

### Step 1B. Build the review queue from the census

After the host universe is reasonably complete, use it to rank `host_review_queue.csv`.

Queue order should favor:

1. national and state bodies
2. major operators
3. highest-influence metro venues
4. active independent gyms
5. regional anchors
6. lower-yield coverage hosts

### Step 1C. Run a host-enrichment pass

Once a host is in the census, do not try to cram every detail into `hosts.csv`.

Keep `hosts.csv` as the national host universe, then enrich through linked files:

- `host_locations.csv`
- `host_contacts.csv`
- `host_people.csv`
- `host_update_channels.csv`

Use this pass to capture the operational data that actually makes outreach and monitoring useful:

- street address and suburb/postcode
- venue-vs-operator location mapping
- public email contacts
- public phone contacts
- owner, founder, manager, routesetter, or coach profiles when relevant
- extra socials beyond the primary handle
- where event announcements usually appear

Practical rule:

- `hosts.csv` answers `what exists and why it matters`
- `host_locations.csv` answers `where it is`
- `host_contacts.csv` answers `how to reach it`
- `host_people.csv` answers `who matters there`
- `host_update_channels.csv` answers `how to keep it updated`

Recommended enrichment order for each high-priority host:

1. official website contact and location page
2. Google Maps or direct address on the official site
3. Instagram bio and linked channels
4. Facebook about/contact details
5. ticketing and event pages
6. staff bios, founder pages, LinkedIn, or coaching pages

Use `verified` only when the detail is supported by a clearly current public source.
Use `needs_review` when the field is likely correct but comes from weaker or mixed sources.

### Step 2. Work host by host

Do not try to search only by event name.

For each host, search:

- website event pages
- website blog/news posts
- Instagram posts and reels
- Facebook posts and events
- Eventbrite / Humanitix / TryBooking / other ticketing pages
- Google searches constrained to the host domain or host name

Before logging events, make sure the host has enough operating detail to be monitored efficiently:

- a confirmed venue address if it is a real gym location
- at least one working public contact path
- at least one reliable update channel

If a host does not have those yet, fill the enrichment layer first so later event work is faster.

When social is the starting point, use the logged-in `psf_climb` Instagram account first.

That account is useful for:

- profile suggestions and related-account discovery
- follower/following overlap between gyms, state bodies, and sponsors
- tagged-post and collab-post discovery
- highlight and reels review
- catching posters, sponsor logos, and recap graphics that may not appear on the website

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

When possible, also note the sponsor's motion type in research notes, for example:

- `title_sponsor`
- `prize_partner`
- `demo_tour`
- `retail_popup`
- `community_partner`
- `media_partner`
- `dropoff_partner`
- `affiliate_retailer_candidate`

### Step 5. Normalize overlap regularly

Examples:

- `Black Diamond` vs `Black Diamond Equipment`
- `Arc'teryx` vs `Arcteryx`
- global brand vs local distributor

### Step 6. Build the ecosystem around the sponsors

Do not stop at direct sponsor names.

Map the surrounding ecosystem:

- distributor routes
- retailer stockists
- gym pro shops
- shoe repair and drop-off networks
- hold brands and routesetting suppliers
- media outlets already selling to climbing advertisers
- affiliate-capable retailers already monetising gear demand

The goal is to understand:

- who already pays for climbing attention
- who already sells to climbers at purchase-intent moments
- who can unlock multiple brands through one relationship

### Step 6A. Media and advertiser-infrastructure layer

A separate research pass should track:

- climbing media outlets
- event and guide platforms
- podcast or creator channels
- affiliate networks and retailer programs

High-value examples to research:

- `Vertical Life`
- `theCrag`
- `The Hangout Podcast`
- `Commission Factory` retailer routes such as `Wild Earth` and `Paddy Pallin`

These matter because they show:

- which brands are already trained to buy climbing media
- what inventory types may already exist in the category
- which monetisation models are already proven

### Step 6B. Newsletter-fit and monetisation-fit

As the map grows, separate:

- event sponsor relevance
- ecosystem relevance
- newsletter revenue relevance

Those are not the same thing.

## `psf_climb` + AI Helper Workflow

Use a semi-manual operating loop.

The account does discovery.
AI does structuring.
The repo stays the reviewed source of truth.

### 1. Discovery pass

Use `psf_climb` to:

- follow gyms, associations, comp brands, and likely sponsors
- inspect profile links, tagged posts, collabs, reels, highlights, and recent captions
- save or screenshot anything that looks like a host, event, sponsor logo, or partner relationship

Good discovery targets:

- newly surfaced gym accounts
- state-body event announcements
- comp posters
- recap posts that tag sponsors or prize partners
- sponsor reposts that reveal a relationship from the brand side

### 2. Evidence capture pass

For each useful find, keep at least one of:

- source URL
- screenshot
- copied caption
- note on where in the profile or site the evidence came from

Do not rely on memory-only extraction.

### 3. AI draft pass

Use AI helpers to turn the evidence into draft structured outputs:

- host candidate -> `hosts.csv` or `host_review_queue.csv`
- event candidate -> `events.csv`
- sponsor appearance candidate -> `event_sponsors.csv`
- normalized sponsor candidate -> `sponsors_master.csv`

Ask the helper to return:

- proposed row values
- confidence
- missing fields
- duplicate risks
- the exact source it used

### 4. Human verification pass

Before writing to the main CSVs:

- confirm the event or relationship actually exists
- check date, city, state, and host identity
- separate operator-level entities from venue-level entities
- distinguish confirmed sponsors from mere tags or ambient mentions

### 5. Normalization pass

Regularly review:

- repeated sponsors with variant spellings
- multi-location operators that need venue-level rows
- state bodies or event brands that should become priority hosts
- sponsor relationships that look national versus local-only

## Influence Ranking Rule

Do not pretend we have exact foot-traffic data.

Instead, use a practical observable ranking model.

Each meaningful gym/operator host should receive:

- `market_tier`
- `influence_score`
- `footprint_signal`
- `social_reach_signal`
- `event_activity_signal`
- `scene_centrality_signal`
- `influence_notes`

This is a research-priority system, not a scientific attendance ranking.

Example interpretation:

- `Urban Climb Blackburn` might end up as a `major_metro` host with a high `influence_score` if it shows strong social reach, comp activity, and scene centrality
- `Sport Climbing Victoria` might reasonably sit at `statewide` because it matters across the full Victorian comp ecosystem even though it is not a national body
- the ranking should be justified from visible evidence, not gut feel alone

## Research Coverage Rules

Use these source priorities:

1. official website or association page
2. host social post or profile asset
3. ticketing page
4. sponsor-side repost or recap
5. third-party mention

Practical rules:

- social can create the lead, but official or ticketing confirmation is preferred when available
- if a sponsor only appears on a poster or recap image, capture it as evidence and mark confidence accordingly
- if a gym is discovered through social but has no clear event evidence yet, add it to `hosts.csv` or `host_review_queue.csv`, not `events.csv`
- if a state body links to a host or event series, treat that as a discovery accelerator for the next pass

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

Social-first prompts worth using with AI help:

- "Given these 10 Australian gym accounts, suggest likely adjacent gyms, state bodies, and comp hosts by state."
- "Turn these screenshots and captions into draft `events.csv` rows and flag anything uncertain."
- "Extract sponsor names from this recap/poster set, then suggest normalized entries for `sponsors_master.csv`."
- "Compare these host names and tell me which ones are likely operator-level versus venue-level duplicates."

## Prioritization

Start with hosts in this order:

1. national and state associations
2. major gym chains and multi-site operators
3. major independent gyms in Melbourne, Sydney, Brisbane, Adelaide, Perth
4. university clubs and local event brands
5. smaller regional gyms

Within each major city, use the influence model to decide review order.

That means a complete city census can exist first, while research depth still starts with the most important venues.

## Delivery Plan

### Phase 1. National host census

Goal:

- make `hosts.csv` close to complete for Australia

Definition of done:

- all states and territories represented
- all obvious operators and venues captured
- operator-level and venue-level rows separated cleanly
- minimum identity fields filled for each host

### Phase 2. Influence and market ranking

Goal:

- make the host universe useful for prioritization, not just coverage

Definition of done:

- meaningful gyms/operators have `market_tier`
- meaningful gyms/operators have `influence_score`
- ranking notes explain why the top hosts matter in each market

### Phase 3. Event backfill

Goal:

- work the highest-yield hosts for the last ~24 months

Definition of done:

- `events.csv` contains confirmed historical event coverage for priority hosts
- source quality and review status stay explicit

### Phase 4. Sponsor overlap build

Goal:

- extract repeated sponsor relationships from real event evidence

Definition of done:

- `event_sponsors.csv` contains real sponsor appearances
- `sponsors_master.csv` starts showing normalized repeated entities

### Phase 5. Ongoing refresh

Goal:

- keep the database current without rebuilding it from scratch

Definition of done:

- queue refreshed regularly
- new hosts added as discovered
- major operators and associations monitored through `psf_climb`

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

Execution bias for that pass:

- start from the association and operator accounts in `psf_climb`
- let AI draft candidate rows from captured evidence
- verify and commit host/event rows before going deep on sponsor normalization

That should rapidly improve both event coverage and sponsor overlap analysis.
