/**
 * Preguntas frecuentes. Una sola fuente para la FAQ visible y para el JSON-LD
 * (FAQPage), que Google exige que coincidan.
 */
import { EMPRESA, FUNDADORES, RESTAURANTE_ORIGEN } from "./site";
import {
  altaProporcional,
  EJEMPLO_ALTA,
  MESES_PERMANENCIA_ALTA_GRATIS,
  PLANES,
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

export const FAQS: Pregunta[] = [
  {
    pregunta: "¿Cuánto cuesta Pedily?",
    respuesta: `Tres planes al mes, con IGV incluido y 0 % de comisión por pedido al restaurante y al comensal: ${TIENDA.nombre}, ${soles(TIENDA.precioMensual)} (tienda web, panel completo, cocina, caja, cobros, boletas SUNAT, inventario, reportes, reparto y pedidos programados, sin asistente de WhatsApp); ${WHATSAPP.nombre}, ${soles(WHATSAPP.precioMensual)} (suma el asistente de WhatsApp con IA y las campañas); y ${COMPLETO.nombre}, ${soles(COMPLETO.precioMensual)} (suma kiosko, QR de mesa que cobra, 3 veces más conversaciones del asistente y atención prioritaria). Si pagas el año por adelantado, pagas 10 meses y usas 12.`,
  },
  {
    pregunta: "¿Qué pago aparte?",
    respuesta:
      "Lo que cobra cada proveedor, directo a él: Culqi, 3,44 % + US$ 0,20 por cada venta con tarjeta o Yape; Nubefact, desde S/ 70 al mes por tus boletas y facturas; y, si tienes el asistente, los mensajes de WhatsApp que Meta cobra a tu tarjeta (1.000 mensajes de servicio gratis al mes y luego S/ 0,0998 por mensaje; las campañas, S/ 0,2339 por mensaje). Son sus precios públicos de noviembre de 2026. El equipo del kiosko (pantalla, y PC e impresora si quieres ticket) lo compras tú.",
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
  {
    pregunta: "¿También recibe pedidos de Rappi o PedidosYa?",
    respuesta:
      "No. Los pedidos de Rappi y PedidosYa se siguen atendiendo en sus propias plataformas. Pedily es para vender por tus canales propios (web, WhatsApp y kiosko) sin comisión. Para el reparto sí puedes usar PedidosYa Envíos.",
  },
  {
    pregunta: "¿Cómo funcionan el kiosko y el QR de mesa?",
    respuesta: `El kiosko es una pantalla táctil con navegador en tu local: tu cliente ve la carta, personaliza y paga con tarjeta o Yape, o elige pagar en caja. Para imprimir tickets hace falta un PC con Windows y una impresora térmica. Con el QR de mesa, tu cliente escanea el código de su mesa, pide y paga desde su celular, y el pedido llega a tu panel con su número de mesa. Los dos vienen en el plan ${COMPLETO.nombre} (${soles(COMPLETO.precioMensual)}), con licencia del kiosko para 1 pantalla.`,
  },
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
