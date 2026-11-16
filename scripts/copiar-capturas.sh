#!/usr/bin/env bash
# Copia y optimiza las capturas reales de LV2-C que usa la landing (LV2-E, 15-nov-2026).
# Origen: research_notes/Pedily landing v2 2026-11-15/capturas-producto/ (PNG @2x y clips).
# Uso: bash scripts/copiar-capturas.sh  (necesita cwebp y ffmpeg)
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
ORIGEN="${ORIGEN:-$RAIZ/../../../research_notes/Pedily landing v2 2026-11-15/capturas-producto}"
O="$ORIGEN/original"; V="$ORIGEN/video"
P="$RAIZ/public/capturas"; C="$RAIZ/public/clips"
mkdir -p "$P/panel" "$P/cliente" "$C"

# Panel en escritorio (1440×900 @2x) → 1600 px; y su versión de celular, recortada arriba en 4:5.
panel() { # $1 origen sin sufijo, $2 nombre destino
  cwebp -quiet -q 76 -resize 1600 0 "$O/$1-escritorio.png" -o "$P/panel/$2.webp"
  cwebp -quiet -q 78 -crop 0 0 780 975 -resize 600 0 "$O/$1-movil.png" -o "$P/panel/$2-movil.webp"
}
panel panel-pedidos-en-vivo pedidos
panel panel-panel-ahora ahora
panel panel-cocina-kds cocina
panel panel-finanzas finanzas
panel panel-finanzas-estado-resultados estado-resultados
panel panel-inventario-todos inventario
panel panel-recetas recetas
panel panel-receta-detalle receta-detalle
panel panel-produccion-diaria produccion
panel panel-compras compras
panel panel-clientes clientes
panel panel-cliente-ficha cliente-ficha
panel panel-campanas campanas
panel panel-promociones promociones
panel panel-reportes reportes
panel panel-reportes-menu reportes-menu
panel panel-reportes-tiempos reportes-tiempos
panel panel-reportes-clientes reportes-clientes
panel panel-reportes-zonas reportes-zonas
panel panel-mesas mesas
panel panel-conversacion-abierta conversaciones
panel panel-conversacion-atencion atencion
panel panel-bot-playground-conversacion playground
panel panel-bot-gasto-asistente gasto-asistente
panel panel-roles roles
panel panel-pedidos-programados programados
panel panel-codigos-postales zonas
panel panel-tienda-marca mi-negocio

# Lado del cliente (390×844 @2x) → 600 px.
cliente() { cwebp -quiet -q 80 -resize 600 0 "$O/$1.png" -o "$P/cliente/$2.webp"; }
cliente tienda-01-inicio-movil tienda-inicio
cliente tienda-03b-plato-cremas-movil tienda-cremas
cliente tienda-04-carrito-movil tienda-carrito
cliente tienda-05-checkout-datos-movil tienda-comprobante
cliente tienda-07-checkout-programar-movil tienda-programar
cliente tienda-08-pago-yape-movil tienda-pago
cliente tienda-10-mis-pedidos-movil tienda-mis-pedidos
cliente tienda-11-beneficios-movil tienda-beneficios
cliente webview-01-carta-movil wa-carta
cliente webview-02-plato-movil wa-plato
cliente webview-03-agregado-movil wa-bebidas
cliente webview-04-carrito-movil wa-carrito
cliente webview-05-checkout-movil wa-confirmar
cliente webview-06-entrega-movil wa-entrega
cliente webview-07-pago-movil wa-pago
cliente mesa-01-carta-movil mesa-carta
cliente mesa-04-ronda-enviada-movil mesa-ronda
cliente mesa-05-cuenta-movil mesa-cuenta
cliente mesa-07-mis-platos-movil mesa-mis-platos
# Kiosko vertical (608×1080 @2x) → 640 px.
kiosko() { cwebp -quiet -q 80 -resize 640 0 "$O/$1.png" -o "$P/cliente/$2.webp"; }
kiosko kiosko-03-plato-kiosko kiosko-plato
kiosko kiosko-06-comprobante-kiosko kiosko-comprobante
kiosko kiosko-07-pago-kiosko kiosko-pago
kiosko kiosko-08-ticket-pagar-en-caja-kiosko kiosko-ticket

# Clips livianos (WebM + MP4) y su póster (fotograma a mitad de clip).
clip() { # $1 origen, $2 destino, $3 segundo del póster, $4 ancho del póster
  cp "$V/$1-liviano.webm" "$C/$2.webm"; cp "$V/$1-liviano.mp4" "$C/$2.mp4"
  ffmpeg -loglevel error -y -ss "$3" -i "$V/$1.mp4" -frames:v 1 -vf "scale=$4:-2" "$C/$2.png"
  cwebp -quiet -q 74 "$C/$2.png" -o "$C/$2.webp" && rm "$C/$2.png"
}
clip clip-02-pedido-en-kiosko kiosko 3 540
clip clip-03-mesa-paga-dividido-movil mesa 0.3 540
clip clip-04-pedido-entra-a-cocina cocina 0.3 960
clip clip-05-alarma-pedido-pagado alarma 2 960
clip clip-06-recorrido-panel panel 0.3 960
echo "Listo: $(find "$P" "$C" -type f | wc -l) archivos, $(du -sh "$P" "$C" | awk '{print $1}' | tr "\n" " ")"
