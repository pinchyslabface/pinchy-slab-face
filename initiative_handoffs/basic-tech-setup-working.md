# Initiative Handoff

## Initiative Ingest

Title:
- Get the basic tech setup working

Why it matters:
- PSF needs a simple working setup for signup, curation, review, and sending before launch work can happen cleanly.

Best lane for this work:
- Tech stack / workflow chat

What is already decided:
- PSF is a separate home project run by Josiah and Mike.
- The first big milestone is to get ready to launch and send the first newsletter.
- Beehiiv is the publishing layer.
- Beehiiv Scale is the expected launch plan.
- Postgres is the working source of truth for PSF operational data.
- The working approach should stay lean and avoid overbuilding.
- one Beehiiv publication with one branded sending domain is the current operating model
- city, country, and interest targeting should be handled through segmentation inside that publication
- Ballina is the first launch marketing moment.
- Melbourne is the most likely first newsletter market, unless another market clearly moves faster.

What is still open:
- the exact subscriber schema and field-mapping approach across Postgres and Beehiiv
- how Beehiiv segmentation, automations, and webhooks should integrate with the PSF operational model
- how segmented issue assembly should work once sends include global, country, and city-specific blocks
- which subscriber preferences belong in the first signup flow, the preference center, or later enrichment
- what should stay manual for launch versus what is worth integrating early

What to do first:
- Read the linked docs, then recommend the simplest launch-ready tech setup and workflow, including what should be set up now, what can wait, and what the first real operating sequence should be.

Good outcome:
- A fresh chat can clearly say what the basic setup is, what needs to be working before launch, what can stay manual, and which docs should be updated.

Keep in mind:
- Write for a non-technical reader where possible.
- Keep the answer practical and launch-focused.
- Do not turn this into a long-term architecture exercise.

## Parked Step-By-Step Tasks

These are real tasks that can be done later in a clear sequence.
They should stay noted so Josiah can pick them up without needing to reopen the strategy each time.

- lock the Beehiiv web domain and sending-domain choice
- wire the Beehiiv custom domain in DNS
- verify Beehiiv domain authentication and aligned sending records
- confirm DMARC alignment after Beehiiv setup is complete
- plan the first sends around Beehiiv smart warming
- document the final Beehiiv domain setup as a runbook
- confirm the live signup form configuration in Beehiiv
- document the actual referral setup steps inside Beehiiv Scale
- document the first welcome automation setup steps inside Beehiiv
- write the step-by-step webhook setup checklist once the integration design is settled
- map the first required Beehiiv custom fields once the schema is decided
- test one end-to-end signup from form to Beehiiv subscriber record to welcome email
- test one manual export or sync check between Beehiiv and Postgres after the schema is defined

## Clarify-First Initiatives

These items should not be treated as simple tasks yet.
They need a short strategy clarification first, then Josiah can help implement them step by step.

### 1. Subscriber Schema And Field Mapping

Needs clarification:

- which subscriber fields are system-of-record fields in Postgres
- which fields must also exist in Beehiiv
- which values should be tags versus custom fields versus segment definitions
- how preference-center data should be represented so it stays usable later

Implementation can follow once this is settled:

- create the Postgres schema
- create the Beehiiv field set
- document the mapping table
- run the first sync tests

### 2. Beehiiv Integration Pattern

Needs clarification:

- what event should create or update a subscriber in Beehiiv
- what event should flow back from Beehiiv into Postgres
- which parts of launch stay manual and which are automated first
- how send logs and segment changes should be recorded

Implementation can follow once this is settled:

- set up API access
- configure webhook endpoints or manual sync paths
- test subscriber create and update flows
- document the operating runbook

### 3. Segmented Content Assembly

Needs clarification:

- how one issue should combine universal, country, and city blocks
- whether the same issue is reused across segments or whether multiple issue variants are created
- which content differences are important enough to justify segment-specific blocks
- how far personalization should go before it becomes operationally heavy

Implementation can follow once this is settled:

- define the block structure
- write the drafting workflow
- test one real segmented send
- document the editorial checklist

### 4. Signup, Preference Center, And Enrichment Design

Needs clarification:

- what the first signup asks for
- what should be deferred to the welcome flow or preference center
- which data improves sending enough to justify asking for it early
- which optional fields can wait until later enrichment

Implementation can follow once this is settled:

- build the signup form
- build the follow-up preference flow
- add the matching Beehiiv fields
- test the user journey end to end

## Working Rule

- if a task is procedural and the strategy is already decided, park it as a step-by-step task
- if a task changes the data model, sending model, or editorial operating model, keep it as a clarify-first initiative until the design is settled
- once a clarify-first initiative is resolved, convert it into a short checklist Josiah can execute

Update these docs if decisions are made:
- [TECH_ROUTE.md](/Users/Mike/dev/Pinchy%20Slab%20Face/TECH_ROUTE.md)
- [STACK_DECISION.md](/Users/Mike/dev/Pinchy%20Slab%20Face/STACK_DECISION.md)
- [WORKFLOW.md](/Users/Mike/dev/Pinchy%20Slab%20Face/WORKFLOW.md)
- [MASTER_PLAN.md](/Users/Mike/dev/Pinchy%20Slab%20Face/MASTER_PLAN.md) if the project-wide decision changes

Repo docs:
- [MASTER_PLAN.md](/Users/Mike/dev/Pinchy%20Slab%20Face/MASTER_PLAN.md)
- [THREAD_HANDOFF.md](/Users/Mike/dev/Pinchy%20Slab%20Face/THREAD_HANDOFF.md)
- [PBO_PLAN.md](/Users/Mike/dev/Pinchy%20Slab%20Face/PBO_PLAN.md)
- [PBO_INITIAL_INGEST.md](/Users/Mike/dev/Pinchy%20Slab%20Face/PBO_INITIAL_INGEST.md)
- [TECH_ROUTE.md](/Users/Mike/dev/Pinchy%20Slab%20Face/TECH_ROUTE.md)
- [STACK_DECISION.md](/Users/Mike/dev/Pinchy%20Slab%20Face/STACK_DECISION.md)
- [MVP_SPEC.md](/Users/Mike/dev/Pinchy%20Slab%20Face/MVP_SPEC.md)
