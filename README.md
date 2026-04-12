# Pinchy Slab Face

This repo is the working home for the Pinchy Slab Face climbing project.

The current shared understanding from the source notes is:

- Start with a climbing events email list and weekly newsletter
- Use the list as the core asset
- Add a lightweight directory or gym database after traction
- Keep the more ambitious product ideas in a backlog until the audience exists

## Start Here

1. Read [`MASTER_PLAN.md`](./MASTER_PLAN.md)
2. Read [`THREAD_HANDOFF.md`](./THREAD_HANDOFF.md)
3. Read [`PBO_PLAN.md`](./PBO_PLAN.md)
4. Read [`PBO_INITIAL_INGEST.md`](./PBO_INITIAL_INGEST.md)
5. Read [`PBO_DASHBOARD.md`](./PBO_DASHBOARD.md)
6. Read [`PBO_APP_SPEC.md`](./PBO_APP_SPEC.md)
7. Read [`PBO_SKILLS.md`](./PBO_SKILLS.md)
8. Read [`MVP_SPEC.md`](./MVP_SPEC.md)
9. Read [`EMAIL_LIST_PLAN.md`](./EMAIL_LIST_PLAN.md)
10. Read [`TECH_ROUTE.md`](./TECH_ROUTE.md)
11. Read [`TBO_ADAPTATION.md`](./TBO_ADAPTATION.md)
12. Read [`STACK_DECISION.md`](./STACK_DECISION.md)
13. Read [`LAUNCH_PLAN.md`](./LAUNCH_PLAN.md)
14. Read [`POSITIONING.md`](./POSITIONING.md)
15. Read [`PROJECT_BOUNDARIES.md`](./PROJECT_BOUNDARIES.md)
16. Read [`TBO_FOR_PSF.md`](./TBO_FOR_PSF.md)
17. Read [`PSF_CHAT_GUIDE.md`](./PSF_CHAT_GUIDE.md)
18. Read [`CHAT_PROMPTS.md`](./CHAT_PROMPTS.md)
19. Read [`PROJECT_INDEX.md`](./PROJECT_INDEX.md)
20. Read [`WORKFLOW.md`](./WORKFLOW.md)
21. Skim [`ROADMAP.md`](./ROADMAP.md)
22. Skim [`BACKLOG.md`](./BACKLOG.md)
23. Review [`DOMAIN_REGISTRATION.md`](./DOMAIN_REGISTRATION.md) for the domain and WHOIS record

## Source Material

The original planning notes are preserved as `.txt` files in [`source_notes/`](./source_notes):

- `source_notes/PSF_1.txt`
- `source_notes/PSF_2.txt`
- `source_notes/PSF_3.txt`
- `source_notes/PSF_4._B.txt`
- `source_notes/PSF_4_A.txt`
- `source_notes/PSF_5_A.txt`
- `source_notes/PSF_5_B.txt`
- `source_notes/PSF_6.txt`
- `source_notes/PSF_7.txt`

## Working Principle

List first.
Platform second.
Products later.
## PSF PBO App

The local planning app for PSF now launches from this repo in the same general style as the local TBO flow.

Use:

```bash
./run_pbo
```

That launcher:

- creates or reuses `venv-pbo`
- installs the light Python dependencies
- starts the local PBO server
- opens the browser to the local app URL

Stop it with:

```bash
./stop_pbo
```

The app reads the current repo docs directly and gives you these views:

- dashboard
- board
- backlog
- initiatives
- milestones
- project status
- WBS

The repo docs are still the source of truth. The app is the readable local surface on top.
