# Competition Data Dictionary

Use these values consistently so the dataset stays clean as it grows.

## `hosts.csv`

Recommended purpose:

- build a near-complete national gym and host universe
- separate operator-level entities from venue-level entities
- support influence ranking and queue generation for event and sponsor research

### `host_type`

- `association`
- `gym_operator`
- `venue_operator`
- `community_org`
- `media`
- `platform`
- `industry_partner`
- `university_club`
- `event_brand`

### `host_level`

- `association`
- `operator`
- `venue`
- `brand`
- `event_brand`

### `state_scope`

Use standard Australian state and territory labels, or `National`.

Examples:

- `National`
- `NSW`
- `VIC`
- `QLD`
- `WA`
- `SA`
- `ACT`
- `TAS`
- `NT`

### `status`

- `seeded`
- `verified`
- `needs_review`
- `parked`

### `priority_tier`

- `A`
  Must-review host for exhaustive coverage.
- `B`
  Important second-wave host.
- `C`
  Lower-yield host or discovery-only source.

### `comp_likelihood`

- `High`
- `Medium`
- `Low`

### `gym_crm_overlap`

- `Yes`
  This host should likely become a linked entity in the dedicated gym CRM.
- `No`
  Useful for event/sponsor discovery but not a gym CRM entity.

### New ranking fields to add

These should be added to `hosts.csv` after the current core identity fields so the same file can support both completeness and prioritization.

### `market_tier`

- `national`
  National body or operator with cross-state importance.
- `statewide`
  State-level body or host with importance across one full state or territory.
- `major_metro`
  Important metro host in Sydney, Melbourne, Brisbane, Perth, or Adelaide.
- `regional_anchor`
  A leading venue or operator in a smaller city or region.
- `local`
  Local venue or group with limited market reach.

### `influence_score`

Use a simple `1` to `5` scale.

- `5`
  Dominant or must-cover host in its market.
- `4`
  Strong scene influence and high research value.
- `3`
  Meaningful local presence or periodic event relevance.
- `2`
  Lower scene visibility but still valid coverage target.
- `1`
  Minimal visible influence; keep mainly for completeness.

### `footprint_signal`

- `5`
  Multi-state or very large operator / national body.
- `4`
  Multi-site metro operator or very large single venue.
- `3`
  Strong single-site venue or smaller operator.
- `2`
  Limited single-site venue.
- `1`
  Small or low-signal host.

### `social_reach_signal`

- `5`
  Very strong audience and visible engagement.
- `4`
  Strong local reach.
- `3`
  Credible steady presence.
- `2`
  Light or inconsistent presence.
- `1`
  Very weak public social signal.

### `event_activity_signal`

- `5`
  Frequent comp or event host.
- `4`
  Regular event host.
- `3`
  Occasional but meaningful event host.
- `2`
  Rare event activity.
- `1`
  No visible event activity yet.

### `scene_centrality_signal`

- `5`
  Regularly appears in association, sponsor, or community pathways.
- `4`
  Clearly central in its metro or state scene.
- `3`
  Some repeat visibility in the scene network.
- `2`
  Weak network signal.
- `1`
  Minimal visible network centrality.

### `influence_notes`

Short plain-English justification for why the host got its current ranking.

Example:

- `Likely top-tier Melbourne bouldering venue based on visible traffic, social engagement, and recurring comp activity.`

## `host_locations.csv`

Recommended purpose:

- store venue-level physical location data cleanly
- support operator rows that map to multiple real-world venues
- capture address quality separately from host discovery quality

### `host_location_id`

Stable row identifier for the location record.

### `host_id`

Foreign key back to `hosts.csv`.

### `location_name`

Human-readable venue label.

Examples:

- `Urban Climb Blackburn`
- `9 Degrees Alexandria`
- `Head Office`

### `address_line_1`

Primary street address line.

### `address_line_2`

Optional second address line such as unit or suite.

### `suburb`

### `city`

### `postcode`

### `state`

Use standard Australian state and territory labels.

### `country`

Default:

- `Australia`

### `lat`

Optional decimal latitude if captured from a trusted source.

### `lng`

Optional decimal longitude if captured from a trusted source.

### `is_primary_location`

- `Yes`
- `No`

### `source_url`

Best source used to confirm the location or address.

### `status`

- `verified`
- `needs_review`
- `parked`

### `notes`

Short note on address confidence, relocations, or operator-vs-venue nuance.

## `host_contacts.csv`

Recommended purpose:

- store public contact methods without forcing one contact per host
- distinguish venue-level contacts from operator-level contacts
- support outreach and verification work later

### `host_contact_id`

Stable row identifier for the contact record.

### `host_id`

Foreign key back to `hosts.csv`.

### `host_location_id`

Optional foreign key to `host_locations.csv` when the contact belongs to a specific venue.

### `contact_type`

- `general_email`
- `events_email`
- `partnerships_email`
- `phone`
- `mobile`
- `contact_form`

### `contact_label`

Plain-English label such as:

- `Front desk`
- `Events inbox`
- `General enquiries`

### `contact_value`

The actual email address, phone number, or form URL.

### `is_primary`

- `Yes`
- `No`

### `is_public`

- `Yes`
- `No`

### `source_url`

### `status`

- `verified`
- `needs_review`
- `parked`

### `notes`

## `host_people.csv`

Recommended purpose:

- capture owner, founder, manager, routesetter, and coach leads
- keep people discovery separate from venue identity
- support later outreach and sponsor/network mapping

### `host_person_id`

Stable row identifier for the person record.

### `host_id`

Foreign key back to `hosts.csv`.

### `person_name`

### `role`

Examples:

- `owner`
- `founder`
- `general_manager`
- `head_routesetter`
- `coach`

### `bio_or_context`

Short note on why the person matters.

### `instagram_handle`

### `linkedin_url`

### `profile_url`

Best public profile or bio page.

### `email`

Only when publicly listed and clearly associated with the role.

### `source_url`

### `status`

- `verified`
- `needs_review`
- `parked`

### `notes`

## `host_update_channels.csv`

Recommended purpose:

- define how to monitor a host for event and sponsor updates
- separate discovery channels from actual event records
- make recurring research work more systematic

### `update_channel_id`

Stable row identifier for the update-channel record.

### `host_id`

Foreign key back to `hosts.csv`.

### `channel_type`

- `instagram`
- `facebook`
- `website_events`
- `website_news`
- `humanitix`
- `eventbrite`
- `trybooking`
- `mailing_list`
- `community_platform`

### `channel_value`

Handle, page name, or short label for the channel.

### `url`

Direct URL if available.

### `purpose`

Examples:

- `event announcements`
- `results and recaps`
- `sponsor tags`
- `youth program calendar`

### `update_frequency_guess`

- `high`
- `medium`
- `low`

### `access_method`

Examples:

- `public web`
- `psf_climb login`
- `manual check`

### `priority`

- `A`
- `B`
- `C`

### `status`

- `verified`
- `needs_review`
- `parked`

### `notes`

## `events.csv`

### `event_type`

- `national_titles`
- `state_titles`
- `local_gym_comp`
- `bouldering_jam`
- `league_round`
- `youth_comp`
- `university_comp`
- `fundraiser_comp`
- `community_event`

### `event_level`

- `national`
- `state`
- `regional`
- `local`

### `primary_source_type`

- `official_page`
- `host_social`
- `ticketing_page`
- `results_page`
- `third_party_mention`

### `status_confidence`

- `confirmed`
- `probable`
- `partial`

### `review_status`

- `queued`
- `in_progress`
- `complete`
- `needs_followup`

## `host_review_queue.csv`

Recommended purpose:

- rank the next hosts to review for event and sponsor coverage
- keep the execution order separate from `hosts.csv`

### `why_now`

Plain-English reason this host is high priority right now.

### `expected_yield`

- `Very high`
- `High`
- `Medium`
- `Low`

### `research_focus`

Short note on what the next pass should look for.

Examples:

- `State titles and partner pages`
- `Venue comps and sponsor posters`
- `Operator-wide event archive`

### `status`

- `queued`
- `in_progress`
- `done`
- `parked`

## `event_sponsors.csv`

### `sponsor_role`

- `title_sponsor`
- `major_partner`
- `prize_partner`
- `supporting_partner`
- `venue_partner`
- `hospitality_partner`
- `community_partner`

### `brand_or_distributor`

- `brand`
- `distributor`
- `retailer`
- `service_provider`
- `community_org`
- `unknown`

### `confidence`

- `high`
- `medium`
- `low`

## `sponsors_master.csv`

### `company_type`

- `brand`
- `distributor`
- `retailer`
- `service_provider`
- `community_org`
- `gym_operator`
- `venue_operator`

### `sponsor_category`

- `climbing_gear`
- `outdoor_apparel`
- `gym_operator`
- `food_beverage`
- `service`
- `media`
- `community`
- `retail`
- `other`

### `outreach_status`

- `not_started`
- `researching_contact`
- `ready_to_contact`
- `contacted`
- `responded`
- `not_a_fit`
