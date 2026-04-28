#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")"

PID_FILE=".pbo.pid"
PORT_FILE=".pbo.port"
DEFAULT_PORT=5040

ensure_venv() {
  if [ ! -d "venv-pbo" ]; then
    echo "Creating PBO virtual environment..."
    python3 -m venv venv-pbo
  fi
  # shellcheck disable=SC1091
  source venv-pbo/bin/activate
  python3 -m pip --disable-pip-version-check install -r requirements-pbo.txt >/dev/null 2>&1
}

ensure_venv

if [ -f "$PID_FILE" ]; then
  EXISTING_PID=$(cat "$PID_FILE" 2>/dev/null || true)
  if [ -n "${EXISTING_PID:-}" ] && ps -p "$EXISTING_PID" >/dev/null 2>&1; then
    kill "$EXISTING_PID" 2>/dev/null || true
    sleep 0.5
  fi
fi

PORT=$DEFAULT_PORT
while nc -z 127.0.0.1 "$PORT" 2>/dev/null; do
  PORT=$((PORT + 1))
done

mkdir -p logs
if command -v setsid >/dev/null 2>&1; then
  setsid "$PWD/venv-pbo/bin/python3" "$PWD/pbo_app/app.py" --port "$PORT" > "$PWD/logs/pbo.log" 2>&1 < /dev/null &
else
  nohup "$PWD/venv-pbo/bin/python3" "$PWD/pbo_app/app.py" --port "$PORT" > "$PWD/logs/pbo.log" 2>&1 < /dev/null &
fi
SERVER_PID=$!
echo "$SERVER_PID" > "$PID_FILE"
echo "$PORT" > "$PORT_FILE"

STARTED=false
for i in $(seq 1 50); do
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "ERROR: PBO server exited during startup. Check logs/pbo.log"
    exit 1
  fi
  if curl -s "http://localhost:$PORT/health" > /dev/null 2>&1; then
    STARTED=true
    break
  fi
  sleep 0.2
done

if [ "$STARTED" = false ]; then
  echo "WARNING: PBO server did not respond within 10 seconds. Check logs/pbo.log"
fi

echo "PSF PBO at http://localhost:$PORT"
echo "Server log: $PWD/logs/pbo.log"
if command -v open >/dev/null 2>&1; then
  open "http://localhost:$PORT"
fi
