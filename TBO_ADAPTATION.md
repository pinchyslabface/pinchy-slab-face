# TBO / PBO Adaptation For PSF

## What This Is

PSF will use a local, adapted version of the tinyme-build-orchestrator idea as a home-project framework.

This is separate from any hosted TBO setup.

The working PSF name for the project-management layer is PBO, short for Pinchy Build Orchestrator.

PBO is the internal planning and coordination system for PSF, not a public product and not a Tinyme dependency.

## What We Keep

- structured project notes
- repeatable task planning
- clear handoffs
- lightweight execution checklists
- decision logs
- a shared view of milestones, initiatives, tasks, backlog items, and project status
- the ability to answer "what matters now?", "what is blocked?", and "what should happen next?"

## What We Change

- rename and rebrand everything for PSF
- keep the workspace local
- keep the project separate from any work account or hosted tooling
- shape the framework around this family project’s needs
- assume a two-person operating model unless the project explicitly changes shape
- keep the interface lightweight enough that it helps planning instead of becoming a second project

## PSF Framework Goals

The framework should help us:

- choose the MVP
- keep the list build organised
- track tech decisions
- capture ideas we are not building yet
- create repeatable weekly execution
- support multi-city growth from day one
- support launch-event execution like Ballina
- keep project management separate from implementation and content threads
- preserve a single visible queue of work so the next action is always obvious
- keep dependencies, blockers, and handoffs visible across lanes

## Core Planning Objects

The useful interface to borrow from TBO is the planning hierarchy:

- project
- milestone
- initiative
- task
- backlog item
- project status snapshot

For PSF, these should stay simple and readable. The point is to help us decide and sequence work, not to recreate a heavy PM system.

## Weekly Operating Rhythm

The default rhythm should be:

1. review the active queue
2. surface blockers and dependencies
3. choose the next highest-value work across lanes
4. record the decision in the relevant docs
5. close the week with a short handoff so the next chat can resume cleanly

This should work even if one person is away, because the docs carry the current state.

## Suggested Project Structure

- `README.md` for the front door
- `THREAD_HANDOFF.md` for the current shared state
- `MVP_SPEC.md` for the product definition
- `EMAIL_LIST_PLAN.md` for the audience strategy
- `TECH_ROUTE.md` for tool and stack direction
- `ROADMAP.md` for now / next / later
- `BACKLOG.md` for parked ideas
- `PBO_PLAN.md` for project management and orchestration
- `TBO_ADAPTATION.md` for framework rules and naming

## Practical Rule

Use TBO as the operating method.

Use PSF as the project identity.

Keep the two clearly separate.

If a TBO concept does not help PSF decide, prioritise, or hand off work more cleanly, leave it out.
