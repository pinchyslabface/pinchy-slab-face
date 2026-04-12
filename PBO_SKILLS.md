# PBO Skills

## Purpose

This file maps the useful TBO skill behavior into PSF-local planning behavior.

It is the bridge between the repo docs and any future actual tooling.

## What We Keep From TBO

- turn discussion into structured work
- keep ownership visible
- preserve handoff context
- rank what matters next
- keep the project readable at a glance

## PSF Skill Map

### 1. `psf-pbo`

This is the core orchestration skill for PSF.

Use it when the goal is to:

- read the current project posture
- decide what should happen next
- update the queue or weekly check-in
- preserve blockers, dependencies, and handoffs
- turn a chat decision into a durable PSF coordination note

Behavior:

- start from `MASTER_PLAN.md`
- check `THREAD_HANDOFF.md`
- check `PBO_PLAN.md`
- update the relevant docs in the repo
- keep the result short and actionable

### 2. `psf-pbo-promoter`

This is the promotion skill for turning a discussion into a queue item, handoff note, or lane decision.

Use it when a chat has enough substance that the next thread should not have to reconstruct it from memory.

Behavior:

- parse the chat into a proposed object shape
- decide whether it is best represented as backlog, task, initiative, or milestone
- decide whether the item belongs in now, next, later, blocked, or waiting
- identify the correct lane
- identify the driver
- capture the next action
- attach a handoff note if there is meaningful context
- write the summary in plain English so a non-technical reader can follow it
- create an initiative ingest prompt when the work is large enough to need a fresh Codex chat
- include the copy/paste ingest packet when the work is being handed to a fresh chat
- favor a visible copy button and readable packet over hidden or technical handoff details

Preferred outcomes:

- TIM decision
- queue update
- lane decision
- handoff summary
- weekly check-in update
- initiative ingest prompt

### 3. `psf-pbo-launch-deck`

This is a future-facing presentation helper for PSF coordination.

Use it only if we later want a polished slide-style summary of the project state.

For now, it stays a reference idea rather than an active workflow.

## Installed Skill Paths

These are the runnable local skill folders currently in the Codex skills area:

- `psf-pbo`
- `psf-pbo-promoter`
- `psf-pbo-launch-deck`

## Skill Design Rules

- keep skill behavior local to PSF
- do not inherit Tinyme naming unless the doc is explicitly about lineage
- keep the orchestration skill more about clarity than volume
- prefer short outputs that point back to the source docs
- keep the two-person operating model visible in the behavior
- prefer language Josiah can understand without explanation
- when the output is for handoff, make it usable as a fresh-chat starter

## Practical Rule

If a skill would create a second source of truth, it is the wrong skill.

If a skill helps the next chat start with the project already understood, it is the right skill.

## Triggering In Practice

You do not need a special command word.

The easiest reliable prompts are simple plain-English requests like:

- "Use the PBO promoter to parse this into the plan."
- "Use the PBO skill to review what should happen next."
- "Turn this discussion into an initiative and handoff packet."

That is enough to steer the right behavior.
