# PBO App Spec

## Purpose

This is the PSF-local scaffold for the dashboard and planning app shape.

It is the concrete UI structure that mirrors the TBO-style view family while staying in PSF terms.

## App Principle

One project, one readable coordination surface.

The app should help the team answer:

- what is happening now?
- what is blocked?
- what should happen next?
- who owns it?
- what did we decide?

## Plain Language Rule

The app should be understandable to a non-technical reader.

That means:

- use simple words first
- explain acronyms the first time they appear
- prefer "what it is" and "why it matters" over internal labels
- keep notes short enough that Josiah can scan them without help
- avoid technical field names unless they are truly needed

## Human-Friendly Metadata

Every record should be readable as a quick summary:

- what is this?
- why are we doing it?
- what happens next?
- who is responsible?
- what is blocking it?

## Core Tabs

Keep these tabs as the baseline app shell:

- Dashboard
- Board
- Backlog
- Initiatives
- Milestones
- Project Status
- WBS

## Shared App Shell

Every tab should share:

- the project title
- the current weekly focus
- the current handoff state
- a quick path back to the dashboard
- a simple "Pick Up Initiative" action where relevant

## Tab Specs

### Dashboard

Purpose:

- give the quickest project read

Shows:

- overall status
- top priorities
- key blockers
- waiting-on items
- current handoff note
- recent decisions

### Board

Purpose:

- show the active queue by status

Shows:

- now
- next
- later
- blocked
- waiting
- done

### Backlog

Purpose:

- hold parked ideas and uncooked work

Shows:

- idea title
- source
- rough note
- suggested lane
- suggested next step

### Initiatives

Purpose:

- show the active streams of work

Shows:

- initiative title
- owner
- status
- health
- progress
- linked tasks
- linked milestones

### Milestones

Purpose:

- show delivery checkpoints and target dates

Shows:

- milestone title
- owner
- target date
- health
- progress
- linked initiatives

### Project Status

Purpose:

- capture the current project snapshot

Shows:

- overall health
- overall progress
- current focus
- top risks
- key blockers
- staffing note

### WBS

Purpose:

- show the ordered work breakdown

Shows:

- ranked tasks
- ownership
- dependencies
- blockers
- progress
- due dates

## Data Objects

The app should revolve around these shared PSF objects:

- project
- queue item
- backlog item
- initiative
- milestone
- task
- project status snapshot
- handoff note
- ingest prompt

## Initial Population Order

For the first proper PBO ingest, create the visible objects in this order:

1. project snapshot
2. queue item list
3. backlog list
4. initiatives list
5. milestones list
6. handoff note
7. ingest prompt

This keeps the first population pass focused on coordination, not completeness.

## TIM Classification Rule

The promotion path should choose among:

- backlog item
- task
- initiative
- milestone

Use the smallest object that can still hold the decision cleanly. If it needs multiple related tasks, it is probably an initiative. If it is a checkpoint across several streams, it is probably a milestone.

## Initiative Ingest

When an initiative is ready, the app should be able to hand off a short ingest prompt that lets someone open a fresh Codex chat and continue the work without rereading the whole project.

That ingest prompt should include:

- the initiative title
- a plain-English summary
- why it matters
- what is already decided
- what is still open
- the next question to answer
- any relevant repo docs

Use this at the initiative level by default. Use it at milestone level only when the checkpoint is broad enough to need a bigger handoff.

### Pick Up Initiative UX

- show a short explanation of what the button does
- let the user copy the ingest packet in one click
- make the packet readable before it is pasted
- include links back to the repo docs
- keep the copy plain English so Josiah can understand it

## Handoff Packet

The handoff between chats should use a simple copy/paste packet like this:

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

The packet should be plain English and short enough to paste straight into a fresh Codex chat.

The app should also surface the same packet from the dashboard and initiative pages so handoff is never buried.

## Decision Rule

If a field does not help the team choose, sequence, or hand off work, it should not be prominent in the app.

## Relationship To The Repo

The docs in this repo remain the source of truth.

This spec defines the shape of the future app, not the implementation.
The current scaffold lives under `psf-dashboard/`.
