# Workflow

## Purpose

This file explains how PSF work should move from chat into the repo.

## Core Loop

1. Start a chat in the correct lane.
2. Discuss the question or problem.
3. Decide on the current direction or assumption.
4. Update the relevant PSF doc in this repo.
5. Update `MASTER_PLAN.md` if the decision affects the broader project.
6. Let the next chat read the updated docs before re-opening the same question.

For project management and orchestration decisions, treat `PBO_PLAN.md` as the first stop and use the first PBO ingest to seed the queue, initiatives, milestones, and handoff packet.
For initiative handoffs, use the copy/paste ingest packet described in `PBO_APP_SPEC.md` and `PBO_PLAN.md`.
Store reusable initiative handoff packets in `initiative_handoffs/`.
For tech implementation work, let the PBO queue show the current status and handoff, then update the tech docs before starting the next build step.
For launch-ready tech decisions, decide what is needed for the intake -> review -> send loop first, then defer everything else until after the first issue ships.

## What Gets Updated First

Usually update the narrowest relevant doc first.

Examples:

- content decisions -> `POSITIONING.md` or `MVP_SPEC.md`
- tech decisions -> `TECH_ROUTE.md` or `STACK_DECISION.md`
- launch decisions -> `LAUNCH_PLAN.md`
- boundary decisions -> `PROJECT_BOUNDARIES.md`
- orchestration decisions -> `PBO_PLAN.md`
- project-wide decisions -> `MASTER_PLAN.md`
- initiative handoffs -> `PBO_APP_SPEC.md` and `PBO_PLAN.md`
- reusable initiative handoff packets -> `initiative_handoffs/`
- active build sequencing -> `PBO_DASHBOARD.md` and `PBO_PLAN.md`
- first PBO population -> `PBO_PLAN.md`, `PBO_DASHBOARD.md`, `PBO_APP_SPEC.md`, and `THREAD_HANDOFF.md`
- launch-ready minimum decisions -> `TECH_ROUTE.md` and `STACK_DECISION.md`

## What Counts As A Decision

A decision can be:

- a final choice
- a working assumption
- a temporary default
- a rule of thumb the team is following for now

If it matters enough to act on, write it down.

## When To Update The Master Plan

Update `MASTER_PLAN.md` when the decision changes:

- the project’s purpose
- the internal business goal
- the public promise
- the content model
- the audience strategy
- the launch strategy
- the monetisation path
- the core operating rules

## When Not To Update The Master Plan

Do not update the master plan for every tiny implementation detail.

Keep those details in the lane-specific docs so the master plan stays readable.

## Good Practice

- keep docs short
- keep names consistent
- use PSF language, not Tinyme language
- assume the current working team is just Josiah and Mike unless a later doc says otherwise
- write handoff metadata in plain English so a non-technical reader can pick it up
- separate assumptions from confirmed decisions
- prefer one clear source of truth over multiple duplicated notes

## Two-Person Rule

For Mike and Josiah:

- use the repo docs as the shared project memory
- use chats as temporary working rooms
- start from the current PBO docs before doing new work
- write meaningful decisions back to the repo before moving on

If the repo is current, either person can pick the work up in a new chat.
