# Stack Decision

## Question

What should be the base layer for PSF: Wix, beehiiv, or a build-your-own stack?

## Recommendation

Use GitHub Free for the private repo, Neon Free for hosted Postgres, and beehiiv as the base layer for audience and publishing.
Use PBO as the coordination layer so the work can move through a readable queue instead of living only in chat history.

## Why beehiiv is the current front-runner

Beehiiv is built around the thing we care about most right now:

- newsletters
- audience growth
- subscriber segmentation
- a simple website and signup surface
- monetisation later

Current official beehiiv pages show:

- free entry tier
- website builder
- newsletter builder
- referral programs
- analytics
- ad network and paid subscriptions on higher tiers
- multiple publications on Max

That lines up well with a list-first project that wants to scale into multi-city editions later.

Beehiiv should handle:

- signup forms
- basic landing pages
- subscriber tags and custom fields
- newsletter sending
- referral and growth features when needed

Beehiiv should not be the long-term source of truth for source ingestion, event deduplication, or QC workflows.

PBO should not be the data store either; it should sit above the data and help decide what the team does next.

## Beehiiv Capability Notes

Beehiiv’s current developer docs show enough surface area to support the project’s subscriber and workflow needs, but not every feature is available on every plan.

Useful capabilities for PSF:

- API access for publications and subscriptions
- read and update subscriber data
- tags and custom fields on subscriptions
- segment lookups
- webhooks for real-time events
- rate-limited API requests with queue-friendly usage

Important plan constraints:

- Beehiiv Launch includes API access, subscriber tagging, custom fields, segmentation, custom domains, and unlimited sending
- API key creation requires account verification
- webhooks are available on paid Scale and above
- the Send API is Enterprise-only

Practical implication:

- do not make Beehiiv webhook automation a launch blocker
- use Beehiiv signup forms and API-supported subscriber sync if it helps, but manual or CSV-based updates are still fine for the first send
- add webhook or Send API tasks only if the chosen Beehiiv plan supports the workflow we actually want

## When Wix makes sense

Wix is attractive if the project becomes more site-led than newsletter-led.

Current official Wix pages show:

- website building
- custom domains and hosting
- forms and subscribe forms
- email marketing campaigns
- mobile app support for campaigns

That makes Wix useful if we want a more traditional website with pages, forms, and light email marketing.

The tradeoff is that Wix looks more like a general website platform than a newsletter operating system.

## When BYO makes sense

A build-your-own stack makes sense only if we want maximum control and are willing to pay for it in time.

That route is strongest when:

- we know exactly what the workflow should be
- we need custom scraping and data shaping
- we want a tailored multi-city product architecture

The tradeoff is obvious:

- more engineering
- slower launch
- more maintenance

## Practical Recommendation

For this project, use:

- beehiiv for the audience and newsletter layer
- Postgres for event tracking, subscriber profile data, and operational workflows
- a small internal admin app or hosted admin surface for review and correction
- ingestion helpers as separate tools for social, email, web, and direct submissions
- a thin custom layer only when a real gap appears
- PBO docs and dashboard views for queueing, dependencies, blockers, and handoffs

## Launch-Ready Default

For the first launch cycle, keep the setup deliberately small:

- Beehiiv handles signup and sending
- Postgres stores the working data
- the review surface can be minimal as long as it supports correction and approval
- manual entry and email intake are the first reliable ingestion paths
- Instagram, web, and WhatsApp helpers can be added once the basic loop is stable

If a tool does not help us complete the intake -> review -> send loop before first send, it can wait.

## Decision Rule

Choose the option that gets us to a useful list, useful email, and useful growth loop fastest.
