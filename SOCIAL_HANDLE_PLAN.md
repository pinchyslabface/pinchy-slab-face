# Social Handle Plan

## Purpose

This note turns PSF social handle work into a concrete registration plan.

It covers two separate needs:

- public brand handles for Pinchy Slab Face
- low-friction research handles that help with event discovery, market scanning, and competitor watching

The goal is not to launch every channel at once.
The goal is to secure identity, keep naming consistent, and give PSF a simple research setup that does not depend on personal accounts.

## Handle Strategy

### 1. Public Brand Handles

Use `pinchyslabface` as the default handle everywhere practical.

Rules:

- keep the public brand consistent with `pinchyslabface`
- avoid creating alternate public names unless the main handle is unavailable
- reserve `pinchysf` only as a defensive backup, not the main brand
- do not build channel-specific naming unless forced by platform availability

### 2. Research Handles

Use one simple research identity instead of many separate niche accounts.

Recommended default:

- handle: `psfresearch`
- display name: `PSF Research`

Current claimed exception:

- Instagram research handle: `psf_climb`

Rules:

- use research accounts to follow gyms, comps, organisers, setters, sponsors, and adjacent climbing brands
- keep research accounts operational, not heavily branded or public-facing
- use the same research handle across platforms where practical so recovery and handoff stay simple
- if a platform needs a fallback, prefer `psfevents`, then `psfmarketresearch`

## `psf_climb` Operating Model

Until a broader `psfresearch` identity is claimed elsewhere, treat `psf_climb` as the primary logged-in social research account.

Use it for:

- following Australian climbing gyms, state bodies, comps, event brands, and likely sponsors
- checking follower/following overlap to discover adjacent venues and organisers
- reviewing tagged posts, collabs, reels, highlights, and sponsor logos that search alone will miss
- saving candidate accounts and posts for later AI-assisted extraction into the research system

Do not use it as a public brand voice.

Default behavior:

- discover and monitor first
- only message from the account when there is a deliberate outreach reason
- keep bios, links, and recovery details clear enough that either Mike or Josiah can use it safely
- treat the account as an operating tool for discovery, not as a channel that needs content polish

## Platform Priority

### Tier 1: Claim First

These are the highest-value places to secure early.

- Instagram
- TikTok
- YouTube
- Facebook
- Threads

Why:

- these are the most likely sources of event discovery, gym updates, and audience-facing climbing content
- they matter both for future marketing and for research coverage

### Tier 2: Claim Soon

- X
- Bluesky
- Reddit

Why:

- lower immediate value for PSF launch than Instagram-led discovery
- still useful for brand protection, search footprint, and some market listening

### Tier 3: Optional Later

- Pinterest
- LinkedIn
- Snapchat

Why:

- not a first-order dependency for the newsletter or event research loop

## Account Ownership Rules

- use `founder@pinchyslabface.com` as the main recovery email unless a platform needs a dedicated inbox
- if dedicated inboxes are useful later, create alias-based routing rather than new standalone mailboxes first
- store username, linked email, recovery method, 2FA state, and owner notes in the same place after registration
- keep the working team assumption to Mike and Josiah

## Registration Tracker

Status meanings:

- `not checked`
- `checked`
- `claimed`
- `fallback needed`

### Public Brand Handles

| Platform | Preferred | Backup 1 | Backup 2 | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Instagram | `pinchyslabface` | `pinchysf` | `pinchy_slab_face` | claimed | Claimed with `founder@pinchyslabface.com` |
| TikTok | `pinchyslabface` | `pinchysf` | `pinchy_slab_face` | not checked | Useful for event clips and local scene monitoring |
| YouTube | `@pinchyslabface` | `@pinchysf` | `@pinchy_slab_face` | claimed | Claimed as `@PinchySlabFace` using `pinchyslabface@gmail.com`; profile enrichment deferred |
| Facebook | `pinchyslabface` | `pinchysf` | `pinchy.slab.face` | checked | Useful for gym/event pages and community groups |
| Threads | `@pinchyslabface` | `@pinchysf` | `@pinchy_slab_face` | not checked | Usually tied closely to Instagram identity |
| X | `pinchyslabface` | `pinchysf` | `pinchy_slab_face` | checked | Lower launch priority than Instagram |
| Bluesky | `pinchyslabface.bsky.social` | `pinchysf.bsky.social` | `pinchy-slab-face.bsky.social` | claimed | Claimed as `pinchyslabface.bsky.social`; profile enrichment deferred |
| Reddit | `u/pinchyslabface` | `u/pinchysf` | `u/pinchy_slab_face` | not checked | Optional early defensive claim |

### Research Handles

| Platform | Preferred | Backup 1 | Backup 2 | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Instagram | `psfresearch` | `psf_climb` | `psfevents` | claimed | Claimed as `psf_climb` with `research@pinchyslabface.com` |
| TikTok | `psfresearch` | `psfevents` | `psfmarketresearch` | not checked | Useful if event discovery spills into video-first channels |
| Facebook | `psfresearch` | `psfevents` | `psfmarketresearch` | not checked | Helpful for groups and event pages |
| X | `psfresearch` | `psfevents` | `psfmarketresearch` | not checked | Mostly defensive or low-volume listening |
| Bluesky | `psfresearch.bsky.social` | `psfevents.bsky.social` | `psfmarketresearch.bsky.social` | not checked | Optional early claim |

## Live Recon Notes

Checked on April 27, 2026.

- direct URL checks were partially limited by platform behavior and bot blocking, especially on X and Meta properties
- `https://bsky.app/profile/pinchyslabface.bsky.social` returned `404` during the check
- X, Instagram, Facebook, and YouTube direct URL checks were enough to confirm the route shape, but not enough to treat the handle as confirmed claimed or confirmed free

That means the tracker above should be treated as a working registration sheet, not a final availability report.

## First Registration Batch

Claim these first for the public brand:

1. Instagram `pinchyslabface`
2. TikTok `pinchyslabface`
3. YouTube `@pinchyslabface`
4. Facebook `pinchyslabface`
5. Threads `@pinchyslabface`

Then claim the first research batch:

1. Instagram `psfresearch`
2. Facebook `psfresearch`
3. TikTok `psfresearch`

Actual current state:

- Instagram public account claimed as `pinchyslabface`
- Instagram research account claimed as `psf_climb`
- YouTube public channel claimed as `@PinchySlabFace`
- Bluesky public account claimed as `pinchyslabface.bsky.social`

If the preferred public handle is unavailable anywhere:

1. try `pinchysf`
2. then try a readable separator version such as `pinchy_slab_face`
3. record the exception here so the rest of the brand system can stay aligned

## Definition Of Done

This handle task is done when:

- Tier 1 public brand handles are claimed or marked with an approved fallback
- the main research handle is claimed on the platforms that matter for event discovery
- recovery email and 2FA are documented
- `DOMAIN_AND_EMAIL_SETUP.md` reflects the current claimed state
