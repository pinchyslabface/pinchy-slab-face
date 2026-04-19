# Josiah Codex Prompt

Copy and paste the prompt below into Codex from the repo root.

```text
Please continue the sponsor research system in `sponsor_research/`.

Start by reading:
- `sponsor_research/JOSIAH_HANDOFF_SPONSOR_RESEARCH.md`
- `sponsor_research/COMP_RESEARCH_SYSTEM.md`
- `sponsor_research/COMP_DATA_DICTIONARY.md`

Then continue the work with this priority:
1. Expand `hosts.csv` so that multi-location operators have all locations represented where relevant.
2. Use `host_review_queue.csv` to work host-by-host and begin filling `events.csv` with confirmed competitions from the last ~24 months.
3. For the events you confirm, begin filling `event_sponsors.csv` with sponsor appearances and normalize recurring sponsors into `sponsors_master.csv`.

Important constraints:
- Work event-first, not sponsor-first.
- Keep operator-level and venue-level hosts distinct.
- Use the status/type values from `COMP_DATA_DICTIONARY.md`.
- If sponsor info only appears in social images or posters, capture it manually for now and note where a logo/OCR helper script would be useful.
- Keep the system compatible with a future all-gyms CRM by preserving `host_id` and `crm_entity_id`.

Good progress in this session means:
- stronger host coverage
- real event rows added
- first real sponsor overlap rows added

Before editing, inspect the existing CSVs so you extend the system cleanly rather than redesigning it.
```
