#!/usr/bin/env bash
set -euo pipefail

# Ensure we run from the directory that contains mkdocs.yml
cd "$(dirname "$0")"

# Ensure pip is available
if ! command -v pip >/dev/null 2>&1; then
  echo "pip not found in PATH" >&2
  exit 1
fi

# Try to upgrade pip and install dependencies.
# Use --root-user-action=ignore to suppress the "running as root" warning in CI-like environments.
# If that fails (older pip), fall back to --user install.
pip install --upgrade pip
if ! pip install --root-user-action=ignore -r requirements.txt; then
  echo "Falling back to user install"
  pip install --user -r requirements.txt
fi

# Build mkdocs site into the 'site' directory, using the local mkdocs.yml
python -m mkdocs build -d site -f mkdocs.yml
