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

### Still To Do

- reserve or confirm matching social handles where practical
- finish Beehiiv custom domain wiring when the newsletter is ready for it
- decide when to claim `pinchyslabface.com.au` through the PSF entity
- consider the shorter `pinchysf` assets later as a future brand reserve

## Domain Strategy

- keep the `.com` as the active public domain for now
- defer `pinchyslabface.com.au` until the PSF entity can legitimately hold it
- treat the shorter `pinchysf` idea as a future brand asset, not a current operating dependency

## Email Strategy

- use one primary Fastmail mailbox for ownership and recovery
- route public and functional addresses into that mailbox with aliases
- keep Gmail out of the operating mailbox path for PSF
- keep the mailbox setup simple enough that both people can understand and recover it quickly

## Handle Strategy

- reserve the obvious matching handles where possible
- keep the naming consistent with `pinchyslabface`
- avoid introducing alternate brand names unless they are deliberately part of the PSF identity

## Brand Protection Rule

- if a name, handle, or domain supports PSF's public identity, secure it early when practical
- if a region-specific domain is not yet eligible, hold the decision instead of forcing ownership through the wrong entity
- if a setup choice adds complexity without improving the two-person operating model, defer it

## Open Items

- social handle reservations still need to be completed or confirmed
- custom Beehiiv domain wiring still needs to be finished when the publication is ready
- additional country domains can be considered later if the project expands
