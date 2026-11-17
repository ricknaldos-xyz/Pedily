#!/usr/bin/env bash
# Copia y optimiza las capturas reales de las integraciones (ficha L-04, 16-nov-2026).
# Origen: research_notes/Pedily demo 100 2026-11-16/capturas/J-01…J-04/ (capturas de
# Chrome de las fichas J con la demo encendida en modo simulado, y los PNG de la vista
# previa ESC/POS de J-01).
#
# Cada captura se RECORTA (cwebp -crop x y ancho alto, en píxeles del original) solo para
# quitar lo que no es del producto o no debe salir: el indicador de desarrollo de Next
# («N», «2 Issues»), avisos de error del entorno local («Sin conexión realtime», «avisos
# que no llegaron a tu WhatsApp»), URL de localhost, llaves de API y IDs internos de envío.
# No se pinta ni se retoca nada dentro del recorte.
#
# Las capturas ya son de pantalla estrecha (364–606 px), así que no llevan versión de
# celular aparte: se ven igual en los dos tamaños.
# Uso: bash scripts/copiar-capturas-integraciones.sh  (necesita cwebp)
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
ORIGEN="${ORIGEN:-$RAIZ/../../../research_notes/Pedily demo 100 2026-11-16/capturas}"
D="$RAIZ/public/capturas/integraciones"
mkdir -p "$D"

# $1 origen (relativo a ORIGEN), $2 destino, $3 x, $4 y, $5 ancho, $6 alto
rec() { cwebp -quiet -q 82 -crop "$3" "$4" "$5" "$6" "$ORIGEN/$1" -o "$D/$2.webp"; }

# J-02 · Rappi, PedidosYa, repartos
rec J-02/03-alarma-rappi-plazo-4min.jpg            rappi-alarma          0 167 606 251
rec J-02/01-integraciones-rappi-modo-demo.jpg      rappi-integraciones   0 180 606 260
rec J-02/10-hub-pedidosya-sin-alerta-repartidor-botones-demo.jpg pedidosya-pedido 0 262 606 400
rec J-02/04-repartos-cotizar-prueba.jpg            repartos-cotizar      0 238 606 399
# J-03 · terminal POS, Izipay, impresoras en la nube
rec J-03/04-caja-terminal-rechazado.jpg            caja-terminal         63 48 359 438
rec J-03/01-kiosko-terminal-rotulo.jpg             kiosko-terminal       0 0 485 470
rec J-03/13-web-checkout-izipay-rotulo.jpg         checkout-izipay       0 60 606 488
rec J-03/10-panel-impresoras-nube-rotulo.jpg       impresoras-nube       13 240 459 245
# J-04 · contador, medición, conversiones, API y webhooks
rec J-04/10-contabilidad-descargas-rvie.jpg        contabilidad          0 0 364 292
rec J-04/03-panel-medicion-rotulo.jpg              medicion-google       0 95 364 265
rec J-04/01-tienda-aviso-cookies.jpg               tienda-cookies        0 0 364 390
rec J-04/05-panel-conversiones-eventos.jpg         conversiones-eventos  17 283 573 365
rec J-04/13-api-llaves-ejemplo.jpg                 api-permisos          248 126 1152 324
rec J-04/15-receptor-firma-valida-y-alterada.jpg   webhooks-receptor     148 148 702 218

# J-01 · vista previa ESC/POS → PNG (sin recorte; sin pérdida, son tickets en blanco y negro)
cwebp -quiet -lossless "$ORIGEN/J-01/despues/cliente-80mm.png" -o "$D/ticket-cliente-80mm.webp"
cwebp -quiet -lossless "$ORIGEN/J-01/despues/comanda-58mm.png" -o "$D/ticket-comanda-58mm.webp"

echo "Listo: $(find "$D" -type f | wc -l | tr -d ' ') archivos, $(du -sh "$D" | awk '{print $1}')"
