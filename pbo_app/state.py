from __future__ import annotations

from dataclasses import asdict
from datetime import datetime
from pathlib import Path

from pbo_app.models import HandoffFile, PBOState, WeeklyCheckIn
from pbo_app.parser import (
    parse_delivery_order,
    parse_handoff_files,
    parse_initiatives,
    parse_likely_gaps,
    parse_milestones,
    parse_queue,
    parse_review_checklist,
    parse_someday_maybe,
    parse_suggested_next_chats,
    parse_supporting_initiative,
    parse_weekly_check_in,
)


def build_state(root: Path) -> PBOState:
    ingest = root / "PBO_INITIAL_INGEST.md"
    handoff_dir = root / "initiative_handoffs"
    source_files = [
        str(root / "MASTER_PLAN.md"),
        str(root / "THREAD_HANDOFF.md"),
        str(root / "PBO_PLAN.md"),
        str(ingest),
    ] + [str(path) for path in sorted(handoff_dir.glob("*.md"))]

    errors: list[str] = []
    try:
        weekly_raw = parse_weekly_check_in(ingest)
        weekly = WeeklyCheckIn(
            top_priorities=list(weekly_raw.get("top_priorities", [])),
            blocked=list(weekly_raw.get("blocked", [])),
            waiting_on=list(weekly_raw.get("waiting_on", [])),
            decisions_made=list(weekly_raw.get("decisions_made", [])),
            handoff_notes=list(weekly_raw.get("handoff_notes", [])),
            lane_actions=dict(weekly_raw.get("lane_actions", {})),
        )
        handoff_files = [HandoffFile(**item) for item in parse_handoff_files(handoff_dir)]
        return PBOState(
            project_name="PSF PBO",
            weekly=weekly,
            queue=parse_queue(ingest),
            milestones=parse_milestones(ingest),
            delivery_order=parse_delivery_order(ingest),
            initiatives=parse_initiatives(ingest),
            supporting_initiative=parse_supporting_initiative(ingest),
            review_checklist=parse_review_checklist(ingest),
            likely_gaps=parse_likely_gaps(ingest),
            someday_maybe=parse_someday_maybe(ingest),
            suggested_next_chats=parse_suggested_next_chats(ingest),
            handoff_files=handoff_files,
            source_files=source_files,
            generated_at=datetime.now().isoformat(timespec="seconds"),
            errors=errors,
        )
    except Exception as exc:
        errors.append(f"{type(exc).__name__}: {exc}")
        return PBOState(
            project_name="PSF PBO",
            weekly=WeeklyCheckIn(),
            queue={},
            milestones=[],
            delivery_order=[],
            initiatives=[],
            supporting_initiative=None,
            review_checklist={},
            likely_gaps=[],
            someday_maybe=[],
            suggested_next_chats=[],
            handoff_files=[],
            source_files=source_files,
            generated_at=datetime.now().isoformat(timespec="seconds"),
            errors=errors,
        )
