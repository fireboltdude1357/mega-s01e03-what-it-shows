#!/usr/bin/env bash
# Builds the kb for GitHub Pages under /<repo>/ and writes it to ./build.
# Page links are written as /kb/...; this prefixes them with the Pages base path.
set -euo pipefail
base="/mega-s01e03-what-it-shows"
BASE_PATH="$base" pnpm build
find build -name '*.html' -print0 | xargs -0 sed -i -E "s#href=\"/kb#href=\"$base/kb#g"
touch build/.nojekyll
