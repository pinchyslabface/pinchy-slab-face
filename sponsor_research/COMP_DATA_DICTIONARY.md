# Competition Data Dictionary

Use these values consistently so the dataset stays clean as it grows.

## `hosts.csv`

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
