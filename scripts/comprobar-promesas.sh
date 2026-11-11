#!/usr/bin/env bash
# Falla si src/ o public/ contienen alguna promesa de scripts/promesas-prohibidas.txt.
# Uso: bash scripts/comprobar-promesas.sh
set -euo pipefail
cd "$(dirname "$0")/.."

patrones="$(mktemp)"
trap 'rm -f "$patrones"' EXIT
grep -vE '^\s*(#|$)' scripts/promesas-prohibidas.txt > "$patrones"

if hallazgos="$(grep -rniE -f "$patrones" src public)"; then
  echo "Promesas prohibidas encontradas:" >&2
  echo "$hallazgos" >&2
  exit 1
fi
echo "comprobar-promesas: 0 coincidencias en src/ y public/."
