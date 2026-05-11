#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import subprocess
import sys
import time
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True)
    parser.add_argument("--port", required=True, type=int)
    parser.add_argument("--log", required=True)
    parser.add_argument("--startup-wait", type=float, default=1.0)
    args = parser.parse_args()

    root = Path(args.root).resolve()
    log_path = Path(args.log).resolve()
    app_path = root / "pbo_app" / "app.py"

    log_path.parent.mkdir(parents=True, exist_ok=True)
    with log_path.open("ab") as log_file:
        proc = subprocess.Popen(
            [sys.executable, str(app_path), "--port", str(args.port)],
            cwd=str(root),
            stdin=subprocess.DEVNULL,
            stdout=log_file,
            stderr=log_file,
            start_new_session=True,
            close_fds=True,
            env={**os.environ},
        )
    time.sleep(args.startup_wait)
    if proc.poll() is not None:
        raise SystemExit(proc.returncode or 1)
    print(proc.pid)


if __name__ == "__main__":
    main()
