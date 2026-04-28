# Domain And Email Setup

## Purpose

This note captures the current PSF setup decisions for domains, handles, email, and brand protection.

PSF uses a local home-project setup and should stay separate from Tinyme.
The current operating assumption is a two-person team: Josiah and Mike.

## Current Decisions

- Primary domain: `pinchyslabface.com`
- Registrar: Cloudflare
- Mail provider: Fastmail
- Main mailbox: `founder@pinchyslabface.com`
- Aliases: `hello@`, `ops@`, `gyms@`, and `newsletter@`
- Newsletter platform: Beehiiv
- Beehiiv sender identity should use the PSF newsletter address, not the main login mailbox
- Beehiiv's default publication URL can be temporary until a PSF custom domain is ready
- Beehiiv should run as one main publication with one branded sending domain
- city, country, and interest targeting should be handled primarily through segmentation inside that publication
- PBO can track the work, but this note is the source of truth for account ownership and setup decisions

## Status

### Done

- `pinchyslabface.com` is registered
- Cloudflare is the registrar and DNS host
- Fastmail is connected and verified for the domain
- MX, SPF, DKIM, and DMARC records are in place
- `founder@pinchyslabface.com` is the main Fastmail mailbox
- `hello@`, `ops@`, `gyms@`, and `newsletter@` are set up as aliases into the main mailbox
- Beehiiv is created and in use for the publication setup
- Instagram public account is claimed as `pinchyslabface` using `founder@pinchyslabface.com`
- Instagram research account is claimed as `psf_climb` using `research@pinchyslabface.com`
- YouTube public channel is claimed as `@PinchySlabFace` using `pinchyslabface@gmail.com`
- Bluesky public account is claimed as `pinchyslabface.bsky.social`

### Still To Do

- reserve or confirm matching social handles where practical
- finish Beehiiv custom domain wiring when the newsletter is ready for it
- confirm the exact Beehiiv web domain and sending domain pattern we want, likely on a subdomain rather than the root
- document the final DNS records needed for Beehiiv domain verification and aligned sending
- verify DMARC alignment after Beehiiv domain setup is complete
- plan the first sends around Beehiiv smart warming on the branded domain
- decide when to claim `pinchyslabface.com.au` through the PSF entity
- consider the shorter `pinchysf` assets later as a future brand reserve

## Domain Strategy

- keep the `.com` as the active public domain for now
- defer `pinchyslabface.com.au` until the PSF entity can legitimately hold it
- treat the shorter `pinchysf` idea as a future brand asset, not a current operating dependency
- prefer a Beehiiv subdomain setup over pointing the root domain at Beehiiv unless a later website decision changes that
- treat the sending domain and the public Beehiiv web domain as intentional infrastructure choices, not defaults to accept casually

## Email Strategy

- use one primary Fastmail mailbox for ownership and recovery
- route public and functional addresses into that mailbox with aliases
- keep Gmail out of the operating mailbox path for PSF
- keep the mailbox setup simple enough that both people can understand and recover it quickly
- send newsletters from the PSF newsletter identity on the branded domain
- keep SPF, DKIM, and DMARC aligned as Beehiiv is wired in so deliverability stays clean
- treat DMARC monitoring as an explicit launch-readiness check

## Beehiiv Domain And Deliverability Notes

- the Beehiiv launch plan assumes one publication and one primary sending domain
- segmentation, not extra publications, is the default path for city and country targeting
- branded sending should be configured early enough that Beehiiv smart warming can happen before larger sends
- if the Beehiiv setup requires a tradeoff between root-domain neatness and operational reliability, choose the safer deliverability path
- early deliverability health matters more than perfect domain aesthetics

## Handle Strategy

- reserve the obvious matching handles where possible
- keep the naming consistent with `pinchyslabface`
- avoid introducing alternate brand names unless they are deliberately part of the PSF identity
- use `SOCIAL_HANDLE_PLAN.md` as the working registration tracker and fallback map
- keep research-only accounts separate from the public brand accounts so event discovery work does not depend on personal logins

## Brand Protection Rule

- if a name, handle, or domain supports PSF's public identity, secure it early when practical
- if a region-specific domain is not yet eligible, hold the decision instead of forcing ownership through the wrong entity
- if a setup choice adds complexity without improving the two-person operating model, defer it

## Open Items

- social handle reservations still need to be completed or confirmed
- the first handle registration batch should follow `SOCIAL_HANDLE_PLAN.md`, with `pinchyslabface` as the public default and `psfresearch` as the ideal research default, noting the current Instagram research handle is `psf_climb`
- custom Beehiiv domain wiring still needs to be finished when the publication is ready
- the exact Beehiiv subdomain and sending-domain choices need to be locked
- the final domain-authentication runbook for Beehiiv still needs to be written down
- additional country domains can be considered later if the project expands
