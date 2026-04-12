#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from flask import Flask, abort, render_template, send_from_directory

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

ROOT = Path(__file__).resolve().parents[1]
app = Flask(
    __name__,
    template_folder=str(Path(__file__).resolve().parent / "templates"),
    static_folder=str(Path(__file__).resolve().parent / "static"),
)


def build_context() -> dict:
    ingest = ROOT / "PBO_INITIAL_INGEST.md"
    handoff_dir = ROOT / "initiative_handoffs"
    return {
        "project_name": "PSF PBO",
        "weekly": parse_weekly_check_in(ingest),
        "queue": parse_queue(ingest),
        "milestones": parse_milestones(ingest),
        "delivery_order": parse_delivery_order(ingest),
        "initiatives": parse_initiatives(ingest),
        "supporting_initiative": parse_supporting_initiative(ingest),
        "review_checklist": parse_review_checklist(ingest),
        "likely_gaps": parse_likely_gaps(ingest),
        "someday_maybe": parse_someday_maybe(ingest),
        "suggested_next_chats": parse_suggested_next_chats(ingest),
        "handoff_files": parse_handoff_files(handoff_dir),
    }


@app.route("/")
def dashboard():
    return render_template("dashboard.html", active="dashboard", **build_context())


@app.route("/board")
def board():
    return render_template("board.html", active="board", **build_context())


@app.route("/backlog")
def backlog():
    return render_template("backlog.html", active="backlog", **build_context())


@app.route("/initiatives")
def initiatives():
    return render_template("initiatives.html", active="initiatives", **build_context())


@app.route("/milestones")
def milestones():
    return render_template("milestones.html", active="milestones", **build_context())


@app.route("/project-status")
def project_status():
    return render_template("project_status.html", active="project-status", **build_context())


@app.route("/wbs")
def wbs():
    return render_template("wbs.html", active="wbs", **build_context())


@app.route("/handoffs/<path:name>")
def handoff_file(name: str):
    path = ROOT / "initiative_handoffs" / name
    if not path.exists():
        abort(404)
    return send_from_directory(str(path.parent), path.name)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=5040)
    args = parser.parse_args()
    app.run(host="127.0.0.1", port=args.port, debug=False)


if __name__ == "__main__":
    main()
