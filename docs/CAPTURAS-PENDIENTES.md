# Capturas pendientes de la landing (L-02, 16-nov-2026)

La página `/integraciones` y las funciones nuevas de las soluciones salen **sin capturas**: el 16-nov la carpeta `research_notes/Pedily demo 100 2026-11-16/capturas/` estaba vacía (las fichas J-01…J-04 la llenan al encender la demo). No se usó ninguna maqueta como si fuera real; el esquema de la cabecera de `/integraciones` está rotulado «Esquema».

Cuando lleguen, el coordinador:

1. Copia y optimiza cada PNG con `scripts/copiar-capturas.sh` (añadiendo su origen) y la registra en `src/lib/capturas.ts` con su `alt`.
2. La coloca donde dice la tabla (lo normal: una `<Captura>` en la tarjeta de la integración de `src/app/integraciones/page.tsx`, o en `src/lib/galerias.ts` para la solución).
3. Rotula «Modo demo: <proveedor> simulado» en el pie si la pantalla lo muestra (regla J: no se engaña a nadie).

| # | Hueco | Dónde va | Qué debe verse | Ficha que la captura |
|---|---|---|---|---|
| 1 | `panel-alarma-rappi` | `/integraciones#rappi` y sección «Un pedido de Rappi»; galería de `cocina` | Franja roja de la alarma con la cuenta atrás de 4 min, Aceptar y Rechazar | J-02 |
| 2 | `panel-integraciones` | `/integraciones#rappi` y `#pedidosya` | Pantalla «Integraciones»: estado, aceptar automáticamente, asociación de productos, métricas | J-02 |
| 3 | `panel-pedido-pedidosya` | `/integraciones#pedidosya`; galería de `cocina` | Pedido de PedidosYa en el tablero, con la etiqueta de la app | J-02 |
| 4 | `panel-yango` | `/integraciones#yango`; galería de `delivery` | Motorizado de Yango pedido desde el pedido, con su estado | J-02 |
| 5 | `caja-terminal` | `/integraciones#terminal-pos`; galería de `caja-y-pagos` | «Cobrar con terminal» con aprobado / rechazado / tiempo agotado | J-03 |
| 6 | `kiosko-terminal` | `/integraciones#terminal-pos`; galería de `kiosko` | «Pagar con terminal» en el kiosko | J-03 |
| 7 | `checkout-izipay` | `/integraciones#izipay` | Checkout web con Izipay como pasarela (simulado) | J-03 |
| 8 | `panel-impresora-nube` | `/integraciones#impresoras-nube` | Impresoras en la nube con su cola y la URL para la impresora | J-03 |
| 9 | `ticket-vista-previa` | `/integraciones#impresoras` | Vista previa PNG del ticket en 58 y 80 mm (después de J-01) | J-01 / J-03 |
| 10 | `panel-contabilidad` | `/integraciones#contador`; galería de `boletas-sunat` | Pestaña Contabilidad: SIRE validado y descargas, asientos por programa | J-04 |
| 11 | `panel-medicion-google` | `/integraciones#google` | «Medición y Google»: IDs y comprobación de Googlebot | J-04 |
| 12 | `tienda-cookies` | `/integraciones#google`; galería de `tienda-web` | Aviso de cookies en la tienda a 390 px | J-04 |
| 13 | `panel-conversiones` | `/integraciones#meta-tiktok` | Vista de «eventos que se habrían enviado» (dry-run) | J-04 |
| 14 | `panel-api-webhooks` | `/integraciones#api-webhooks`; galería de `reportes` | «API y webhooks»: llaves, webhooks y entregas con el receptor de prueba | J-04 |
