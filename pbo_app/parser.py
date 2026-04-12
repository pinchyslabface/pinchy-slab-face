from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


@dataclass
class QueueItem:
    title: str
    status: str
    owner: str
    why: str
    next_action: str
    blockers: str
    dependencies: str


@dataclass
class Initiative:
    title: str
    lane: str
    why: str
    outcome: str
    done: str
    first_step: str
    depends_on: str
    unlocks: str


@dataclass
class Milestone:
    title: str
    meaning: str
    why: str


def _read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _lines(path: Path) -> list[str]:
    return _read(path).splitlines()


def extract_bullets(lines: Iterable[str], heading: str) -> list[str]:
    items: list[str] = []
    start = False
    for line in lines:
        if line.strip() == heading:
            start = True
            continue
        if start and line.startswith("## "):
            break
        if start and line.startswith("### "):
            break
        if start and line.startswith("- "):
            items.append(line[2:].strip())
    return items


def parse_weekly_check_in(path: Path) -> dict[str, list[str] | dict[str, str]]:
    lines = _lines(path)
    sections = {
        "### Top Priorities": "top_priorities",
        "### Blocked": "blocked",
        "### Waiting On": "waiting_on",
        "### Decisions Made": "decisions_made",
        "### Handoff Notes": "handoff_notes",
    }
    result: dict[str, list[str] | dict[str, str]] = {}
    for heading, key in sections.items():
        result[key] = extract_bullets(lines, heading)

    lane_actions: dict[str, str] = {}
    start = False
    for line in lines:
        if line.strip() == "### Lane Next Actions":
            start = True
            continue
        if start and line.startswith("### "):
            break
        if start and line.startswith("- ") and ":" in line:
            lane, action = line[2:].split(":", 1)
            lane_actions[lane.strip()] = action.strip()
    result["lane_actions"] = lane_actions
    return result


def parse_queue(path: Path) -> dict[str, list[QueueItem]]:
    text = _read(path)
    match = re.search(r"## Active Queue\n(.*?)(?:\n## Someday Maybe)", text, re.S)
    if not match:
        return {}
    body = match.group(1)
    status_blocks = re.split(r"\n### (Now|Next|Later|Blocked|Waiting|Done)\n", body)
    queue: dict[str, list[QueueItem]] = {}
    for i in range(1, len(status_blocks), 2):
        status_name = status_blocks[i].lower()
        block = status_blocks[i + 1]
        items: list[QueueItem] = []
        parts = re.split(r"\n### \d+\. ", block)
        for part in parts:
            part = part.strip()
            if not part:
                continue
            lines = part.splitlines()
            title = lines[0].strip()
            fields: dict[str, str] = {}
            for line in lines[1:]:
                if line.startswith("- ") and ":" in line:
                    key, value = line[2:].split(":", 1)
                    fields[key.strip()] = value.strip()
            items.append(
                QueueItem(
                    title=title,
                    status=fields.get("status", status_name),
                    owner=fields.get("owner", ""),
                    why=fields.get("why this matters", ""),
                    next_action=fields.get("next action", ""),
                    blockers=fields.get("blockers", ""),
                    dependencies=fields.get("dependencies", ""),
                )
            )
        queue[status_name] = items
    return queue


def parse_someday_maybe(path: Path) -> list[str]:
    text = _read(path)
    match = re.search(r"## Someday Maybe\n(.*?)(?:\n## Milestones)", text, re.S)
    if not match:
        return []
    return [line[2:].strip() for line in match.group(1).splitlines() if line.startswith("- ")]


def parse_milestones(path: Path) -> list[Milestone]:
    text = _read(path)
    match = re.search(r"## Milestones\n(.*?)(?:\n## Milestone 1 Delivery Order)", text, re.S)
    if not match:
        return []
    body = match.group(1)
    raw = re.split(r"\n### ", body)
    milestones: list[Milestone] = []
    for chunk in raw:
        chunk = chunk.strip()
        if not chunk:
            continue
        lines = chunk.splitlines()
        title = lines[0].strip()
        meaning = ""
        why = ""
        for line in lines[1:]:
            if line.startswith("- what this means:"):
                meaning = line.split(":", 1)[1].strip()
            if line.startswith("- why it matters:"):
                why = line.split(":", 1)[1].strip()
        milestones.append(Milestone(title=title, meaning=meaning, why=why))
    return milestones


def parse_delivery_order(path: Path) -> list[str]:
    text = _read(path)
    match = re.search(r"## Milestone 1 Delivery Order\n(.*?)(?:\nThe plan should stay this simple)", text, re.S)
    if not match:
        return []
    return [re.sub(r"^\d+\.\s*", "", line).strip() for line in match.group(1).splitlines() if re.match(r"^\d+\.", line.strip())]


def parse_initiatives(path: Path) -> list[Initiative]:
    text = _read(path)
    match = re.search(r"### Milestone 1 initiatives\n(.*?)(?:\n### Supporting initiative)", text, re.S)
    if not match:
        return []
    body = match.group(1)
    sections = re.split(r"\n#### ", body)
    initiatives: list[Initiative] = []
    for section in sections:
        section = section.strip()
        if not section:
            continue
        lines = section.splitlines()
        title = lines[0].strip()
        fields: dict[str, str] = {}
        for line in lines[1:]:
            if line.startswith("- ") and ":" in line:
                key, value = line[2:].split(":", 1)
                fields[key.strip()] = value.strip()
        initiatives.append(
            Initiative(
                title=title,
                lane=fields.get("best lane", ""),
                why=fields.get("why this exists", ""),
                outcome=fields.get("outcome", ""),
                done=fields.get("done looks like", ""),
                first_step=fields.get("first step", ""),
                depends_on=fields.get("depends on", ""),
                unlocks=fields.get("unlocks", ""),
            )
        )
    return initiatives


def parse_supporting_initiative(path: Path) -> Initiative | None:
    text = _read(path)
    match = re.search(r"### Supporting initiative\n\n#### (.*?)(?:\n## Milestone 1 Review Checklist)", text, re.S)
    if not match:
        return None
    section = match.group(1).strip()
    lines = section.splitlines()
    title = lines[0].strip()
    fields: dict[str, str] = {}
    for line in lines[1:]:
        if line.startswith("- ") and ":" in line:
            key, value = line[2:].split(":", 1)
            fields[key.strip()] = value.strip()
    return Initiative(
        title=title,
        lane=fields.get("best lane", ""),
        why=fields.get("why this exists", ""),
        outcome=fields.get("outcome", ""),
        done=fields.get("done looks like", ""),
        first_step=fields.get("first step", ""),
        depends_on=fields.get("depends on", ""),
        unlocks=fields.get("unlocks", ""),
    )


def parse_review_checklist(path: Path) -> dict[str, list[str]]:
    lines = _lines(path)
    heads = [
        "### Ready enough for launch",
        "### Ready enough for promo",
        "### Ready enough for first send",
        "### Ready enough for review",
    ]
    result: dict[str, list[str]] = {}
    for head in heads:
        result[head.replace("### ", "")] = extract_bullets(lines, head)
    return result


def parse_likely_gaps(path: Path) -> list[str]:
    return extract_bullets(_lines(path), "## Likely Gaps To Check Next")


def parse_suggested_next_chats(path: Path) -> list[str]:
    text = _read(path)
    match = re.search(r"## Suggested Next Chats\n(.*?)(?:\n## Ingest Prompt)", text, re.S)
    if not match:
        return []
    return [re.sub(r"^\d+\.\s*", "", line).strip() for line in match.group(1).splitlines() if re.match(r"^\d+\.", line.strip())]


def parse_handoff_files(folder: Path) -> list[dict[str, str]]:
    items: list[dict[str, str]] = []
    for path in sorted(folder.glob("*.md")):
        title = path.stem.replace("-", " ")
        packet = _read(path)
        first_title_match = re.search(r"Title:\n- (.+)", packet)
        lane_match = re.search(r"Best lane for this work:\n- (.+)", packet)
        items.append(
            {
                "file_name": path.name,
                "title": first_title_match.group(1).strip() if first_title_match else title.title(),
                "lane": lane_match.group(1).strip() if lane_match else "",
                "packet": packet,
            }
        )
    return items
