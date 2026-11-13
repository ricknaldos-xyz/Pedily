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

Las líneas son de la rama `fix/landing-honesta` tras L-15. Las rutas sin carpeta están en `src/components/sections/`. Los prefijos `W:` y `B:` remiten a las copias `pedily-web` y `pedily-backend`.

| # | Promesa | Dónde | Estado | Tarea | Patrón |
|---|---|---|---|---|---|
| 1 | Tienda web con tu marca | `PricingTable.tsx:11` | Existe | — (marca desde el panel: B-819, W-810, W-811) | `tienda web` |
| 2 | Tu dominio propio, SSL incluido | `IntegrationLogos.tsx:82`, `src/app/precios/page.tsx:40` | Parcial | W-70 (existe), X-009, W-820 | `dominio propio` |
| 3 | Pedidos de los 3 canales en un Hub, al instante y con sonido | `FeatureShowcase.tsx:38-39`, `OperationsShowcase.tsx:22` | Existe | W-64 (recorrido con base vacía) | `1 solo dashboard` |
| 4 | 10 estados del pedido (`HubOrderStatus` de `B:prisma/schema.prisma` tiene 10 valores) | `FeatureShowcase.tsx:40` | Existe | L-15 (cifra corregida de 9 a 10) | `10 estados` |
| 5 | Roles admin, cocina y operador; permisos por módulo | `FeatureShowcase.tsx:41`, `OperationsShowcase.tsx:58` | Existe | W-64 (paso 4) | `admin, cocina, operador` |
| 6 | Verificación de pagos Yape/Plin con foto | `FeatureShowcase.tsx:43,55` | Existe | B-803, W-61 | `Yape/Plin con foto` |
| 7 | Tarjeta con Culqi en la web y en WhatsApp | `FeatureShowcase.tsx:53` | Existe | B-602, B-605; conexión autónoma X-008, W-814 | `Tarjetas con Culqi` |
| 8 | Tarjeta y Yape también en el kiosko | `FeatureShowcase.tsx:54,70`, `FAQ.tsx:33` | Existe | W-54 (prueba con Culqi de prueba) | `Yape tambi[eé]n en el kiosko` |
| 9 | Boleta y factura automáticas, notas de crédito, anulaciones y validación de RUC | `FeatureShowcase.tsx:56-57`, `OperationsShowcase.tsx:46` | Existe | B-603, B-604; conexión autónoma W-815 | `notas de cr[eé]dito` |
| 10 | Libro de Reclamaciones | `OperationsShowcase.tsx:46` | Existe | W-64 | `Libro de Reclamaciones` |
| 11 | Ticket y boleta impresos en el kiosko (PC con Windows e impresora térmica) | `FeatureShowcase.tsx:71`, `FAQ.tsx:33` | Parcial | K-14, K-15, K-16 | `impresora t[eé]rmica` |
| 12 | Bot de WhatsApp con IA (Claude) que toma pedidos completos a cualquier hora | `FeatureShowcase.tsx:78-85`, `BotShowcase.tsx`, `Hero.tsx`, `FAQ.tsx:48` | Parcial | Tramo E: B-501…B-520, B-811, B-808 (cumplida cuando cierre B-519) | `Toma el pedido completo por chat` |
| 13 | Tu equipo toma el control del chat (takeover) | `FeatureShowcase.tsx:84`, `BotShowcase.tsx:31` | Existe | Tramo E | `takeover` |
| 14 | El bot nunca inventa precios: valida contra tu catálogo | `FeatureShowcase.tsx:85`, `BotShowcase.tsx:37` | Existe | Tramo E (B-519 con la carta del cliente) | `inventa precios` |
| 15 | Carta con categorías, variantes, modificadores y fotos | `FeatureShowcase.tsx:22-28` | Existe | Carga autónoma: B-817, B-818, W-812 | `Variantes \(tama` |
| 16 | Stock que se actualiza solo | `FeatureShowcase.tsx:27` | Parcial | W-822 | `Stock que se actualiza solo` |
| 17 | Zonas por distrito o código postal con tarifa y tiempo; recojo en tienda | `FeatureShowcase.tsx:93-98` | Existe | W-62; mapa autónomo W-813 | `c[oó]digo postal` |
| 18 | Envíos con PedidosYa cuando no tienes repartidor | `FeatureShowcase.tsx:97`, `IntegrationLogos.tsx:54`, `TrustStrip.tsx:13` | Existe | B-601 | `Env[ií]os con PedidosYa` |
| 19 | Los clientes guardan varias direcciones y ven el estado de su pedido | `FeatureShowcase.tsx:99-100` | Existe | — | `varias direcciones` |
| 20 | Google Maps para direcciones, cobertura y costo de envío | `IntegrationLogos.tsx:72` | Existe | Clave por API: X-005, X-008 (decisión D+-6) | `Google Maps` |
| 21 | Cupones (% o monto fijo), por categoría o producto, con vencimiento y límite de usos | `FeatureShowcase.tsx:110-112` | Existe | — | `Vencimiento y l[ií]mite de usos` |
| 22 | Saldo a favor opcional en cada compra | `FeatureShowcase.tsx:113`, `BotShowcase.tsx:27` | Existe | Antes y después: B-821, W-817 | `saldo a favor` |
| 23 | Repetir el último pedido en dos toques | `FeatureShowcase.tsx:114` | Existe | — | `dos toques` |
| 24 | Meta de ventas del día (maqueta del Hub) | `FeatureShowcase.tsx:186` | Por construir | B-822, W-819 | `Meta del d[ií]a` |
| 25 | Cocina, lotes de producción y conteos diarios | `OperationsShowcase.tsx:28` | Existe | W-64 | `lotes de producci[oó]n` |
| 26 | Inventario por almacén con alertas de mínimos; recetas con escandallo; descuento automático de insumos | `OperationsShowcase.tsx:34` | Existe | W-64 | `escandallo` |
| 27 | Finanzas: caja con cierre, P&L, flujo de caja, impuestos, compras y planilla | `OperationsShowcase.tsx:40` | Existe | W-64 | `flujo de caja` |
| 28 | Exporta tus reportes en CSV | `OperationsShowcase.tsx:40` | Parcial | B-823 (encender Reportes v2 en el perfil base) | `reportes en CSV` |
| 29 | Reportes por día, canal, hora y categoría; productos top; heatmap; estadísticas de cupones | `OperationsShowcase.tsx:52` | Existe | W-64 | `heatmap` |
| 30 | Vouchers de compensación | `OperationsShowcase.tsx:64` | Existe | — | `vouchers de compensaci[oó]n` |
| 31 | Tus clientes son tuyos (base propia y exportable) | `ui/TrustBadges.tsx:14`, `ComparisonTable.tsx`, `CaseStudy.tsx`, `BotShowcase.tsx:27` | Parcial | B-820, W-818 (exportación completa) | `clientes son tuyos` |
| 32 | Sin comisiones por pedido | `BenefitsGrid.tsx:29`, `ui/TrustBadges.tsx:6`, `src/app/layout.tsx:22` | Servicio | Decisión del dueño (modelo comercial) | `sin comisiones` |
| 33 | «Lo configuramos nosotros con lo que nos envíes» | `HowItWorks.tsx:21` | Existe | L-14 (los dos caminos, cuando exista el alta autónoma) | `lo configuramos nosotros` |
| 34 | Instalación acompañada; onboarding, soporte y capacitación en Perú; demostración guiada | `FinalCTA.tsx:9-10`, `src/app/precios/page.tsx:40-43`, `ui/TrustBadges.tsx:18` | Servicio | Decisión del dueño: quién atiende (L-12) | `Instalaci[oó]n acompa[nñ]ada` |
| 35 | Creado y probado en un restaurante real | `Hero.tsx:64`, `CaseStudy.tsx:67` | Existe | — | `restaurante real` |
| 36 | Solo Perú: Culqi, Yape, Plin y SUNAT | `FAQ.tsx:51-53` | Existe | — | `Solo funciona en Peru` |
| 37 | El dinero va directo a tu cuenta | `FeatureShowcase.tsx:51`, `FAQ.tsx:38` | Existe | — | `directo a tu cuenta` |
| 38 | Formulario de demo y alta con 3 preguntas | `src/app/contacto/FormularioSolicitud.tsx`, `src/lib/solicitud.ts` | Existe | L-13 (hecha); «Crear mi tienda» con consola: X-007 | `Cu[aá]ndo quieres empezar` |

### Promesas que aún no están en la landing

Se añadirán a la tabla de arriba, con patrón, cuando se escriban en la landing.

| Promesa | Estado | Tarea |
|---|---|---|
| Programa de referidos | Existe en el producto (B-812, W-805, W-807) | L-11 la pone en la landing; entonces sale `referid` de `promesas-prohibidas.txt` |
| Sin permanencia | Servicio y procedimiento de baja | X-011 y contrato (D+-9) → L-12 |
| Tus datos son tuyos y te los llevas cuando quieras | Por construir | B-820, W-818 → L-12 |
| Qué pasa si te vas | Por construir | X-011 → L-12 |
| Dónde están tus datos | Por decidir | Decisión D+-5 → L-12 |
| Creas tu tienda tú mismo con un asistente | Por construir | W-808…W-816, X-006 → L-14 |
