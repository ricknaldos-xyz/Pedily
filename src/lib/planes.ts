/**
 * Planes y costos de Pedily. Fuente de verdad: decisiones del 15-nov-2026
 * (`pedily/_notas/plan/D-decisiones-2026-11-15.md`). Si el dueño cambia algo,
 * se cambia allí y aquí; la landing, la FAQ, los legales y el JSON-LD leen de
 * este archivo.
 *
 * - Precios al mes con IGV incluido. 0 % de comisión al restaurante y al
 *   comensal. Anual = 10 meses pagados.
 * - Tienda (S/ 249) NO trae el asistente de WhatsApp; viene desde S/ 499.
 * - El QR de Yape o Plin del local con verificación del comprobante vuelve al
 *   plan Tienda (LV2-E, 15-nov): ficha G-09, unida a `main` de pedily-web
 *   (`8cfb1d1`: `components/features/checkout/PaymentForm/PaymentForm.tsx:46-54`,
 *   `components/shared/ManualQrPay`) y pedily-backend (`05ffea7`:
 *   `src/order/web-qr-payment.ts`, `web-qr-proof.service.ts`). Aparece cuando el
 *   restaurante enciende `PLIN_MANUAL` y sube su QR o número de cobro.
 * - Los cupos de conversaciones del asistente NO se publican en cifras hasta
 *   medirlos; el de Completo es 3 veces el de Tienda + WhatsApp.
 * - Alta: S/ 490 (Tienda y Tienda + WhatsApp) o S/ 790 (Completo), gratis si
 *   el restaurante se queda 6 meses; si se va antes paga
 *   alta × (6 − meses pagados) / 6, redondeado a sol entero.
 * - Varios locales en una cuenta no entra en ningún plan hasta construirlo.
 *
 * Los costos de terceros son los precios públicos de cada proveedor, con su
 * fuente en `reports/Pedily revisión de propuestas.md` (14-nov-2026).
 */

export interface Plan {
  id: "tienda" | "whatsapp" | "completo";
  nombre: string;
  precioMensual: number;
  /** Costo del alta (instalación) en soles; gratis con 6 meses de permanencia. */
  alta: number;
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
    alta: 490,
    paraQuien: "Para empezar a vender por tu web sin comisión.",
    conBot: false,
    incluye: [
      "Tu tienda web con tu marca, tu carta y tu pedido online",
      "Panel de pedidos con aviso al instante y pantalla de cocina",
      "Cobro con tarjeta y Yape en tu cuenta Culqi",
      "QR de tu Yape o Plin en la tienda web, con verificación del comprobante en el panel",
      "Boletas y facturas SUNAT automáticas (con tu Nubefact)",
      "Zonas de reparto con su tarifa, y recojo en tienda",
      "Pedidos programados para la hora que elija tu cliente",
      "Cupones, referidos y saldo a favor, si los enciendes",
      "Caja con cierre del día, inventario y recetas, y reportes",
    ],
  },
  {
    id: "whatsapp",
    nombre: "Tienda + WhatsApp",
    precioMensual: 499,
    alta: 490,
    paraQuien: "Para que WhatsApp tome pedidos solo, también en hora punta.",
    conBot: true,
    destacado: true,
    incluye: [
      "Todo lo del plan Tienda",
      "Asistente de WhatsApp con IA que conversa, recomienda y arma el pedido",
      "Mini-app con tu marca dentro de WhatsApp, sin descargar nada: carta con fotos, carrito unido al chat, delivery o recojo y programar",
      "Cobro en la mini-app con Yape o tarjeta, o con el QR de tu Yape o Plin",
      "Te pasa el chat cuando el cliente pide hablar con una persona",
      "Campañas por WhatsApp con plantillas, solo a quien dio su permiso",
      "Incluye un cupo mensual de conversaciones; te decimos cuál según tu volumen",
    ],
  },
  {
    id: "completo",
    nombre: "Completo",
    precioMensual: 999,
    alta: 790,
    paraQuien: "Para el local con salón, mucho movimiento y autoservicio.",
    conBot: true,
    incluye: [
      "Todo lo del plan Tienda + WhatsApp",
      "Kiosko de autoservicio: licencia para 1 pantalla (el equipo lo compras tú)",
      "QR de mesa: tu cliente pide y paga desde la mesa",
      "Un cupo de conversaciones del asistente 3 veces mayor",
      "Atención prioritaria: te respondemos el mismo día hábil",
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
 * Lo que paga del alta quien se va antes de 6 meses:
 * alta × (6 − meses pagados) / 6, redondeado a sol entero. Con 6 meses o más,
 * 0. Ej.: Tienda, se va tras 2 meses → 490 × 4/6 = S/ 327.
 */
export function altaProporcional(alta: number, mesesPagados: number): number {
  const faltan = Math.max(0, MESES_PERMANENCIA_ALTA_GRATIS - Math.max(0, mesesPagados));
  return Math.round((alta * faltan) / MESES_PERMANENCIA_ALTA_GRATIS);
}

/** Ejemplo que se publica junto al alta (FAQ, precios y términos). */
export const EJEMPLO_ALTA = {
  plan: "Tienda",
  alta: 490,
  mesesPagados: 2,
} as const;

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
