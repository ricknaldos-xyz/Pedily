/**
 * Herramientas gratis (B5 del plan del 15-nov-2026): calculadoras para
 * restaurantes que sirven para buscadores y llevan a Pedily.
 *
 * Regla: toda cifra de terceros vive aquí con su fuente oficial y la fecha en
 * que se leyó. Las páginas citan estas fuentes al pie. Si una tasa cambia, se
 * cambia aquí y todas las páginas se actualizan.
 */
import type { Pregunta } from "./faq";

export const SITE_URL = "https://pedily.com";

export interface Fuente {
  nombre: string;
  url: string;
  /** Qué se tomó de esa fuente. */
  dato: string;
}

export interface Herramienta {
  slug: string;
  /** Título visible (H1) y nombre en el índice. */
  titulo: string;
  /** <title> de la página (≤ 60 caracteres aprox.). */
  tituloSeo: string;
  /** Meta description (≤ 160 caracteres aprox.). */
  descripcion: string;
  /** Texto corto para tarjetas y enlaces. */
  resumen: string;
  fuentes: Fuente[];
  preguntas: Pregunta[];
}

export const LEIDO_EL = "15 de noviembre de 2026";

// ---------------------------------------------------------------------------
// IGV de restaurantes MYPE
// ---------------------------------------------------------------------------

/**
 * Tasas por año para MYPE de restaurantes, hoteles y alojamientos turísticos
 * que cumplen los requisitos (Ley 31556 modificada por la Ley 32219). El IGV
 * del 8 % (2026) y 12 % (2027) está en la Ley 32219; el IPM de 2,5 % y 3 % y
 * la tasa aplicable de 10,5 % y 15 % están en la tabla de SUNAT. Desde 2028 la
 * ley no prevé tasa especial: se aplica la general (18 %).
 */
export interface TasaAnual {
  anio: string;
  igv: number;
  ipm: number;
  total: number;
  nota?: string;
}

export const TASAS_MYPE_RESTAURANTE: TasaAnual[] = [
  { anio: "2026", igv: 8, ipm: 2.5, total: 10.5 },
  { anio: "2027", igv: 12, ipm: 3, total: 15 },
  {
    anio: "2028",
    igv: 14.5,
    ipm: 3.5,
    total: 18,
    nota: "Termina la tasa especial: se aplica la general, salvo que una nueva ley la prorrogue.",
  },
];

/** Tasa general (IGV + IPM) por año, Ley 32387 según SUNAT. */
export const TASAS_GENERALES: TasaAnual[] = [
  { anio: "2026", igv: 15.5, ipm: 2.5, total: 18 },
  { anio: "2027", igv: 15, ipm: 3, total: 18 },
  { anio: "2028", igv: 14.5, ipm: 3.5, total: 18 },
];

export const REQUISITOS_MYPE = [
  "Tu actividad principal es restaurante (o hotel o alojamiento turístico).",
  "Eres micro o pequeña empresa: ventas anuales de hasta 1700 UIT en los 12 meses anteriores.",
  "Al menos el 70 % de tus ingresos viene de esa actividad.",
  "No tienes vinculación económica con otras empresas o grupos económicos.",
] as const;

const FUENTE_SUNAT_MYPE: Fuente = {
  nombre: "SUNAT · Reducción del IGV para restaurantes, hoteles y alojamientos turísticos",
  url: "https://orientacion.sunat.gob.pe/reduccion-del-igv-para-restaurantes-hoteles-y-alojamiento-turisticos-1",
  dato: "Tabla 2026 (IGV 8 % + IPM 2,5 % = 10,5 %) y 2027 (IGV 12 % + IPM 3 % = 15 %); requisitos (1700 UIT, 70 % de ingresos, sin vinculación) y pérdida de la tasa especial (18 %).",
};
const FUENTE_LEY_32219: Fuente = {
  nombre: "Ley 32219 (El Peruano, 29-dic-2024)",
  url: "https://busquedas.elperuano.pe/dispositivo/NL/2357993-3",
  dato: "IGV especial de 8 % en 2025 y 2026 y de 12 % del 1 de enero al 31 de diciembre de 2027.",
};
const FUENTE_SUNAT_IGV: Fuente = {
  nombre: "SUNAT · Concepto, tasa y operaciones gravadas del IGV",
  url: "https://orientacion.sunat.gob.pe/node/1737",
  dato: "Tasa general de 18 % y reparto IGV/IPM por año según la Ley 32387 (2026: 15,5 % + 2,5 %; 2027: 15 % + 3 %; 2028: 14,5 % + 3,5 %).",
};

// ---------------------------------------------------------------------------
// Mensajes de WhatsApp (Meta)
// ---------------------------------------------------------------------------

/** Tarifas de Meta para Perú en soles, sin impuestos (leídas el 15-nov-2026). */
export const META = {
  servicioGratisMes: 1000,
  servicio: 0.0998,
  utilidad: 0.0998,
  marketing: 0.2339,
} as const;

const FUENTE_META_PRECIOS: Fuente = {
  nombre: "Meta · Pricing on the WhatsApp Business Platform",
  url: "https://developers.facebook.com/docs/whatsapp/pricing/",
  dato: "Desde el 1-oct-2026, 1.000 mensajes de servicio gratis al mes por número; desde el 1.001 se cobran. Las plantillas de utilidad y marketing se cobran por mensaje.",
};
const FUENTE_META_TARIFA: Fuente = {
  nombre: "WhatsApp Business · Tarifas de la plataforma (Perú, en soles)",
  url: "https://whatsappbusiness.com/es-la/products/platform-pricing/",
  dato: "Perú: S/ 0,0998 por mensaje de servicio o de utilidad y S/ 0,2339 por mensaje de marketing.",
};

// ---------------------------------------------------------------------------
// Culqi (para comparar con la venta propia)
// ---------------------------------------------------------------------------

const FUENTE_CULQI: Fuente = {
  nombre: "Culqi · Precios",
  url: "https://culqi.com/precios/",
  dato: "3,44 % por venta más US$ 0,20 fijos por venta online; comisiones inafectas a IGV.",
};
const FUENTE_BCRP: Fuente = {
  nombre: "BCRP · Tipo de cambio",
  url: "https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PD04640PD-PD04639PD/json/2026-11-01/2026-11-14",
  dato: "S/ 3,41 por dólar (tipo de cambio venta del 12-nov-2026) para pasar los US$ 0,20 de Culqi a soles.",
};

// ---------------------------------------------------------------------------
// Catálogo
// ---------------------------------------------------------------------------

export const HERRAMIENTAS: Herramienta[] = [
  {
    slug: "calculadora-comision-delivery",
    titulo: "Calculadora de comisión de apps de delivery",
    tituloSeo: "Calculadora de comisión de apps de delivery | Pedily",
    descripcion:
      "Calcula cuánto pagas al mes en comisiones de apps de delivery y cuánto te quedaría vendiendo esos pedidos por tu canal propio. Gratis, para restaurantes en Perú.",
    resumen: "Cuánto se lleva la app al mes y cuánto ahorras con venta propia.",
    fuentes: [FUENTE_CULQI, FUENTE_BCRP],
    preguntas: [
      {
        pregunta: "¿Qué comisión cobran las apps de delivery a los restaurantes?",
        respuesta:
          "La fija cada app en su contrato con el restaurante y puede cambiar según el plan, la zona o si la app pone el repartidor. Por eso la calculadora te pide la tuya: búscala en tu contrato o en tu liquidación.",
      },
      {
        pregunta: "¿La comisión de la app lleva IGV?",
        respuesta:
          "Es un servicio que te facturan, así que normalmente viene con IGV aparte. Marca la casilla si en tu factura la comisión lleva IGV; si puedes usarlo como crédito fiscal depende de tu régimen tributario.",
      },
      {
        pregunta: "¿Cuánto cuesta vender por un canal propio?",
        respuesta:
          "Una cuota fija del sistema que uses más la comisión del medio de pago. En la calculadora usamos el plan de Pedily que elijas y la tarifa pública de Culqi (3,44 % + US$ 0,20 por venta, inafecta a IGV).",
      },
    ],
  },
  {
    slug: "calculadora-igv-restaurantes",
    titulo: "Calculadora de IGV para restaurantes MYPE 2026–2027",
    tituloSeo: "IGV restaurantes MYPE 2027: de 10,5 % a 15 % | Calculadora",
    descripcion:
      "La tasa especial para restaurantes MYPE sube de 10,5 % en 2026 a 15 % en 2027 (Ley 32219, SUNAT). Calcula cuánto impuesto pagarás y cuánto ajustar tus precios.",
    resumen: "La tasa sube de 10,5 % a 15 % en 2027: cuánto te cambia.",
    fuentes: [FUENTE_SUNAT_MYPE, FUENTE_LEY_32219, FUENTE_SUNAT_IGV],
    preguntas: [
      {
        pregunta: "¿Cuánto IGV paga un restaurante MYPE en 2027?",
        respuesta:
          "Si cumple los requisitos, 15 % en total: 12 % de IGV (Ley 32219) más 3 % de Impuesto de Promoción Municipal, según la tabla de SUNAT. En 2026 es 10,5 % (8 % + 2,5 %).",
      },
      {
        pregunta: "¿Qué pasa en 2028?",
        respuesta:
          "La Ley 32219 fija la tasa especial solo hasta el 31 de diciembre de 2027. Desde 2028 se aplica la tasa general de 18 %, salvo que una nueva ley la prorrogue.",
      },
      {
        pregunta: "¿Quién puede usar la tasa especial?",
        respuesta:
          "Micro y pequeñas empresas cuya actividad principal es restaurante, hotel o alojamiento turístico, con ventas anuales de hasta 1700 UIT, al menos el 70 % de sus ingresos en esa actividad y sin vinculación económica con otras empresas. Si dejas de cumplirlo, pagas 18 % desde el mes siguiente.",
      },
    ],
  },
  {
    slug: "costo-mensajes-whatsapp",
    titulo: "Calculadora del costo de mensajes de WhatsApp",
    tituloSeo: "Costo de mensajes de WhatsApp Business en Perú | Calculadora",
    descripcion:
      "Desde octubre de 2026 Meta cobra los mensajes de servicio después de 1.000 gratis al mes. Calcula cuánto pagaría tu restaurante por pedidos, avisos y campañas.",
    resumen: "Cuánto cobra Meta al mes por tus chats, avisos y campañas.",
    fuentes: [FUENTE_META_PRECIOS, FUENTE_META_TARIFA],
    preguntas: [
      {
        pregunta: "¿Cuánto cuesta un mensaje de WhatsApp Business en Perú?",
        respuesta:
          "Con la plataforma de WhatsApp Business (la API), Meta cobra en Perú S/ 0,0998 por mensaje de servicio o de utilidad y S/ 0,2339 por mensaje de marketing. Los primeros 1.000 mensajes de servicio de cada mes son gratis por número.",
      },
      {
        pregunta: "¿Qué es un mensaje de servicio?",
        respuesta:
          "La respuesta del negocio cuando el cliente le escribe primero, en las 24 h siguientes a su último mensaje. Los avisos con plantilla (por ejemplo, «tu pedido salió») son de utilidad, y las promociones son de marketing.",
      },
      {
        pregunta: "¿Los precios de Meta incluyen IGV?",
        respuesta:
          "La tarifa publicada no lo dice. Según tu cuenta, Meta puede sumar impuestos en la factura; revisa la tuya.",
      },
    ],
  },
];

export function herramienta(slug: string): Herramienta {
  const h = HERRAMIENTAS.find((x) => x.slug === slug);
  if (!h) throw new Error(`Herramienta desconocida: ${slug}`);
  return h;
}
