# PBO Initial Ingest

## Coverage

This first ingest is based on the current PSF master docs:

- `MASTER_PLAN.md`
- `THREAD_HANDOFF.md`
- `ROADMAP.md`
- `PBO_PLAN.md`
- `PBO_APP_SPEC.md`
- `PBO_SKILLS.md`
- `WORKFLOW.md`
- `CHAT_PROMPTS.md`
- the updated lane docs in this repo

## Current Snapshot

PSF is now being run as a separate home project with a local PBO layer.

The current working team is just Josiah and Mike.

The planning layer needs to be:

- plain English
- easy to skim
- useful to a non-technical reader
- strong enough to hand work off into a fresh Codex chat

The project is still centered on:

- a weekly climbing events newsletter
- a simple landing page and signup flow
- manual plus semi-manual curation
- city-first audience growth

## Project Snapshot

- purpose: become the most trusted indoor climbing scene inbox and community layer
- public promise: the easiest way to know what is on in indoor climbing
- working product: signup surface, subscriber list, weekly email, lightweight event collection system
- current stage: lock the operating layer and the first real launch sequence before deeper product work

## Weekly Check-In

### Top Priorities

- stabilize the PBO foundation so the project has a clean weekly rhythm
- complete Milestone 1: launch through first newsletter send
- keep the launch promo plan, signup flow, and first-send path explicit enough to execute

### Blocked

- no hard blockers right now

### Waiting On

- Melbourne is the current default first newsletter market, but another city can move ahead if launch signal and content readiness justify it
- social handle reservations and Beehiiv custom-domain wiring are still open in the domains lane, while `pinchyslabface.com.au` stays deferred until the PSF entity can legitimately hold it

### Lane Next Actions

- strategy: confirm the first launch sequence and what counts as "ready enough"
- tech: use the launch-ready minimum in `TECH_ROUTE.md` and wire the intake -> review -> send loop to the weekly workflow
- content: shape the first repeatable newsletter cadence without overcomplicating it
- marketing: use Ballina and QR signup as the first growth sequence, without treating Ballina as the default first newsletter market
- launch ops: get the signup flow, launch assets, and first-send path ready for real use
- sponsorships: keep early monetisation lightweight and behind audience growth
- domains: keep the completed domain and Fastmail setup documented, then finish social handle reservations, Beehiiv custom-domain wiring, and any later .au or reserve-domain decisions

### Decisions Made

- PBO is now the coordination layer for PSF
- the first PBO plan should be plain English and usable by a non-technical reader
- initiative handoffs should be copyable into a fresh Codex chat

### Handoff Notes

- the queue is now seeded and ready for refinement
- Milestone 1 is now the main delivery focus
- the next step is not to model more objects, but to use the milestone and initiative map to choose the next move

### Ingest Prompt

- start with the top initiative, not the whole project

## Active Queue

### Now

### 1. Test the planning system and handoff flow

- status: now
- owner: Mike
- why this matters: the project needs a clear way to see the whole picture, keep handoffs clean, and let Josiah pick up work without a dev translator
- next action: test one real initiative handoff from the PBO into a fresh Codex chat
- blockers: none
- dependencies: the master docs and lane docs need to stay current, and the handoff packet needs to stay simple

### 2. Get ready to launch and send the first newsletter

- status: now
- owner: Mike
- why this matters: the project needs one clear milestone that carries launch promo through first send
- next action: use Milestone 1 as the main frame for launch, signup, send, and review work
- blockers: none
- dependencies: the initiatives under Milestone 1 need to stay explicit and plain English

### 3. Get the basic tech setup working

- status: now
- owner: Mike
- why this matters: the stack and workflow need to support the newsletter, ingestion, and PBO handoffs without becoming heavy
- next action: implement the launch-ready minimum from `TECH_ROUTE.md`, including repo host, hosted Postgres, Beehiiv sender setup, and the intake to review to send loop
- blockers: none
- dependencies: the strategy docs, tech docs, and the launch sequence

### 4. Plan the first launch push and signup sequence

- status: now
- owner: Mike
- why this matters: the project needs a clear path from today into first signups, first issue, and first learnings
- next action: turn Ballina, the active-market assumption, and the list-growth mechanics into a simple sequence of work
- blockers: none
- dependencies: roadmap, launch, and strategy docs

### 5. Define the first newsletter and how we send it

- status: now
- owner: Mike
- why this matters: the project is not truly moving until the first real newsletter can be assembled and sent
- next action: define the first-send path from event collection to review to publish
- blockers: none
- dependencies: MVP spec, content cadence, and stack lock

### Next

### 6. Content cadence and newsletter shape

- status: next
- owner: Mike
- why this matters: the newsletter needs a repeatable shape that is useful to climbers and manageable for the team
- next action: keep the content model simple and tied to the weekly workflow
- blockers: none
- dependencies: the master plan, positioning docs, and launch direction

### 7. Promotion and signup mechanics

- status: next
- owner: Mike
- why this matters: the project needs a real-world path to list growth, not just a product concept
- next action: make the QR flow, comp mechanic, and launch messaging simple enough to execute
- blockers: none
- dependencies: launch plan, first-market sequence, and first-send path

### 8. Finish the basic setup needed for launch

- status: next
- owner: Mike
- why this matters: ownership, email, and branding decisions need to stay simple and recoverable
- next action: keep the completed IP setup recorded, then finish the remaining brand-protection items that improve launch trust and operational clarity
- blockers: none
- dependencies: the boundary docs and current setup decisions
- done so far:
  - `pinchyslabface.com` is registered and on Cloudflare
  - Fastmail is connected and verified for the domain
  - `founder@pinchyslabface.com` is the main mailbox
  - `hello@`, `ops@`, `gyms@`, and `newsletter@` are set up as aliases
  - Beehiiv is created for the publication
- still to do:
  - reserve or confirm matching social handles where practical
  - finish Beehiiv custom domain wiring when the newsletter is ready for it
  - decide when to claim `pinchyslabface.com.au` through the PSF entity
  - consider the shorter `pinchysf` assets later as a future brand reserve

### Later

### 9. Lightweight public archive

- status: later
- owner: Mike
- why this matters: it could improve public utility after the first list and workflow are working
- next action: keep it parked until the newsletter and event flow are proven
- blockers: it is deliberately deferred
- dependencies: traction and a working event store

### 10. Early monetisation tests

- status: later
- owner: Mike
- why this matters: sponsorship and featured placements are part of the long-term model, but not the first bottleneck
- next action: keep the tests lightweight and behind audience formation
- blockers: audience traction needs to exist first
- dependencies: launch, list growth, and repeatable sends

## Someday Maybe

These are worth keeping visible, but they are not part of the first launch path:

- live dashboard implementation
- full PBO backend
- advanced automation
- climbing directory
- city pass products
- 3D-printed accessories
- clothing and merch
- training boards and larger hardware
- deeper analytics

## Milestones

### Milestone 0. Project planning basics are in place

- what this means: the first queue, backlog, initiatives, milestones, handoff note, and ingest prompt are in place
- why it matters: the project needs a usable operating layer before launch work can stay organised

### Milestone 1. Get ready to launch and send the first newsletter

- what this means: the launch promo flow is ready, the signup path is live, the first issue is assembled and sent, and the team can review what happened next
- why it matters: this is the first real proof that PSF can move from planning into audience growth

## Milestone 1 Delivery Order

This is the simplest working sequence for the first real launch cycle:

1. lock the lean workflow and sender setup needed for launch
2. confirm the first market and the signup path
3. prepare the launch promo plan and on-the-ground signup mechanics
4. define the minimum issue shape and first-send review path
5. run the launch and collect signups
6. assemble and send the first issue
7. review results and decide what happens next

The plan should stay this simple unless a real dependency forces more detail.

## Initiatives

### Milestone 0 initiatives

#### Test the planning system and handoff flow

- best lane: project management / orchestration chat
- why this exists: the project needs a clear operating system before the rest of the work can move cleanly
- outcome: a readable, plain-English planning layer that helps the team decide what happens next and lets Josiah pick up initiative work safely
- done looks like: the queue is trusted, one real initiative handoff has been tested, and the weekly rhythm is usable
- first step: run one real initiative through the copy/paste handoff flow

### Milestone 1 initiatives

#### Get the basic tech setup working

- best lane: tech stack / workflow chat
- why this exists: the project needs a simple working setup for the newsletter before launch work can happen cleanly
- outcome: a simple working setup for signup, curation, review, and sending
- done looks like: the default setup is clear, working, and no longer being re-debated
- first step: confirm the Beehiiv plus Postgres plus manual review path as the working default
- depends on: setup and ownership polish
- unlocks: first market and signup flow, newsletter shape and first send path

#### Plan the first launch push

- best lane: marketing chat
- why this exists: the project needs a simple way to turn Ballina attention into real subscribers
- outcome: the QR flow, comp mechanic, sponsor support, and launch messaging are clear enough to run in the real world
- done looks like: the launch plan is clear enough to run without more back-and-forth
- first step: turn the Ballina plan into a short execution list with the QR, comp, and sponsor actions
- depends on: first market and signup flow
- unlocks: real-world launch execution and signup collection

#### Choose the first newsletter market and make signup clear

- best lane: strategy chat first, then marketing or tech if needed
- why this exists: the project needs a clear path from first interest into a usable subscriber list
- outcome: the likely first newsletter market, the multi-city signup logic, and the signup path are clear enough to use
- done looks like: Melbourne is treated as the default first send market unless another city clearly moves faster, and the signup fields and list entry path are settled enough to launch
- first step: turn the current market assumptions into a short launch sequence and signup flow check, with Ballina framed as the first marketing push rather than the default send market
- depends on: MVP workflow and stack lock
- unlocks: launch promo plan and first list capture

#### Define the first newsletter and how we send it

- best lane: content chat with tech input if needed
- why this exists: the project needs a real path from event collection into a sent issue
- outcome: the first newsletter can be put together, checked, and sent without confusion
- done looks like: the first issue structure, review step, and send path are obvious
- first step: define the minimum review and publish sequence for issue one
- depends on: MVP workflow and stack lock, first market and signup flow
- unlocks: first real send and launch review

#### Review the launch and choose the next move

- best lane: project management / orchestration chat
- why this exists: the first launch cycle should create learning, not just activity
- outcome: the team can review signup signal, launch response, and what the next city or sequence should be
- done looks like: the first launch cycle has been reviewed and the next move is clearer
- first step: define what the team will review after Ballina and after the first send
- depends on: launch promo plan, newsletter shape and first send path
- unlocks: the next milestone and the next queue reshuffle

### Supporting initiative

#### Finish the basic setup needed for launch

- best lane: domains / IP chat
- why this exists: sender trust and recoverability matter, but they should not become the main project
- outcome: domains, email, and brand setup that stays simple and recoverable
- done looks like: the minimum setup needed for launch is settled and clearly documented, including what is done already and what is intentionally still open
- first step: finish only the setup items that help sender trust and launch clarity
- depends on: none
- unlocks: MVP workflow and stack lock

## Milestone 1 Review Checklist

Use this to pressure-test whether the first plan is complete enough to execute.

Plain-English version:

- are we ready to launch?
- are we ready to collect signups?
- are we ready to send the first newsletter?
- are we ready to review what happened and choose the next move?

### Ready enough for launch

- do we know the first market we are actively treating as live?
- do we know the difference between the first marketing push and the first newsletter market?
- do we know exactly where a signup lands?
- do we know which sender identity people will see?
- do we know what has to be ready before Ballina?

### Ready enough for promo

- is the QR flow clear?
- is the giveaway or comp mechanic clear?
- is the on-site ask simple enough for someone else to help explain?
- do we know what launch materials still need to exist?

### Ready enough for first send

- do we know the minimum structure of issue one?
- do we know how events are gathered and checked?
- do we know who reviews before send?
- do we know what "good enough to send" means?

### Ready enough for review

- do we know what numbers or signals we will look at after launch?
- do we know what counts as a successful first cycle?
- do we know what decision gets made after the first send?

## Likely Gaps To Check Next

These are the most likely places where the first plan may still need more detail:

- the exact rule for when PSF would send Melbourne first versus move another city ahead
- the plain-English handoff packet for the first real Milestone 1 initiative is now started, but still needs real-world testing
- the line between "launch materials" and "must-have before first send"
- the review rule for deciding whether to repeat, refine, or widen the launch sequence

## Handoff Note

The first PBO ingest should be treated as the project’s operating reset.

The next chat should:

1. read the master docs
2. read the initial ingest
3. confirm the queue order
4. pressure-test whether Milestone 1 and its initiatives are the right shape
5. make sure the launch, promo, signup, and send initiatives are explicit enough to execute
6. use `initiative_handoffs/first-market-and-signup-flow.md` as the first real handoff packet and test it in a fresh chat

## Suggested Next Chats

If you want to leave the PM lane and pick work up in the right chat, use this order:

1. tech stack / workflow chat: `initiative_handoffs/basic-tech-setup-working.md`
2. strategy chat: `initiative_handoffs/first-market-and-signup-flow.md`
3. marketing chat: flesh out `Plan the first launch push`

This keeps the broad plan in the PBO while the deeper work happens in the correct lane.

## Ingest Prompt

```md
## Initiative Ingest

Title:
- PBO foundation and handoff test

Why it matters:
- The project needs a plain-English planning layer that Josiah can pick up without needing a dev translator.

What is already decided:
- PSF is a separate home project.
- The team is just Josiah and Mike.
- The PBO layer uses the familiar dashboard, board, backlog, initiatives, milestones, project status, and WBS views.
- The handoff packet should be copyable into a fresh Codex chat.

What is still open:
- Whether Milestone 1 and its initiative order are right.
- How much of the future app should stay docs-first versus live tooling later.

What to do first:
- Read `MASTER_PLAN.md`, `THREAD_HANDOFF.md`, `PBO_PLAN.md`, `PBO_APP_SPEC.md`, and `PBO_INITIAL_INGEST.md`, then confirm Milestone 1, make sure the launch promo and first send paths are explicit, and test one real handoff.

Repo docs:
- [MASTER_PLAN.md](/Users/Mike/dev/Pinchy%20Slab%20Face/MASTER_PLAN.md)
- [THREAD_HANDOFF.md](/Users/Mike/dev/Pinchy%20Slab%20Face/THREAD_HANDOFF.md)
- [PBO_PLAN.md](/Users/Mike/dev/Pinchy%20Slab%20Face/PBO_PLAN.md)
- [PBO_APP_SPEC.md](/Users/Mike/dev/Pinchy%20Slab%20Face/PBO_APP_SPEC.md)
- [PBO_INITIAL_INGEST.md](/Users/Mike/dev/Pinchy%20Slab%20Face/PBO_INITIAL_INGEST.md)
```

## Next Step

Use this ingest as the working source of truth for the first queue, then refine from real use instead of adding more planning layers.
