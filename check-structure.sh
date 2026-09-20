#!/usr/bin/env bash
set -euo pipefail

required_dirs=(app/assets app/components app/constants app/layouts app/middleware app/pages app/plugins app/services app/store app/utils public)

for directory in "${required_dirs[@]}"; do
  if [[ ! -d "$directory" ]]; then
    printf 'Missing required directory: %s\n' "$directory" >&2
    exit 1
  fi
done

for file in nuxt.config.js package.json README.md; do
  if [[ ! -f "$file" ]]; then
    printf 'Missing required file: %s\n' "$file" >&2
    exit 1
  fi
done

if [[ -d static || -d assets || -d components || -d pages ]]; then
  printf 'Move application source folders into app/ and public assets into public/.\n' >&2
  exit 1
fi

if ! grep -Fq "srcDir: 'app/'" nuxt.config.js || ! grep -Fq "static: '../public'" nuxt.config.js; then
  printf "Nuxt must map its static directory to public/.\n" >&2
  exit 1
fi

printf 'Project structure is valid for this Nuxt 2 setup.\n'
