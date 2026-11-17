/**
 * Preguntas frecuentes. Una sola fuente para la FAQ visible y para el JSON-LD
 * (FAQPage), que Google exige que coincidan.
 */
import { EMPRESA, FUNDADORES, RESTAURANTE_ORIGEN } from "./site";
import {
  altaProporcional,
  COMPLEMENTO_MESA,
  EJEMPLO_ALTA,
  MESES_PERMANENCIA_ALTA_GRATIS,
  PLANES,
  precioComplemento,
  soles,
} from "./planes";

const [TIENDA, WHATSAPP, COMPLETO] = PLANES;
const EJ_FALTAN = MESES_PERMANENCIA_ALTA_GRATIS - EJEMPLO_ALTA.mesesPagados;

export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

/**
 * Decisión del dueño (16-nov): la mini-app del plan con asistente se abre
 * dentro de WhatsApp (`pedily-web/app/wa/**`, inventario 2.5–2.7 y 12.2).
 * Sale en la FAQ general, en /precios y en /soluciones/asistente-whatsapp.
 */
export const PREGUNTA_DESCARGAR: Pregunta = {
  pregunta: "¿Mi cliente tiene que descargar algo?",
  respuesta: `No. Todo pasa en el WhatsApp que ya usa. El asistente conversa en el chat y, para elegir y pagar, le manda el botón «Ver carta»: se abre una mini-app con tu marca dentro de WhatsApp, sin descargar nada. Ahí ve tu carta con fotos, elige tamaños y cremas, encuentra en el carrito lo que ya pidió por chat, elige delivery o recojo (o, si lo enciendes, programar para más tarde) y paga con Yape, tarjeta o el QR de Yape o Plin de tu local. Viene en el plan ${WHATSAPP.nombre} (${soles(WHATSAPP.precioMensual)}) y en ${COMPLETO.nombre}. En la tienda web tampoco descarga nada: se abre en el navegador.`,
};

/**
 * Añadido 16-nov (`D-decisiones-2026-11-15.md`): carta digital por QR en todos
 * los planes (la carta web `/menu`, inventario 1.1) y QR de mesa que cobra
 * como complemento de +S/ 150 al mes (incluido en Completo).
 */
export const PREGUNTA_CARTA_QR: Pregunta = {
  pregunta: "¿Qué diferencia hay entre la carta digital por QR y el QR de mesa?",
  respuesta: `La carta digital por QR viene en todos los planes, desde ${soles(TIENDA.precioMensual)}: es un QR en tu local que abre tu carta web con fotos y precios, para verla sin pedir el PDF ni esperar la carta de papel. Lo generas tú desde el panel, en PNG o en PDF A4 listo para imprimir, con tu logo y tus colores. El ${COMPLEMENTO_MESA.nombre} va más allá: cada mesa tiene su QR, el comensal pide por rondas que llegan a cocina con el nombre de la mesa, ve la cuenta en vivo y paga desde su celular, todo junto, en partes iguales o sus platos. Es un complemento de ${precioComplemento()} en ${TIENDA.nombre} y ${WHATSAPP.nombre}, y viene incluido en ${COMPLETO.nombre}.`,
};

export const PREGUNTA_MESA_PRECIO: Pregunta = {
  pregunta: "¿Cuánto cuesta el QR de mesa que cobra?",
  respuesta: `${precioComplemento()} con IGV, sumado a ${TIENDA.nombre} (${soles(TIENDA.precioMensual)}) o a ${WHATSAPP.nombre} (${soles(WHATSAPP.precioMensual)}). En ${COMPLETO.nombre} (${soles(COMPLETO.precioMensual)}) ya viene incluido, junto con el kiosko. Sin comisión por pedido, como el resto de Pedily. La carta digital por QR, solo para ver la carta, viene en todos los planes sin costo extra.`,
};

/**
 * L-02 (16-nov): Pedily recibe los pedidos de Rappi y PedidosYa en el panel
 * (`B:src/order/marketplace/rappi/`, `B:src/order/marketplace/pedidosya-pos/`,
 * `W:components/dashboard/MarketplaceOrderAlarm.tsx`; PROMESAS filas 84–85).
 * Se conecta cuando cada app aprueba la integración del local.
 */
export const PREGUNTA_RAPPI_PEDIDOSYA: Pregunta = {
  pregunta: "¿También recibe pedidos de Rappi o PedidosYa?",
  respuesta:
    "Sí. Los pedidos de Rappi y PedidosYa entran al mismo panel y a la pantalla de cocina que los de tu web y tu WhatsApp. Los de Rappi llegan con una alarma y la cuenta atrás de 4 minutos que da Rappi para aceptar, y se pueden aceptar solos; los de PedidosYa los aceptas en PedidosYa como siempre y entran solos a tu panel. Asocias los productos de cada app con tu carta y un pedido de app nunca pide además tu motorizado. Se conecta cuando cada app aprueba la integración de tu local; la carta de cada app la sigues editando en esa app. Viene en todos los planes.",
};

/** Preguntas de /integraciones (también en su JSON-LD FAQPage). */
export const PREGUNTAS_INTEGRACIONES: Pregunta[] = [
  PREGUNTA_RAPPI_PEDIDOSYA,
  {
    pregunta: "¿Qué significa «se conecta cuando la app aprueba la integración»?",
    respuesta:
      "Rappi, PedidosYa, Izipay y los proveedores de terminales revisan cada integración antes de abrirla a un local. La parte de Pedily está construida; nosotros hacemos el trámite técnico contigo y la encendemos cuando el proveedor da el visto bueno a tu local. Hasta entonces sigues trabajando como hoy, sin perder nada.",
  },
  {
    pregunta: "¿Las integraciones cuestan aparte?",
    respuesta: `No cobramos comisión ni cargo por conectarlas: cada una viene en el plan que dice su ficha. Las apps de delivery, el reparto, los pagos, las impresoras, los archivos para tu contador, Google, Meta y TikTok vienen desde ${TIENDA.nombre} (${soles(TIENDA.precioMensual)}); la carta en el chat de WhatsApp, desde ${WHATSAPP.nombre}; la API y los webhooks, en ${COMPLETO.nombre}. Cada proveedor te cobra lo suyo directo, según tu contrato con él.`,
  },
  {
    pregunta: "¿Pedily toca mi dinero en Rappi, Izipay o el POS?",
    respuesta:
      "No. Rappi y PedidosYa te pagan como siempre, y Culqi, Izipay o tu terminal POS depositan en tu cuenta. Pedily solo recibe el aviso del cobro para marcar el pedido como pagado.",
  },
  {
    pregunta: "¿Qué recibe mi contador?",
    respuesta:
      "El TXT del Registro de Ventas para reemplazar la propuesta en SIRE, las mismas 33 columnas en Excel y CSV, el Registro de Compras en CSV y los asientos de ventas para Concar, Starsoft, Contasis o Siscont. Los asientos los ajusta tu contador a sus cuentas antes de importarlos.",
  },
  {
    pregunta: "¿Puedo conectar mis propios sistemas?",
    respuesta: `Sí, en el plan ${COMPLETO.nombre}: una API de lectura con llaves por restaurante y avisos firmados (webhooks) a la dirección que elijas en cada pedido, pago, comprobante y stock bajo, con documentación pública. La app de Pedily en Zapier se conecta cuando Zapier la aprueba.`,
  },
];

export const FAQS: Pregunta[] = [
  {
    pregunta: "¿Cuánto cuesta Pedily?",
    respuesta: `Tres planes al mes, con IGV incluido y 0 % de comisión por pedido al restaurante y al comensal: ${TIENDA.nombre}, ${soles(TIENDA.precioMensual)} (tienda web, carta digital por QR, panel completo, cocina, caja, cobros, boletas SUNAT, inventario, reportes, reparto y pedidos programados, sin asistente de WhatsApp); ${WHATSAPP.nombre}, ${soles(WHATSAPP.precioMensual)} (suma el asistente de WhatsApp con IA y las campañas); y ${COMPLETO.nombre}, ${soles(COMPLETO.precioMensual)} (suma kiosko, QR de mesa que cobra, 3 veces más conversaciones del asistente y atención prioritaria). El QR de mesa que cobra también se puede sumar a los otros dos planes por ${precioComplemento()}. Si pagas el año por adelantado, pagas 10 meses y usas 12.`,
  },
  {
    pregunta: "¿Qué pago aparte?",
    respuesta:
      "Lo que cobra cada proveedor, directo a él: Culqi, 3,44 % + US$ 0,20 por cada venta con tarjeta o Yape; Nubefact, desde S/ 70 al mes por tus boletas y facturas; y, si tienes el asistente, los mensajes de WhatsApp que Meta cobra a tu tarjeta (1.000 mensajes de servicio gratis al mes y luego S/ 0,0998 por mensaje; las campañas, S/ 0,2339 por mensaje). Son sus precios públicos de noviembre de 2026. El equipo del kiosko (pantalla, y PC e impresora si quieres ticket) lo compras tú. Si conectas otras apps o proveedores (Rappi, PedidosYa, Yango, Izipay o tu terminal POS), cada uno te cobra lo suyo, según tu contrato con él.",
  },
  {
    pregunta: "¿Cuánto cuesta el alta y hay permanencia?",
    respuesta: `El alta cuesta ${soles(TIENDA.alta)} en los planes ${TIENDA.nombre} y ${WHATSAPP.nombre}, y ${soles(COMPLETO.alta)} en ${COMPLETO.nombre} (incluye dejar configurados el kiosko y la impresora en remoto). Es gratis si te quedas al menos ${MESES_PERMANENCIA_ALTA_GRATIS} meses. Si te vas antes, pagas solo la parte de los meses que faltan, redondeada a sol entero. Ejemplo: ${EJEMPLO_ALTA.plan}, te vas tras ${EJEMPLO_ALTA.mesesPagados} meses → ${soles(EJEMPLO_ALTA.alta)} × ${EJ_FALTAN}/${MESES_PERMANENCIA_ALTA_GRATIS} = ${soles(altaProporcional(EJEMPLO_ALTA.alta, EJEMPLO_ALTA.mesesPagados))}. No hay ningún otro cargo por irte.`,
  },
  {
    pregunta: "¿Qué es el programa de fundadores?",
    respuesta: `Los primeros ${FUNDADORES.cupos} restaurantes entran con alta gratis sin condición de permanencia y con su precio congelado ${FUNDADORES.mesesPrecioCongelado} meses. A cambio, ${FUNDADORES.aCambio}.`,
  },
  {
    pregunta: "¿El dinero pasa por Pedily?",
    respuesta:
      "No. Tu cliente te paga directo en tu cuenta de Culqi o en tu Yape o Plin. Pedily nunca toca tu dinero.",
  },
  {
    pregunta: "¿Puedo vender antes de que Culqi me apruebe?",
    respuesta:
      "Sí: en la tienda web, el asistente de WhatsApp y el QR de mesa cobras con el QR de tu Yape o Plin y verificas el comprobante en el panel. La tarjeta y el Yape confirmado automáticamente llegan cuando Culqi te aprueba; el kiosko cobra así o con «pagar en caja».",
  },
  {
    pregunta: "¿Necesito saber de tecnología?",
    respuesta:
      "No. Subes una foto de tu carta y la IA arma tus platos y precios para que los revises. Luego conectas tus cobros y haces un pedido de prueba. Si prefieres, lo hacemos contigo paso a paso, sin reunión obligatoria.",
  },
  {
    pregunta: "¿El asistente de WhatsApp es un formulario o conversa?",
    respuesta: `Conversa. Tu cliente escribe como le escribiría a tu cajero («medio pollo y una jarra de chicha»), el asistente le pregunta lo que falta (cremas, tamaño), arma el pedido solo con los platos y precios de tu carta y le abre la mini-app, dentro del mismo WhatsApp, para poner su dirección y pagar con Yape, tarjeta o QR. El pedido pagado pasa a cocina. Chat para conversar, mini-app para comprar. Si el cliente pide hablar con una persona, te avisa y tu equipo sigue el chat desde el panel. Viene desde el plan de ${soles(WHATSAPP.precioMensual)} con un cupo mensual de conversaciones que fijamos según tu volumen; en ${COMPLETO.nombre} el cupo es 3 veces mayor.`,
  },
  PREGUNTA_DESCARGAR,
  {
    pregunta: "¿Mis clientes pueden pedir para más tarde?",
    respuesta:
      "Sí. Con los pedidos programados tu cliente elige el día y la hora de entrega o de recojo dentro de tu horario, y el pedido entra al panel para prepararlo a tiempo. Viene en todos los planes.",
  },
  PREGUNTA_RAPPI_PEDIDOSYA,
  {
    pregunta: "¿Cómo funcionan el kiosko y el QR de mesa?",
    respuesta: `El kiosko es una pantalla táctil con navegador en tu local: tu cliente ve la carta, personaliza y paga con tarjeta o Yape, o elige pagar en caja. Para imprimir tickets hace falta un PC con Windows y una impresora térmica, o una impresora Star o Epson con impresión en la nube, sin PC. Con el QR de mesa, tu cliente escanea el código de su mesa, pide y paga desde su celular, y el pedido llega a tu panel con su número de mesa. Los dos vienen en el plan ${COMPLETO.nombre} (${soles(COMPLETO.precioMensual)}), con licencia del kiosko para 1 pantalla. El QR de mesa también se suma a ${TIENDA.nombre} o ${WHATSAPP.nombre} como complemento de ${precioComplemento()}.`,
  },
  PREGUNTA_CARTA_QR,
  PREGUNTA_MESA_PRECIO,
  {
    pregunta: "¿Dónde se guardan los datos?",
    respuesta:
      "En servidores de Estados Unidos (Virginia, región iad1), de Vercel y Supabase. Eso es una transferencia internacional de datos personales (flujo transfronterizo, artículo 15 de la Ley 29733), y lo hacemos con proveedores que cifran las conexiones y restringen el acceso. Los detalles están en la política de privacidad. Si dejas Pedily, puedes exportar tus datos durante 30 días; luego se borran.",
  },
  {
    pregunta: "¿Quién está detrás de Pedily?",
    respuesta: `${EMPRESA.razonSocial}, una empresa peruana; Pedily funciona solo en Perú (Culqi, Yape, Plin y SUNAT). Pedily nació y se probó en ${RESTAURANTE_ORIGEN.nombre}, un restaurante de ${RESTAURANTE_ORIGEN.ciudad} que vende así todos los días.`,
  },
];
