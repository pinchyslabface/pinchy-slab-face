# Project Boundaries

## Purpose

This repo is for the PSF project only.

The tinyme-build-orchestrator idea is being used as a local planning pattern for PSF, but PSF is its own separate home project and should not be mixed with Tinyme references, naming, or hosted setup assumptions.

## What This Means

- PSF docs should speak in PSF terms
- TBO should be treated as an internal framework, not a public dependency
- PBO is the internal planning and orchestration layer, not the owner of external accounts or credentials
- any future reference docs should assume a home-project setup
- avoid mixing Tinyme language into PSF planning unless the note is explicitly about the framework lineage
- assume the current PSF operating team is just Josiah and Mike unless a later decision says otherwise

## Chat Map

Use separate chats for separate jobs:

- strategy and master plan
- tech stack and workflow
- content model and editorial structure
- marketing and promotion
- sponsorships and giveaways
- domains and IP setup

## Reference Doc Rules

When creating or updating docs for PSF:

- keep the project identity as PSF
- note when something is a framework choice versus a project decision
- do not assume hosted TBO infrastructure
- do not assume Tinyme ownership or sharing
- write docs so they can be updated later by separate threads

## Suggested Wording

If a doc needs to mention the framework, use language like:

- “PSF uses a local adaptation of the TBO framework”
- “TBO is the operating method, PSF is the project identity”
- “this is a separate home-project setup”

## Practical Rule

If a future doc could be misread as belonging to Tinyme, add a one-line boundary note at the top.
