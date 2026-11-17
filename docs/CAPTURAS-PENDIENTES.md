# Capturas de las integraciones (L-02 → L-04, 16-nov-2026)

L-02 dejó 14 huecos porque la carpeta de capturas estaba vacía. L-04 los llenó con las capturas **reales** que dejaron las fichas J-01…J-04 en `research_notes/Pedily demo 100 2026-11-16/capturas/` (demo con cada proveedor en modo simulado). Nada es maqueta.

Cómo se hizo (para regenerarlas):

1. `bash scripts/copiar-capturas-integraciones.sh` recorta y pasa a WebP cada captura en `public/capturas/integraciones/`. El recorte solo quita lo que no es del producto o no debe salir (indicador de desarrollo de Next, avisos de error del entorno local, URL de localhost, llaves, IDs internos de envío). No se retoca nada dentro del recorte.
2. Cada una está registrada en `src/lib/capturas.ts` (claves `int-*`, tipo `recorte` o `ticket`) con su `alt` y, si la pantalla es de un proveedor simulado, `demo`: el pie dice «Modo demo · <proveedor> simulado».
3. Se colocan en `src/app/integraciones/page.tsx` (`CAPTURAS_INTEGRACION`) y en `src/lib/galerias.ts`.

| # | Hueco | Estado | Captura usada (clave · origen) | Dónde va |
|---|---|---|---|---|
| 1 | `panel-alarma-rappi` | Hecho | `int-rappi-alarma` · J-02/03 | `/integraciones#rappi`; galería de `cocina` |
| 2 | `panel-integraciones` | Hecho | `int-rappi-integraciones` · J-02/01 (recortada antes de la lista de variables) | `/integraciones#rappi` |
| 3 | `panel-pedido-pedidosya` | Hecho | `int-pedidosya-pedido` · J-02/10 | `/integraciones#pedidosya`; galería de `cocina` |
| 4 | `panel-yango` | **Sustituida** | `int-repartos` · J-02/04: cotización Yango frente a PedidosYa Envíos. La de «motorizado pedido» (J-02/09) muestra el ID interno del envío (`YANGO:…`) en la misma caja que el rótulo y no se puede recortar sin perderlo | `/integraciones#yango`; galería de `delivery` |
| 5 | `caja-terminal` | Hecho | `int-caja-terminal` · J-03/04 (rechazado) | `/integraciones#terminal-pos`; galería de `caja-y-pagos` |
| 6 | `kiosko-terminal` | Hecho | `int-kiosko-terminal` · J-03/01 | `/integraciones#terminal-pos`; galería de `kiosko` |
| 7 | `checkout-izipay` | Hecho | `int-checkout-izipay` · J-03/13 | `/integraciones#izipay` |
| 8 | `panel-impresora-nube` | Hecho (parcial) | `int-impresoras-nube` · J-03/10. **No** se usó J-03/11 (cola de la CloudPRNT simulada): muestra la URL del servidor con su clave | `/integraciones#impresoras-nube` |
| 9 | `ticket-vista-previa` | Hecho | `int-ticket-cliente` (80 mm) e `int-ticket-comanda` (58 mm) · J-01/despues, a escala entre sí | `/integraciones#impresoras` |
| 10 | `panel-contabilidad` | Hecho | `int-contabilidad` · J-04/10 | `/integraciones#contador`; galería de `boletas-sunat` |
| 11 | `panel-medicion-google` | Hecho | `int-medicion-google` · J-04/03 | `/integraciones#google` |
| 12 | `tienda-cookies` | Hecho | `int-tienda-cookies` · J-04/01 (corta antes de «Aceptar todo», que tapaba el indicador de Next) | `/integraciones#google`; galería de `tienda-web` |
| 13 | `panel-conversiones` | Hecho | `int-conversiones` · J-04/05 | `/integraciones#meta-tiktok` |
| 14 | `panel-api-webhooks` | Hecho | `int-api-permisos` · J-04/13 (sin las llaves de ejemplo ni la URL) e `int-webhooks-receptor` · J-04/15 (sin la URL) | `/integraciones#api-webhooks`; galería de `reportes` |

## Lo que sigue pendiente

- **Motorizado de Yango pedido desde el pedido** (hueco 4 en su versión original): hace falta una captura sin el ID interno del envío. Si J-02 oculta o acorta ese ID en el panel, se recaptura `J-02/09`.
- **Calidad:** las capturas de J son de 1× (364–606 px de ancho). En pantallas retina se ven algo blandas. Si se recapturan a 2× (`deviceScaleFactor: 2`) sin el indicador de Next (`next start` en vez de `next dev`), basta reemplazar los originales y volver a correr el script.
- Sin captura (no estaba en la lista): Culqi, PedidosYa Envíos (comparte la de Yango), Nubefact y WhatsApp de Meta.

Tampoco se usaron, por no hacer falta (no son descartes): J-01/panel-*, J-02/06, J-03/02–03, 05–09, 12, 14–16, J-04/02, 04, 06–09, 11, 12, 14 (limpia: alta de webhooks con URL `example.com`), 16 y 17. Quedan para otra sección si se quiere.

## Capturas descartadas (no deben salir)

| Original | Motivo |
|---|---|
| J-02/02, J-02/07 | Lista de variables de entorno del proveedor (nombres de secretos) |
| J-02/05, J-02/08 | Indicador «2 Issues» de Next tapando botones; J-02/08 además muestra el ID interno del envío (`PEYASIM-…`) |
| J-02/09 | ID interno del envío de Yango |
| J-03/11 | URL del servidor CloudPRNT con su clave («no la compartas») |
| J-04/13 (parte baja) | Prefijo de las llaves de API de ejemplo y URL `127.0.0.1` (recortados) |
| J-02/01, J-02/03 (parte alta) | Avisos del entorno local: «Sin conexión realtime», «avisos que no llegaron a tu WhatsApp» (recortados) |
