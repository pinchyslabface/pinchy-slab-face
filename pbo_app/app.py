#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from flask import Flask, Response, abort, jsonify, render_template, send_from_directory

from pbo_app.state import build_state

ROOT = Path(__file__).resolve().parents[1]
app = Flask(
    __name__,
    template_folder=str(Path(__file__).resolve().parent / "templates"),
    static_folder=str(Path(__file__).resolve().parent / "static"),
)


def build_context() -> dict:
    state = build_state(ROOT)
    return state.to_dict()


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


@app.route("/health")
def health():
    state = build_state(ROOT)
    status = "ok" if not state.errors else "error"
    return jsonify(
        {
            "status": status,
            "errors": state.errors,
            "generated_at": state.generated_at,
            "source_files": state.source_files,
        }
    )


@app.route("/api/state")
def api_state():
    state = build_state(ROOT)
    status_code = 200 if not state.errors else 500
    return Response(
        json.dumps(state.to_dict(), indent=2),
        status=status_code,
        mimetype="application/json",
    )


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
