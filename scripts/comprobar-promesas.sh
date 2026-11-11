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

# P1-D7: el nombre del cliente original no puede aparecer en ningún archivo del
# repo (docs, notas, configuración...), versionado o no. Se excluyen solo las
# carpetas generadas o de terceros y la propia lista de patrones, que lo contiene
# a propósito para que src/ y public/ también lo vigilen.
nombre_original='wantan'
if hallazgos="$(grep -rniE "$nombre_original" . \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
    --exclude=promesas-prohibidas.txt --exclude=comprobar-promesas.sh)"; then
  echo "Nombre del cliente original encontrado en el repo:" >&2
  echo "$hallazgos" >&2
  exit 1
fi
echo "comprobar-promesas: el nombre del cliente original no aparece en el repo."
