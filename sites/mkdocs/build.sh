#!/usr/bin/env bash
set -euo pipefail

# Ensure pip is available
if ! command -v pip >/dev/null 2>&1; then
  echo "pip not found in PATH" >&2
  exit 1
fi

pip install --upgrade pip
pip install -r requirements.txt

# Build mkdocs site into the 'site' directory
python -m mkdocs build -d site
