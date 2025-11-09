#!/usr/bin/env bash
set -euo pipefail

# Run from the directory containing this script (sites/hugo)
cd "$(dirname "$0")"

# Ensure hugo is available (Vercel provides it when HUGO_VERSION is set)
if ! command -v hugo >/dev/null 2>&1; then
  echo "hugo not found in PATH. Vercel should provide Hugo when HUGO_VERSION is set in vercel.json." >&2
  exit 1
fi

# Build hugo site into public (default output dir)
hugo --gc --minify -d public
