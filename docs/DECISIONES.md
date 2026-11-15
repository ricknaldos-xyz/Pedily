# Decisiones del dueño que afectan a la landing

Estado al 15-nov-2026 (tareas L-17 y L-18 del plan). Fuente: `pedily/_notas/plan/BITACORA.md`, «Decisiones del dueño» (14 y 15-nov). Todo lo comercial vive en un solo sitio del código: `src/lib/planes.ts` (planes, costos aparte) y `src/lib/site.ts` (demos, empresa, restaurante de origen, fundadores).

| # | Decisión | Respuesta | Cómo se aplica |
|---|---|---|---|
| 1 | Precios | **S/ 249 / 499 / 999 al mes, IGV incluido, 0 % de comisión al restaurante y al comensal** (14-nov). Pago anual = 2 meses gratis (15-nov). | Tres tarjetas en la portada y en `/precios` (`PLANES`). El de S/ 249 **no** trae el asistente de WhatsApp; va desde S/ 499. Los cupos de conversaciones **no** se publican: «incluye un cupo mensual de conversaciones; te decimos cuál según tu volumen». **Por decidir:** qué incluye exactamente el plan de S/ 999 (hoy: kiosko + cupo mayor, propuesta). |
| 2 | Alta y permanencia | **Alta gratis si se queda 6 meses; si se va antes, paga la parte proporcional del alta** (14-nov). | Fuera «cancela cuando quieras» y cualquier «sin permanencia». **Falta:** el valor del alta (los términos remiten «al contrato») y la revisión del abogado. |
| 3 | Lo que paga aparte el restaurante | **Culqi 3,44 % + US$ 0,20 por venta; Nubefact desde S/ 70/mes; mensajes de WhatsApp que Meta cobra a su tarjeta.** Pedily nunca toca el dinero. | Recuadro «Lo que pagas aparte» bajo los precios y FAQ, con enlace a la tarifa de cada proveedor (`COSTOS_APARTE`). Fuentes en `reports/Pedily revisión de propuestas.md`. |
| 4 | Caso del restaurante de origen | **Se puede nombrar como el restaurante donde nació y se probó Pedily, SIN NINGUNA CIFRA** (15-nov). | El nombre vive solo en `RESTAURANTE_ORIGEN` (`src/lib/site.ts`). `scripts/comprobar-promesas.sh` falla si aparece en otro archivo de `src/`/`public/`, si se escribe incompleto o si su línea lleva números (en todo el repo, docs incluidos). |
| 5 | Empresa operadora | **Hub de Innovacion Digital SAC** (14-nov). RUC, domicilio fiscal y correos llegan al final. | `EMPRESA` en `src/lib/site.ts`; RUC y domicilio en `null` no se pintan (ni su etiqueta). Los legales llevan la fecha del 15-nov y siguen pendientes de abogado. |
| 6 | Programa de fundadores | **Sí** (15-nov). Condiciones **propuestas** por el coordinador: 10 cupos, precio congelado 24 meses, alta gratis, acompañamiento directo, a cambio de permiso para contar su caso. | `FUNDADORES` en `src/lib/site.ts`. Sin contador de cupos restantes. El dueño puede cambiar cualquier valor ahí. |
| 7 | Bot de demostración por WhatsApp | **Sí, público** (15-nov); número nuevo y alta en Meta a cargo del dueño. | Botón «Prueba el bot por WhatsApp» solo si existe `NEXT_PUBLIC_DEMO_BOT_WHATSAPP`; si no, no se pinta (nada de «próximamente»). |
| 8 | Tienda de demostración | Publicada en `https://pedily-demo-web.vercel.app` (W-52). | «Mira una tienda de ejemplo» en el hero, la cabecera y el pie (`DEMO.tiendaUrl`). |
| 9 | Nombre comercial | Sin cambio: se mantiene el nombre de trabajo. | — |

Reglas permanentes:

- Nada de «en preparación», «próximamente» ni «pronto»: lo prometido existe o se quita (registro en `docs/PROMESAS.md`).
- No inventar clientes, testimonios, cifras ni logos.
- No decir «nadie más lo hace»: Quick eat! ya junta bot, kiosko y SUNAT. Lo que se comunica es lo comprobable: precio visible, 0 % de comisión al restaurante y al comensal, asistente que toma el pedido completo y cobra, alta guiada sin reunión obligatoria, carta cargada con IA desde una foto, vender desde el día 1 con QR de Yape/Plin, Pedily no toca el dinero, empresa peruana.
- Recompensas (saldo a favor) y el resto de «Opciones de tu tienda»: **apagadas por defecto**, las enciende cada restaurante.
- Medios de pago: Yape, tarjeta y QR. **Sin efectivo.**
