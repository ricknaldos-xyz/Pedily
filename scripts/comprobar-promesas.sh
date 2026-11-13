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

# L-15: registro «promesa → tarea» de docs/PROMESAS.md. Cada fila de la tabla
# principal lleva estado, tarea y patrón (grep -E). Falla si:
#   - un estado no es uno de los admitidos;
#   - una promesa «Parcial» o «Por construir» no tiene tarea;
#   - una fila no tiene patrón;
#   - una promesa «No existe» (sin nadie que la construya) sigue en src/ o public/.
# Avisa (sin fallar) si una promesa registrada ya no aparece en la landing.
registro=docs/PROMESAS.md
filas="$(awk -F'|' '/^\| *[0-9]+ *\|/ {
  for (i = 2; i <= 7; i++) gsub(/^ +| +$/, "", $i)
  p = $7; gsub(/`/, "", p)
  printf "%s\t%s\t%s\t%s\n", $2, $5, $6, p
}' "$registro")"
if [ -z "$filas" ]; then
  echo "$registro no tiene filas de promesas." >&2
  exit 1
fi

fallos=0
while IFS=$'\t' read -r num estado tarea patron; do
  case "$estado" in
    Existe|Parcial|"Por construir"|Servicio|"No existe") ;;
    *) echo "PROMESAS #$num: estado desconocido «${estado}»." >&2; fallos=1; continue ;;
  esac
  if [ -z "$patron" ]; then
    echo "PROMESAS #$num: falta el patrón." >&2; fallos=1; continue
  fi
  if { [ "$estado" = "Parcial" ] || [ "$estado" = "Por construir" ]; } \
      && { [ -z "$tarea" ] || [ "$tarea" = "—" ]; }; then
    echo "PROMESAS #$num: «${estado}» sin tarea que la cumpla." >&2; fallos=1
  fi
  if hallazgos="$(grep -rniE -- "$patron" src public)"; then
    if [ "$estado" = "No existe" ]; then
      echo "PROMESAS #$num: promesa marcada «No existe» sigue en la landing:" >&2
      echo "$hallazgos" >&2
      fallos=1
    fi
  elif [ "$estado" != "No existe" ] && [ "$estado" != "Servicio" ]; then
    echo "Aviso: PROMESAS #$num («${patron}») ya no aparece en la landing; actualiza $registro." >&2
  fi
done <<< "$filas"

if [ "$fallos" -ne 0 ]; then
  exit 1
fi
echo "comprobar-promesas: $(printf '%s\n' "$filas" | wc -l | tr -d ' ') promesas de $registro con estado y tarea en regla."
