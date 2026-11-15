/**
 * Planes y costos de Pedily (decisiones del dueño del 14 y 15-nov-2026).
 *
 * - Precios al mes con IGV incluido. 0 % de comisión al restaurante y al
 *   comensal.
 * - El plan de S/ 249 NO trae el bot de WhatsApp; el bot va desde S/ 499.
 * - Los cupos de conversaciones del bot NO se publican hasta medirlos.
 * - Alta gratis si el restaurante se queda 6 meses; si se va antes, paga la
 *   parte proporcional del alta. Pago anual = 2 meses gratis.
 * - Qué incluye exactamente el plan de S/ 999 está POR DECIDIR (propuesta:
 *   kiosko + cupo mayor del bot). Si el dueño cambia algo, se cambia aquí.
 *
 * Los costos de terceros son los precios públicos de cada proveedor, con su
 * fuente en `reports/Pedily revisión de propuestas.md` (14-nov-2026).
 */

export interface Plan {
  id: "tienda" | "whatsapp" | "completo";
  nombre: string;
  precioMensual: number;
  paraQuien: string;
  incluye: string[];
  conBot: boolean;
  destacado?: boolean;
}

export const PLANES: Plan[] = [
  {
    id: "tienda",
    nombre: "Tienda",
    precioMensual: 249,
    paraQuien: "Para empezar a vender por tu web sin comisión.",
    conBot: false,
    incluye: [
      "Tu tienda web con tu marca, tu carta y tu pedido online",
      "Panel de pedidos con aviso al instante y vista de cocina",
      "Cobro con tarjeta y Yape en tu cuenta Culqi",
      "QR de Yape o Plin con verificación del comprobante",
      "Boletas y facturas SUNAT automáticas (con tu Nubefact)",
      "Zonas de reparto con su tarifa, y recojo en tienda",
      "Cupones, referidos y saldo a favor, si los enciendes",
    ],
  },
  {
    id: "whatsapp",
    nombre: "Tienda + WhatsApp",
    precioMensual: 499,
    paraQuien: "Para que WhatsApp tome pedidos solo, también en hora punta.",
    conBot: true,
    destacado: true,
    incluye: [
      "Todo lo del plan Tienda",
      "Asistente de pedidos por WhatsApp con IA: arma el pedido, cobra y lo manda a cocina",
      "Te pasa el chat cuando el cliente pide hablar con una persona",
      "Incluye un cupo mensual de conversaciones; te decimos cuál según tu volumen",
    ],
  },
  {
    id: "completo",
    nombre: "Completo",
    precioMensual: 999,
    paraQuien: "Para el local con mucho movimiento y autoservicio.",
    conBot: true,
    incluye: [
      "Todo lo del plan Tienda + WhatsApp",
      "Kiosko de autoservicio en tu local",
      "Un cupo mayor de conversaciones del asistente",
    ],
  },
];

/** Meses que se pagan al elegir el pago anual (2 meses gratis). */
export const MESES_PAGADOS_ANUAL = 10;
export const MESES_PERMANENCIA_ALTA_GRATIS = 6;

export function precioAnual(plan: Plan): number {
  return plan.precioMensual * MESES_PAGADOS_ANUAL;
}

/**
 * «S/ 249», «S/ 2 490» o «S/ 12,50»: miles con espacio fino y decimales con
 * coma, igual que «3,44 %» en el resto de la página. No depende del idioma del
 * navegador (es-PE en Chrome daba «1,800», que se confunde con un decimal).
 */
export function soles(monto: number, decimales = 0): string {
  const [entero, fraccion] = Math.abs(monto).toFixed(decimales).split(".");
  const miles = entero.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
  return `${monto < 0 ? "−" : ""}S/ ${miles}${fraccion ? `,${fraccion}` : ""}`;
}

/** Lo que el restaurante paga aparte, directo a cada proveedor. */
export const COSTOS_APARTE = [
  {
    proveedor: "Culqi",
    que: "Por cada venta con tarjeta o Yape automático",
    precio: "3,44 % + US$ 0,20 por venta",
    fuente: "https://culqi.com/precios/",
  },
  {
    proveedor: "Nubefact",
    que: "Tus boletas y facturas electrónicas",
    precio: "Desde S/ 70 al mes (hasta 500 comprobantes)",
    fuente: "https://www.nubefact.com/precios",
  },
  {
    proveedor: "Meta (WhatsApp)",
    que: "Los mensajes de WhatsApp, a tu tarjeta (planes con asistente)",
    precio: "1.000 mensajes de servicio gratis al mes; luego S/ 0,0998 por mensaje",
    fuente: "https://developers.facebook.com/docs/whatsapp/pricing",
  },
] as const;

/** Comisión de Culqi para la calculadora (fuente: culqi.com/precios). */
export const CULQI_PORCENTAJE = 3.44;
export const CULQI_FIJO_USD = 0.2;
/** Tipo de cambio usado en las estimaciones (BCRP, 12-nov-2026). */
export const SOLES_POR_DOLAR = 3.41;
