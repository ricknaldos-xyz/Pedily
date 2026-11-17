#!/usr/bin/env bash
# Falla si src/ o public/ contienen alguna promesa de scripts/promesas-prohibidas.txt.
# Uso: bash scripts/comprobar-promesas.sh
set -euo pipefail
cd "$(dirname "$0")/.."

patrones="$(mktemp)"
trap 'rm -f "$patrones"' EXIT
grep -vE '^\s*(#|$)' scripts/promesas-prohibidas.txt > "$patrones"

if hallazgos="$(grep -rniIE -f "$patrones" src public)"; then
  echo "Promesas prohibidas encontradas:" >&2
  echo "$hallazgos" >&2
  exit 1
fi
echo "comprobar-promesas: 0 coincidencias en src/ y public/."

# P1-D7 + decisión del 15-nov: el restaurante de origen se puede NOMBRAR, pero
# SIN NINGUNA CIFRA suya. Reglas:
#   1. en src/ y public/ el nombre solo puede estar en src/lib/site.ts
#      (RESTAURANTE_ORIGEN); los componentes lo leen de ahí;
#   2. en todo el repo (docs incluidos), cada mención debe ser el nombre
#      completo y su línea no puede llevar ningún número (ni pedidos, ni %, ni
#      ventas, ni fechas pegadas a la marca).
# Se excluyen las carpetas generadas o de terceros y los propios guardianes.
nombre_original='wantan'
nombre_completo='wantan clan'
archivo_permitido='src/lib/site.ts'
fallo_nombre=0
if hallazgos="$(grep -rliIE "$nombre_original" src public | grep -v "^${archivo_permitido}\$")"; then
  echo "El nombre del restaurante de origen solo puede estar en $archivo_permitido:" >&2
  echo "$hallazgos" >&2
  fallo_nombre=1
fi
while IFS= read -r linea; do
  [ -z "$linea" ] && continue
  texto="${linea#*:*:}"
  minus="$(printf '%s' "$texto" | tr '[:upper:]' '[:lower:]')"
  sin_nombre="${minus//$nombre_completo/}"
  if printf '%s' "$sin_nombre" | grep -qi "$nombre_original"; then
    echo "Mención del restaurante de origen sin el nombre completo: $linea" >&2
    fallo_nombre=1
  elif printf '%s' "$texto" | grep -q '[0-9]'; then
    echo "Cifra junto al nombre del restaurante de origen: $linea" >&2
    fallo_nombre=1
  fi
done < <(grep -rniIE "$nombre_original" . \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=".next-*" --exclude-dir=.git \
    --exclude=promesas-prohibidas.txt --exclude=comprobar-promesas.sh || true)
if [ "$fallo_nombre" -ne 0 ]; then
  exit 1
fi
echo "comprobar-promesas: el restaurante de origen solo aparece por su nombre, sin cifras."

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
  if hallazgos="$(grep -rniIE -- "$patron" src public)"; then
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

# LV2-F (16-nov): la secuencia «chat + mini-app» mezcla un chat recreado con
# capturas reales. Cada pantalla de chat debe ir rotulada como recreación y
# cada captura de la mini-app como real con datos de la demo.
secuencia=src/components/producto/ChatMiniApp.tsx
if [ -f "$secuencia" ]; then
  if ! grep -q 'recreación con textos reales' "$secuencia" || ! grep -q 'datos de la demo' "$secuencia"; then
    echo "$secuencia: faltan los rótulos «recreación con textos reales» y «datos de la demo»." >&2
    exit 1
  fi
  chats="$(grep -c '<ChatWhatsApp' "$secuencia" || true)"
  notas_chat="$(grep -c 'nota: NOTA_CHAT' "$secuencia" || true)"
  if [ "$chats" -ne "$notas_chat" ]; then
    echo "$secuencia: $chats pantallas de chat y $notas_chat rótulos de recreación; deben coincidir." >&2
    exit 1
  fi
  echo "comprobar-promesas: la secuencia chat + mini-app rotula el chat como recreación ($chats pantallas)."
fi

# G-08 (15-nov): cada página pública está en el sitemap, y cada herramienta
# gratis (src/app/herramientas/<slug>/) usa el esqueleto común
# (PaginaHerramienta: JSON-LD WebApplication + FAQPage + fuentes), está en el
# catálogo src/lib/herramientas.ts y su ficha cita al menos una fuente https.
fallo_rutas=0
while IFS= read -r pagina; do
  ruta="${pagina#src/app}"
  ruta="${ruta%/page.tsx}"
  case "$ruta" in
    */\[*|/api*) continue ;;
  esac
  if ! grep -q "<loc>https://pedily.vercel.app${ruta:-/}</loc>" public/sitemap.xml; then
    echo "Falta en public/sitemap.xml: ${ruta:-/}" >&2
    fallo_rutas=1
  fi
done < <(find src/app -name page.tsx | sort)

# LV2-D (15-nov): /soluciones/[slug] es dinámica; cada slug del catálogo
# src/lib/soluciones.ts debe estar en el sitemap.
soluciones=0
while IFS= read -r slug; do
  soluciones=$((soluciones + 1))
  if ! grep -q "<loc>https://pedily.vercel.app/soluciones/${slug}</loc>" public/sitemap.xml; then
    echo "Falta en public/sitemap.xml: /soluciones/${slug}" >&2
    fallo_rutas=1
  fi
done < <(sed -nE 's/^    slug: "([a-z0-9-]+)",$/\1/p' src/lib/soluciones.ts)
if [ "$soluciones" -eq 0 ]; then
  echo "No se encontró ningún slug en src/lib/soluciones.ts." >&2
  fallo_rutas=1
fi

# 16-nov: páginas por tipo de restaurante (src/lib/para.ts → /para/<slug>).
# Cada una tiene su página, está en el sitemap y se enlaza desde el menú, el
# pie y la portada.
paras=0
while IFS= read -r slug; do
  paras=$((paras + 1))
  if [ ! -f "src/app/para/${slug}/page.tsx" ]; then
    echo "Falta la página src/app/para/${slug}/page.tsx" >&2; fallo_rutas=1
  fi
  if ! grep -q "<loc>https://pedily.vercel.app/para/${slug}</loc>" public/sitemap.xml; then
    echo "Falta en public/sitemap.xml: /para/${slug}" >&2; fallo_rutas=1
  fi
done < <(sed -nE 's/^    slug: "([a-z0-9-]+)",$/\1/p' src/lib/para.ts)
for enlace in src/components/layout/Header.tsx src/components/layout/Footer.tsx; do
  if [ "$paras" -gt 0 ] && ! grep -q "PAGINAS_PARA" "$enlace"; then
    echo "$enlace no enlaza las páginas /para (PAGINAS_PARA)." >&2; fallo_rutas=1
  fi
done
if [ "$paras" -gt 0 ] && ! grep -rqE "RUTA_SALON|RUTA_PARA|/para/" src/components/home; then
  echo "La portada no enlaza ninguna página /para." >&2; fallo_rutas=1
fi

herramientas=0
for dir in src/app/herramientas/*/; do
  [ -d "$dir" ] || continue
  slug="$(basename "$dir")"
  herramientas=$((herramientas + 1))
  if ! grep -q "PaginaHerramienta" "$dir/page.tsx"; then
    echo "Herramienta $slug: no usa PaginaHerramienta (JSON-LD y fuentes)." >&2
    fallo_rutas=1
  fi
  if ! grep -q "slug: \"$slug\"" src/lib/herramientas.ts; then
    echo "Herramienta $slug: no está en src/lib/herramientas.ts." >&2
    fallo_rutas=1
  fi
done
fichas="$(grep -c 'slug: "' src/lib/herramientas.ts || true)"
fuentes="$(grep -cE '^ *fuentes: \[[A-Z_]' src/lib/herramientas.ts || true)"
if [ "$fichas" -ne "$herramientas" ] || [ "$fuentes" -ne "$fichas" ]; then
  echo "Herramientas: $herramientas páginas, $fichas fichas y $fuentes con fuentes; deben coincidir." >&2
  fallo_rutas=1
fi
if grep -nE 'url: "http:' src/lib/herramientas.ts; then
  echo "Las fuentes de las herramientas deben ser https." >&2
  fallo_rutas=1
fi
if [ "$fallo_rutas" -ne 0 ]; then
  exit 1
fi
echo "comprobar-promesas: todas las páginas en el sitemap ($soluciones soluciones, $paras páginas /para enlazadas); $herramientas herramientas con JSON-LD y fuentes."
