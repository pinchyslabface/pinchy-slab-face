# PBO Plan

## Purpose

PBO means Pinchy Build Orchestrator.

It is the PSF-local operating layer for keeping work organised across multiple chats, implementation tasks, and weekly execution loops.

It is not a product for climbers.

It is not the public brand.

It is the project management system for PSF.

It is the tool and operating pattern that should help us see the whole project, understand dependencies, and decide what should happen next.

## Why It Exists

PSF now has enough moving parts that one chat cannot safely hold everything:

- strategy
- content
- tech stack
- ingestion workflow
- launch ops
- domains and accounts

The current team is just Josiah and Mike, so the system needs to stay lightweight, obvious, and easy to resume after time away.

PBO gives the project a lightweight way to:

- decide what lane a question belongs to
- keep decisions documented
- track what is being built next
- preserve handoffs between chats
- stop implementation threads from turning into strategy threads
- keep a ranked queue of work visible
- surface blockers and dependencies before they stall execution
- make the next action obvious without requiring the whole thread history

## Core Principles

- one lane per chat
- one source of truth per decision
- keep the repo as the memory layer
- prefer short decisions with clear next actions
- separate PSF identity from any framework naming
- optimize for decision-making, not documentation volume
- keep the planning layer useful even if only one person updates it
- write everything so a non-technical reader can follow it
- use plain words first, then add detail only when needed

## What PBO Should Track

- active workstreams
- current assumptions
- decision log
- implementation order
- dependencies between tasks
- open questions
- weekly operating rhythm
- owners for the current work items
- blockers and waiting-on items
- the next action for each active lane
- handoff status for anything that is paused
- the top priority for the week
- any task that must be unblocked before other work can move
- short plain-English summaries for anything that Josiah should be able to pick up later
- initiative-level ingest notes that let a fresh Codex chat continue the work quickly
- domains, handles, email addresses, and brand-protection decisions should be tracked in `DOMAIN_AND_EMAIL_SETUP.md` rather than duplicated in the queue

## Initial PBO Population

When we do the first proper PBO ingest, seed these objects in this order:

1. project snapshot
2. active queue
3. backlog items
4. initiatives
5. milestones
6. handoff note
7. ingest prompt

The goal is not to model everything at once. The goal is to give the orchestration chat enough structure to decide what happens next without re-reading the whole project.

## What PBO Should Not Become

- a second product
- a heavy PM system
- a Tinyme-branded framework
- a reason to over-document simple choices
- a duplicate source of truth for content, strategy, or implementation details

## Suggested Interface

The useful behavior we want from the PSF planning layer is:

- show the current project map
- rank what should be tackled next
- explain why that order makes sense
- keep dependencies visible
- preserve handoffs between chats
- highlight blocked work before it goes stale
- let us move from a broad project view to the next concrete action quickly

If a future tool is built around PBO, this is the interface it should support.
For the current repo, the readable version of that interface lives in `PBO_DASHBOARD.md`.
The app-shaped version lives in `PBO_APP_SPEC.md`.

## Preferred Views

Keep the same core view family the current TBO shape uses:

- dashboard
- board
- backlog
- initiatives
- milestones
- project status
- WBS

These views are useful because they separate:

- the overall project read
- the working queue
- the parked ideas
- the active streams
- the delivery checkpoints
- the current health snapshot
- the structured work breakdown

If PSF ever adds a new view, it should solve a clear coordination problem rather than duplicate one of these.

## Working Queue

The queue should be the day-to-day visible list of what PSF is actively considering.

Each item should carry enough information to answer four questions quickly:

- what is it?
- who owns it?
- what is blocking it?
- what should happen next?

### Suggested Queue Fields

- `title`
- `lane`
- `owner`
- `status`
- `priority`
- `next_action`
- `blockers`
- `dependencies`
- `handoff_note`
- `last_updated`

### Suggested Statuses

- `now`
- `next`
- `later`
- `blocked`
- `waiting`
- `done`

### Queue Rules

- every active item should have one clear owner
- if more than one person is involved, one person still needs to be the driver
- blocked items should say what they are waiting on
- every lane should have a visible next action, even if the action is just to wait for another dependency
- if an item no longer changes the next decision, move it out of the active queue
- keep the queue short enough that it can actually be read in one sitting

## Lane Ownership Rules

The team is just Josiah and Mike, so lane ownership should stay simple.

- one person can own more than one item
- ownership is about who is currently driving the work, not who has historical responsibility
- if a lane needs input from the other person, note that as a dependency or blocker
- a lane can be paused, but it should still leave a handoff note behind
- if a decision affects multiple lanes, the orchestration chat should resolve the ordering and update the queue

## Suggested PSF Lanes

- master strategy
- tech stack and workflow
- content and editorial structure
- marketing and launch
- sponsorships and monetisation
- domains and account setup
- project management and orchestration

## Suggested Project Management Chat

Use this chat for:

- deciding what gets worked on next
- sequencing tasks across other chats
- keeping the master checklist current
- managing dependencies and handoffs
- maintaining the project execution rhythm
- updating the working queue when priorities change
- keeping the weekly focus explicit
- refreshing the handoff note when a lane is paused or completed
- making sure the team can see the project at a glance

Update:

- `ROADMAP.md`
- `THREAD_HANDOFF.md`
- `WORKFLOW.md`
- `PROJECT_INDEX.md`
- `PBO_DASHBOARD.md`
- `PBO_SKILLS.md`
- `PBO_INITIAL_INGEST.md`

## Weekly Rhythm

Use a simple weekly loop:

1. review the full queue
2. pick the top priorities
3. note what is blocked and what is waiting
4. assign the next action for each active lane
5. close the week with a handoff summary

The goal is not ceremony. The goal is that the next session can start by reading the docs and immediately know what matters.

### Weekly Check-In Template

Use this format when updating the queue or handing the project off between chats:

```md
## Weekly Check-In

### Top Priorities
- ...

### Blocked
- ...

### Waiting On
- ...

### Lane Next Actions
- strategy: ...
- tech: ...
- content: ...
- marketing: ...
- sponsorships: ...
- domains: ...

### Decisions Made
- ...

### Handoff Notes
- ...

### Ingest Prompt
- ...
```

This keeps the next thread focused on the actual movement of work rather than re-stating the entire project.

## Initiative Ingest Rule

Use an initiative-level ingest prompt when the work is big enough that the next chat should not start cold.

The ingest prompt should be plain-English and should fit on one screen if possible.

It should tell the next chat:

- what the initiative is
- why it exists
- what has already been decided
- what is still open
- what to look at first

Do not make this overly technical. Josiah should be able to understand it without translation.
Prefer a copy button plus a visible packet over hidden metadata.

Store real initiative packets in `initiative_handoffs/` so either Mike or Josiah can reuse them later without digging through old chats.

### Suggested Copy/Paste Format

Use this structure when handing off an initiative:

```md
## Initiative Ingest

Title:
- ...

Why it matters:
- ...

What is already decided:
- ...

What is still open:
- ...

What to do first:
- ...

Repo docs:
- [MASTER_PLAN.md](/Users/Mike/dev/Pinchy%20Slab%20Face/MASTER_PLAN.md)
- [THREAD_HANDOFF.md](/Users/Mike/dev/Pinchy%20Slab%20Face/THREAD_HANDOFF.md)
- [PBO_PLAN.md](/Users/Mike/dev/Pinchy%20Slab%20Face/PBO_PLAN.md)
- [PBO_APP_SPEC.md](/Users/Mike/dev/Pinchy%20Slab%20Face/PBO_APP_SPEC.md)
- [PBO_INITIAL_INGEST.md](/Users/Mike/dev/Pinchy%20Slab%20Face/PBO_INITIAL_INGEST.md)
```

If the next chat is starting from a milestone instead of an initiative, reuse the same structure and make the scope broader.

## Chat Pickup Rule

When a fresh Codex chat is going to continue an initiative:

1. paste the ingest packet
2. link the repo docs
3. ask the chat to read those docs first
4. then continue the discussion from the open questions

That is the handoff workflow.

## Two-Person Workflow

This is how Mike and Josiah should use PBO together when chats are not shared:

1. treat the repo docs as the shared memory
2. treat each chat as a temporary work room
3. before starting, read the current PBO docs
4. while working, keep the chat focused on one lane or one initiative
5. when a real decision is made, write it back to the repo
6. when handing work off, update the handoff note or ingest packet
7. let the next person start from the repo, not from the old chat

The important rule is:

- chats are temporary
- repo docs are durable

## When To Use Which Skill

### Use `psf-pbo`

Use this skill when you want to:

- review the current plan
- decide what should happen next
- reorder the queue
- check blockers and dependencies
- update the weekly check-in

### Use `psf-pbo-promoter`

Use this skill when you want to:

- turn a chat into a backlog item, task, initiative, or milestone
- turn a discussion into a handoff note
- create or refresh an initiative ingest packet
- decide where a new idea fits in the plan

### Use `psf-pbo-launch-deck`

Use this only when you want a deck or presentation summary from the plan.

It is not part of the normal day-to-day flow.

## Do We Need A Trigger Phrase?

Not necessarily.

If the chat prompt is clear about the job, Codex can use the right skill naturally.

But for reliability, it is helpful to use a short explicit phrase such as:

- "Use the PBO promoter to parse this into the plan"
- "Use the PBO skill to review the queue"
- "Promote this chat into an initiative and handoff packet"

That is enough. You do not need a special technical command.

## Suggested Trigger Phrases

These are good plain-English prompts to use inside a chat when you want the PBO flow to kick in.

### For reviewing the current plan

- "Use the PBO skill to review what should happen next."
- "Review the current queue, blockers, and priorities through the PBO."
- "Check the PBO and tell me what should move next."

### For turning a discussion into planning objects

- "Use the PBO promoter to parse this into the plan."
- "Turn this discussion into a backlog item, task, initiative, or milestone."
- "Promote this chat into the right PBO object and explain why."

### For creating a handoff

- "Turn this into an initiative handoff packet."
- "Create the ingest packet for a fresh Codex chat."
- "Write this up so Josiah can pick it up in a new chat."

### For updating the weekly rhythm

- "Use the PBO skill to update the weekly check-in."
- "Refresh the queue and handoff note from this discussion."
- "Update the current priorities and blockers in the PBO."

These do not need to be exact. The main thing is to be clear about whether you want:

- review
- promotion into the plan
- handoff creation
- queue refresh

## Recommended Working Pattern

For most real work, use this order:

1. start with the relevant lane chat
2. discuss the work
3. when it becomes real, use `psf-pbo-promoter` to place it in the plan
4. update the repo docs
5. come back to the orchestration chat when the queue or milestone order needs to change

That keeps the plan stable without making every chat into a PBO session.

## Practical Rule

If a decision affects who should do what next, it probably belongs in the PBO lane.
