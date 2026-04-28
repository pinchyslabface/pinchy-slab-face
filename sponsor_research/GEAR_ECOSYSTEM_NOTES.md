# Gear Ecosystem Notes

## Why this matters

The sponsor database should not only track event sponsors. It should also map the commercial supply chain around Australian climbing:

- brands
- Australian distributors
- retailers
- gym pro shops
- shoe resolers
- drop-off partners

This matters because many of the best newsletter sponsors may not first appear as event sponsors. They may appear as:

- a retailer already selling to climbers
- a distributor supplying gyms and stores
- a shoe resoler with strong repeat-use relevance
- a brand doing demo tours and activation nights

## Files

- `gear_ecosystem_entities.csv`
- `gear_ecosystem_relationships.csv`
- `retailer_distributor_expansion.csv`

## Relationship types

Use these consistently:

- `distributes`
- `stocks`
- `authorised_resoler_for`
- `dropoff_partner_for`
- `refers_resole_to`
- `located_in`

## Best current high-leverage nodes

### Distributor nodes

- `Climbing Anchors`
- `ALS Trade`
- `Friction Addiction`

These can unlock multiple brands with a single contact path.

### Retail nodes

- `K2 Base Camp`
- `Wild Earth`
- `Mountain Equipment`

These help identify:

- active Australian climbing brands
- likely advertiser retailers
- pricing, catalog, and promotion norms

### Service nodes

- `Sticky Rubber Resoles`
- `Scotty Dog Resoles`
- `Rubber Styx`
- `Sticky Joe's Resoles`

These are strong because shoe repair is highly relevant to committed climbers and aligns naturally with editorial sponsorship, gear-care content, and community offers.

## Next recommended buildout

1. Add more gym pro shops and retailer stock lists.
2. Add more brand-to-distributor links where the AU route is explicit.
3. Add a `newsletter_fit_score` later for every entity.
4. Add a `contact_path_type` later such as `direct_brand`, `distributor`, `retailer`, or `service`.
