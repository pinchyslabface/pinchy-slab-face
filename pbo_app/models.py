from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any

from pbo_app.parser import Initiative, Milestone, QueueItem


@dataclass
class WeeklyCheckIn:
    top_priorities: list[str] = field(default_factory=list)
    blocked: list[str] = field(default_factory=list)
    waiting_on: list[str] = field(default_factory=list)
    decisions_made: list[str] = field(default_factory=list)
    handoff_notes: list[str] = field(default_factory=list)
    lane_actions: dict[str, str] = field(default_factory=dict)


@dataclass
class HandoffFile:
    file_name: str
    title: str
    lane: str
    packet: str


@dataclass
class PBOState:
    project_name: str
    weekly: WeeklyCheckIn
    queue: dict[str, list[QueueItem]]
    milestones: list[Milestone]
    delivery_order: list[str]
    initiatives: list[Initiative]
    supporting_initiative: Initiative | None
    review_checklist: dict[str, list[str]]
    likely_gaps: list[str]
    someday_maybe: list[str]
    suggested_next_chats: list[str]
    handoff_files: list[HandoffFile]
    source_files: list[str]
    generated_at: str
    errors: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)
