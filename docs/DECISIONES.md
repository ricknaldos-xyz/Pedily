# Decisiones del dueño que afectan a la landing

Estado al 11-nov-2026 (tarea L-00 del plan). Mientras una decisión diga «sin respuesta», las tareas L-01 a L-08 aplican el texto por defecto prudente que fija el plan (`pedily/_notas/plan/02_plan_web_kiosko.md`, bloque I).

| # | Decisión | Respuesta | Qué se aplica mientras tanto |
|---|---|---|---|
| 1 | Precios | **Sin respuesta: se aplica el texto por defecto.** | No se publica ningún precio. Un solo bloque «Un solo sistema, a la medida de tu restaurante» con botón «Pide tu cotización» (L-02). Recomendación del plan: no publicar precios hasta medir costos en la demo. |
| 2 | Nombre comercial del producto que muestra la landing | **Sin respuesta: se aplica el texto por defecto.** | La landing conserva el nombre de trabajo que ya tenía; no se escribe ningún nombre nuevo. El mensaje por defecto de WhatsApp (`src/lib/site.ts`) cambiará con esta decisión (L-08). |
| 3 | Caso de cliente: si el restaurante original autoriza ser nombrado y con qué cifras | **Sin respuesta: se aplica el texto por defecto.** | Sin permiso escrito, el caso se publica sin nombre y sin cifras no confirmadas («Probado en un restaurante real», un solo local) (L-04). |
| 4 | Razón social del operador y datos de contacto reales (WhatsApp, correo) | **Sin respuesta: se aplica el texto por defecto.** | Sin número configurado no se pinta ningún botón de WhatsApp; sin correo, no se muestra correo. La razón social de los términos queda marcada como pendiente (L-08). Obligatorio antes de publicar. |
| 5 | Qué canales se ofrecen ya | **Sin respuesta: se aplica el texto por defecto.** | Web y panel, seguro; bot de WhatsApp, cuando acabe la fase 5 del plan; kiosko, solo con PC con Windows e impresora térmica. La landing los presenta como opciones de la instalación acompañada, sin «próximamente». |

Decisiones ya tomadas en otras partes del plan que también tocan la landing (`pedily/_notas/plan/BITACORA.md`):

- Recompensas (saldo del 3 %): **apagadas por defecto**, se encienden por restaurante. La landing solo puede presentarlas como opción («si quieres, saldo a favor»).
- Medios de pago: Yape, tarjeta y QR. **Sin efectivo** (plan maestro §1).
