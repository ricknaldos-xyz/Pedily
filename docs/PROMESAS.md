# Promesas de la landing → tareas

Registro de la tarea L-15 del plan de Pedily. Sale de la auditoría `pedily/_notas/plan/D-promesas-landing.md` (13-nov-2026).

**Regla del dueño (13-nov):** lo que la landing promete se construye y se presenta como hecho. Nada de «en preparación» ni «próximamente». Si una promesa todavía no existe en el producto, no se quita: se le asigna una tarea que la construye.

`scripts/comprobar-promesas.sh` lee esta tabla en cada `pnpm verificar`.

## Estados

| Estado | Significado | Qué comprueba el script |
|---|---|---|
| `Existe` | Está en el código de Pedily. | Que el patrón siga en la landing (si no, avisa). |
| `Parcial` | Una parte existe; la tarea completa el resto. | Que tenga tarea. |
| `Por construir` | No existe aún, pero tiene una tarea asignada que la construye. | Que tenga tarea. |
| `Servicio` | No es código: es una promesa comercial o humana que el dueño debe poder cumplir. | Nada. |
| `No existe` | No existe y **nadie la va a construir**. | **Falla si el patrón aparece en `src/` o `public/`.** |

Cómo se usa:

- Una promesa nueva en la landing entra aquí con su tarea.
- Si se decide no construir una promesa, pasa a `No existe` y hay que quitarla de la landing.
- Cuando una tarea se cierra, la fila pasa a `Existe`. Si su texto estaba en `scripts/promesas-prohibidas.txt`, se saca de allí. Ejemplo: `referid` sale cuando cierre L-11.
- El patrón es una expresión de `grep -E`. No distingue mayúsculas y no puede llevar `|` porque rompería la tabla.

## Tabla

Rehecha el 15-nov-2026 (L-18) para la landing nueva. Las rutas sin carpeta están en `src/components/sections/`. Los prefijos `W:` y `B:` remiten a las copias `pedily-web` y `pedily-backend`. Los números de fila se conservan; los que faltan pasaron a la lista de abajo.

| # | Promesa | Dónde | Estado | Tarea | Patrón |
|---|---|---|---|---|---|
| 1 | Tienda web con tu marca | `CanalesPropios.tsx`, `src/lib/planes.ts` | Existe | — (marca desde el panel: B-819, W-810, W-811) | `tienda web` |
| 3 | Pedidos de web, WhatsApp y kiosko en un solo panel, con aviso sonoro | `RecorridoPedido.tsx` | Existe | W-64 | `mismo panel` |
| 5 | Roles para tu equipo | `ClientesQueVuelven.tsx` («Y además») | Existe | W-64 (paso 4) | `roles para tu equipo` |
| 6 | Cobrar desde el primer día con el QR de tu Yape o Plin y verificar el comprobante en el panel | `AbreTuTienda.tsx`, `src/lib/faq.ts` | Existe | B-803, W-61 | `QR de tu Yape o Plin` |
| 7 | Tarjeta con Culqi cuando Culqi te aprueba | `AbreTuTienda.tsx`, `src/lib/faq.ts`, `RecorridoPedido.tsx` | Existe | B-602, B-605; conexión autónoma X-008, W-814 | `Culqi te aprueba` |
| 8 | En el kiosko: tarjeta, Yape o pagar en caja | `CanalesPropios.tsx`, `src/lib/faq.ts` | Existe | W-54 (prueba con Culqi de prueba) | `en el kiosko, también en caja` |
| 9 | Boleta o factura electrónica automática con tu RUC, por tu Nubefact | `RecorridoPedido.tsx`, `Hero.tsx` | Existe | B-603, B-604; conexión autónoma W-815 | `boleta sale sola` |
| 10 | Libro de Reclamaciones | `ClientesQueVuelven.tsx` | Existe | W-64 | `Libro de Reclamaciones` |
| 11 | Ticket impreso en el kiosko (PC con Windows e impresora térmica) | `CanalesPropios.tsx`, `src/lib/faq.ts` | Parcial | K-14, K-15, K-16 | `impresora t[eé]rmica` |
| 12 | Asistente de WhatsApp con IA que arma el pedido, cobra y lo manda a cocina | `Hero.tsx`, `RecorridoPedido.tsx`, `src/lib/faq.ts` | Parcial | Tramo E: B-501…B-520, B-811, B-808 (cumplida cuando cierre B-519) | `arma el pedido` |
| 13 | Si el cliente pide hablar con alguien, el asistente avisa y tu equipo sigue el chat | `RecorridoPedido.tsx`, `src/lib/faq.ts` | Existe | Tramo E | `sigue el chat` |
| 14 | El asistente solo ofrece lo que está en tu carta, con tus precios | `RecorridoPedido.tsx` | Existe | Tramo E (B-519 con la carta del cliente) | `Solo ofrece lo que est[aá] en tu carta` |
| 15 | Tamaños, extras y notas en la carta | `CanalesPropios.tsx` | Existe | Carga autónoma: B-817, B-818, W-812 | `Tama[nñ]os, extras y notas` |
| 17 | Reparto con tus zonas y tarifas, o recojo (sin «dibuja la zona»: no existe, D+-8) | `RecorridoPedido.tsx` | Existe | W-62; mapa autónomo W-813 | `zonas y tarifas` |
| 18 | Motorizado con PedidosYa Envíos cuando no tienes repartidor | `RecorridoPedido.tsx`, `src/lib/faq.ts` | Existe | B-601 | `PedidosYa Env[ií]os` |
| 21 | Cupones con vencimiento y límite de usos | `ClientesQueVuelven.tsx` | Existe | — | `vencimiento y l[ií]mite de usos` |
| 22 | Saldo a favor para el próximo pedido | `ClientesQueVuelven.tsx` | Existe | Antes y después: B-821, W-817 | `saldo a favor` |
| 23 | Repetir el último pedido en dos toques | `ClientesQueVuelven.tsx` | Existe | — | `dos toques` |
| 24 | Meta de ventas del día | `ClientesQueVuelven.tsx` («Y además») | Existe | B-822 (`GET /store/meta-hoy`, `PATCH /store/meta`) | `meta de ventas del d[ií]a` |
| 26 | Inventario y recetas | `ClientesQueVuelven.tsx` («Y además») | Existe | W-64 | `inventario y recetas` |
| 27 | Caja con cierre | `ClientesQueVuelven.tsx` («Y además») | Existe | W-64 | `caja con cierre` |
| 29 | Reportes por canal y hora | `ClientesQueVuelven.tsx` («Y además») | Existe | W-64 | `reportes por canal y hora` |
| 32 | Sin comisión por pedido | `Hero.tsx`, `PricingTable.tsx`, `FinalCTA.tsx`, `src/app/layout.tsx` | Servicio | Decisión del dueño (modelo comercial) | `sin comisi[oó]n` |
| 33 | Si prefieres, lo hacemos contigo, sin reunión obligatoria | `AbreTuTienda.tsx`, `src/lib/faq.ts` | Servicio | Decisión del dueño: quién atiende (L-12) | `lo hacemos contigo` |
| 34 | Te acompañamos en la puesta en marcha | `FinalCTA.tsx`, `Fundadores.tsx` | Servicio | Decisión del dueño: quién atiende (L-12) | `te acompa[nñ]amos` |
| 35 | Nació y se probó en el restaurante de origen, nombrado sin cifras (regla del dueño) | `Origen.tsx`, `src/lib/faq.ts`, `src/lib/site.ts` | Existe | — | `se prob[oó] en` |
| 36 | Solo Perú: Culqi, Yape, Plin y SUNAT | `src/lib/faq.ts` | Existe | — | `solo en Per[uú]` |
| 37 | El dinero va directo a tu cuenta | `Hero.tsx`, `src/lib/faq.ts` | Existe | — | `directo a tu cuenta` |
| 38 | Formulario «Crear mi tienda» o «Prefiero que me muestren una demo» | `src/app/contacto/FormularioSolicitud.tsx`, `src/lib/solicitud.ts` | Existe | L-13 (hecha); alta con consola: X-007 | `Cu[aá]ndo quieres empezar` |
| 39 | Planes de S/ 249, 499 y 999 al mes con IGV, 0 % de comisión al restaurante y al comensal | `src/lib/planes.ts`, `PricingTable.tsx`, `src/lib/faq.ts` | Servicio | Decisión del dueño (14-nov) | `S/ 249` |
| 40 | Asistente desde el plan de S/ 499, con un cupo mensual de conversaciones que no se publica | `src/lib/planes.ts`, `src/lib/faq.ts` | Parcial | Tramo E (B-519) y medir los cupos (B-518) | `cupo mensual` |
| 41 | Alta gratis si te quedas 6 meses; si te vas antes, la parte proporcional del alta | `PricingTable.tsx`, `src/lib/faq.ts`, `legal/terminos` | Servicio | Contrato y valor del alta (D+-9, abogado) | `Alta gratis` |
| 42 | Lo que pagas aparte a Culqi, Nubefact y Meta, con sus precios públicos | `src/lib/planes.ts`, `PricingTable.tsx`, `src/lib/faq.ts` | Servicio | — | `pagas aparte` |
| 43 | Cupones, referidos y saldo a favor, apagados hasta que los enciendes en «Opciones de tu tienda» | `ClientesQueVuelven.tsx` | Existe | B-812, W-805, W-806, W-807 | `referidos` |
| 44 | Pago anual con 2 meses gratis | `PricingTable.tsx`, `src/lib/faq.ts` | Servicio | Decisión del dueño (15-nov) | `2 meses` |
| 45 | Pedily nunca toca tu dinero | `PricingTable.tsx`, `src/lib/faq.ts` | Existe | — | `nunca toca tu dinero` |
| 46 | Subes una foto de tu carta y la IA arma tus platos y precios para que los revises | `AbreTuTienda.tsx`, `src/lib/faq.ts` | Parcial | Carga autónoma: B-817, B-818, W-812 (comprobar con una carta real) | `foto de tu carta` |
| 47 | Asistente «Empezar» en el panel que te lleva paso a paso | `AbreTuTienda.tsx` (captura real del panel) | Existe | W-808…W-816 | `te lleva paso a paso` |
| 48 | Kiosko de autoservicio en el plan de S/ 999 | `CanalesPropios.tsx`, `src/lib/planes.ts`, `src/lib/faq.ts` | Servicio | Contenido del plan de S/ 999 por decidir (dueño) | `plan de S/ 999` |
| 49 | Programa de fundadores: 10 cupos, precio congelado 24 meses, alta gratis, acompañamiento directo | `Fundadores.tsx`, `src/lib/site.ts` | Servicio | Condiciones propuestas; las confirma el dueño | `fundador` |

### Promesas que ya no salen en la landing (L-18)

Siguen siendo ciertas en el producto; si vuelven a la landing, entran arriba con su número.

| Fila | Promesa | Estado en el producto | Tarea |
|---|---|---|---|
| n.º 2 | Dominio propio con SSL | Parcial | W-70, X-009, W-820 |
| n.º 4 | 10 estados del pedido | Existe | — |
| n.º 16 | Stock que se actualiza solo | Parcial | W-822 |
| n.º 19 | Varias direcciones guardadas | Existe | — |
| n.º 20 | Google Maps para direcciones y costo de envío | Existe | X-005, X-008 |
| n.º 25 | Lotes de producción y conteos | Existe | W-64 |
| n.º 28 | Reportes en CSV | Parcial | B-823 |
| n.º 30 | Vouchers de compensación | Existe | — |
| n.º 31 | Tus clientes son tuyos (base exportable) | Parcial | B-820, W-818 |

### Promesas que aún no están en la landing

Se añadirán a la tabla de arriba, con patrón, cuando se escriban en la landing.

| Promesa | Estado | Tarea |
|---|---|---|
| Zona de reparto dibujada en el mapa | Por construir | W-813 + polígonos (D+-8) |
| Procedimiento de baja | Servicio | X-011 y contrato (D+-9) |
| Tus datos son tuyos y te los llevas cuando quieras | Por construir | B-820, W-818 → L-12 |
| Qué pasa si te vas | Por construir | X-011 → L-12 |
| Dónde están tus datos | Por decidir | Decisión D+-5 → L-12 |
