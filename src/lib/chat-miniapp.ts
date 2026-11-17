/**
 * Las dos piezas del plan con asistente (decisión del dueño, 16-nov):
 * el chat con IA y la mini-app que se abre desde el mismo chat.
 *
 * Regla del producto: «chat para conversar, mini-app para comprar»
 * (`pedily-backend/src/bot/ai/prompt/core-prompt.ts:69-71`). La dirección y el
 * pago van en la mini-app.
 *
 * `ref` = fila del inventario vendible
 * (`research_notes/Pedily landing v2 2026-11-15/02_inventario_vendible.md`).
 * La mini-app está probada con pruebas automáticas y en local (inventario 2.5,
 * 2.6: «Pruebas»); aquí se describe la función, sin cifras de uso.
 */

export const REGLA_CHAT_MINIAPP = "Chat para conversar, mini-app para comprar";

export const PIEZA_CHAT = {
  nombre: "El chat",
  bajada: "El asistente con IA conversa por WhatsApp.",
  items: [
    { texto: "Entiende como escribe tu cliente, también con faltas y notas de voz", ref: "2.1, 2.4, 2.11" },
    { texto: "Recomienda acompañamientos y bebidas, y responde dudas de tu local", ref: "2.18, 2.19" },
    { texto: "Arma el pedido con tu carta y tus precios, y pregunta cremas y tamaño", ref: "2.1, 2.2" },
    { texto: "Le abre la mini-app con el botón «Ver carta»", ref: "2.5" },
  ],
} as const;

export const PIEZA_MINIAPP = {
  nombre: "La mini-app",
  bajada: "Se abre dentro de WhatsApp, sin descargar nada, con la marca de tu restaurante.",
  items: [
    { texto: "Tu carta con fotos, tamaños y cremas", ref: "2.5" },
    { texto: "Carrito unido al chat: empiezas escribiendo y terminas tocando", ref: "2.6" },
    { texto: "Delivery con su dirección, o recojo en tu local", ref: "2.7" },
    { texto: "Programar para más tarde, si lo enciendes", ref: "12.2", opcion: true },
    { texto: "Pago con Yape, tarjeta o el QR de Yape o Plin de tu local", ref: "2.7" },
  ],
} as const;
