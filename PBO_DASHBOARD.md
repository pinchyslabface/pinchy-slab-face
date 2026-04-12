# PBO Dashboard

## Purpose

This is the PSF-local view for seeing the project at a glance.

It is not a product dashboard yet.

It is the reading order for the project management layer.
It should keep the same core tab structure as the TBO-style board so the project stays easy to scan.
For the concrete app shape, see `PBO_APP_SPEC.md`.

## What It Should Show

- what is active now
- what is next
- what is waiting
- what is blocked
- who owns each active lane
- what changed this week
- what handoff the next chat should inherit

## Core Tabs

Keep the familiar TBO-style tab set:

- Dashboard
- Board
- Backlog
- Initiatives
- Milestones
- Project Status
- WBS

If we later add more views, they should sit beside these rather than replacing them.

## Preferred Read Order

1. `MASTER_PLAN.md`
2. `THREAD_HANDOFF.md`
3. `PBO_PLAN.md`
4. this dashboard
5. `ROADMAP.md`

## Dashboard Sections

### 1. Project State

- overall status
- current focus
- top priorities
- key blockers
- current risks

### 2. Queue View

- now
- next
- later
- blocked
- waiting
- done

### 3. Lane View

- strategy
- tech
- content
- marketing
- sponsorships
- domains
- orchestration

### 4. Handoff View

- what was decided
- what is still unresolved
- who should look at it next
- what file should be updated next

### 5. Weekly Check-In

Use the standard template from `PBO_PLAN.md` so the dashboard and the handoff stay aligned.

## How To Use It

When starting a coordination chat:

1. open the master plan
2. open the handoff
3. open the PBO plan
4. scan this dashboard
5. decide what should move next

If the dashboard says one thing and the master plan says another, the master plan wins and the dashboard should be updated to match.

## Rule

The dashboard should help the team see the project, not become another place where decisions disappear.
