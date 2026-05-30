#!/usr/bin/env bash
# One-shot: put this project on GitHub and (optionally) get a free demo link via GitHub Pages.
# Usage:
#   ./push-to-github.sh <repo-name> [public|private]
# Example:
#   ./push-to-github.sh the-25th-lash-studio public
set -euo pipefail

REPO="${1:?Pass a repo name, e.g. ./push-to-github.sh the-25th-lash-studio public}"
VIS="${2:-public}"   # public or private

cd "$(dirname "$0")"

# 0. Make sure gh is logged in
gh auth status >/dev/null 2>&1 || { echo "Run 'gh auth login' first."; exit 1; }

# 1. Init git if needed
if [ ! -d .git ]; then
  git init
  git branch -M main
fi

# 2. Commit everything
git add -A
git commit -m "The 25th Lash Studio — static website (pastel green theme)" || echo "Nothing new to commit."

# 3. Create the GitHub repo (or reuse if it already exists) and push
if gh repo view "$REPO" >/dev/null 2>&1; then
  OWNER="$(gh api user --jq .login)"
  git remote add origin "https://github.com/$OWNER/$REPO.git" 2>/dev/null || true
  git push -u origin main
else
  gh repo create "$REPO" "--$VIS" --source=. --remote=origin --push
fi

OWNER="$(gh api user --jq .login)"
echo
echo "✅ Pushed to https://github.com/$OWNER/$REPO"
echo
echo "To get a free demo link (GitHub Pages):"
echo "  1. https://github.com/$OWNER/$REPO/settings/pages"
echo "  2. Source: Deploy from a branch  →  Branch: main  /(root)  →  Save"
echo "  3. After ~1 min your demo is live at:"
echo "     https://$OWNER.github.io/$REPO/site/"
