/**
 * Preguntas frecuentes. Una sola fuente para la FAQ visible y para el JSON-LD
 * (FAQPage), que Google exige que coincidan.
 */
import { EMPRESA, RESTAURANTE_ORIGEN } from "./site";

export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

export const FAQS: Pregunta[] = [
  {
    pregunta: "¿Cuánto cuesta Pedily?",
    respuesta:
      "Hay tres planes: S/ 249, S/ 499 y S/ 999 al mes, con IGV incluido. Si pagas el año por adelantado, te regalamos 2 meses. El plan de S/ 249 no trae el asistente de WhatsApp; viene desde el plan de S/ 499.",
  },
  {
    pregunta: "¿Pedily cobra comisión por pedido?",
    respuesta:
      "No. Pedily cobra 0 % de comisión al restaurante y 0 % al comensal. Pagas solo tu plan.",
  },
  {
    pregunta: "¿Qué pago aparte?",
    respuesta:
      "Lo que cobra cada proveedor, directo a él: Culqi, 3,44 % + US$ 0,20 por cada venta con tarjeta o Yape; Nubefact, desde S/ 70 al mes por tus boletas y facturas; y, si tienes el asistente, los mensajes de WhatsApp que Meta cobra a tu tarjeta (1.000 mensajes de servicio gratis al mes y luego S/ 0,0998 por mensaje). Son sus precios públicos de noviembre de 2026.",
  },
  {
    pregunta: "¿Hay permanencia?",
    respuesta:
      "El alta es gratis si te quedas al menos 6 meses. Si te vas antes, pagas la parte proporcional del alta. No hay ningún otro cargo por irte.",
  },
  {
    pregunta: "¿El dinero pasa por Pedily?",
    respuesta:
      "No. Tu cliente te paga directo en tu cuenta de Culqi o en tu Yape o Plin. Pedily nunca toca tu dinero.",
  },
  {
    pregunta: "¿Puedo vender antes de que Culqi me apruebe?",
    respuesta:
      "Sí. Desde el primer día cobras con el QR de tu Yape o Plin y verificas el comprobante en el panel. Cuando Culqi te aprueba, sumas tarjeta y Yape automático.",
  },
  {
    pregunta: "¿Necesito saber de tecnología?",
    respuesta:
      "No. Subes una foto de tu carta y la IA arma tus platos y precios para que los revises. Luego conectas tus cobros y haces un pedido de prueba. Si prefieres, lo hacemos contigo paso a paso, sin reunión obligatoria.",
  },
  {
    pregunta: "¿Cómo funciona el asistente de WhatsApp?",
    respuesta:
      "Conversa con tu cliente en español, arma el pedido con los platos y precios de tu carta, le cobra y lo manda a cocina. Si el cliente pide hablar con una persona, te avisa y tu equipo sigue el chat desde el panel. Viene desde el plan de S/ 499 con un cupo mensual de conversaciones que fijamos según tu volumen.",
  },
  {
    pregunta: "¿También recibe pedidos de Rappi o PedidosYa?",
    respuesta:
      "No. Los pedidos de Rappi y PedidosYa se siguen atendiendo en sus propias plataformas. Pedily es para vender por tus canales propios (web, WhatsApp y kiosko) sin comisión. Para el reparto sí puedes usar PedidosYa Envíos.",
  },
  {
    pregunta: "¿Cómo funciona el kiosko?",
    respuesta:
      "Es una pantalla táctil con navegador en tu local. Tu cliente ve la carta, personaliza y paga con tarjeta o Yape, o elige pagar en caja. Para imprimir tickets hace falta un PC con Windows y una impresora térmica. Viene en el plan de S/ 999.",
  },
  {
    pregunta: "¿Solo funciona en Perú?",
    respuesta:
      "Sí. Está hecho para Perú: Culqi, Yape, Plin y facturación electrónica SUNAT.",
  },
  {
    pregunta: "¿Quién está detrás de Pedily?",
    respuesta: `${EMPRESA.razonSocial}, una empresa peruana. Pedily nació y se probó en ${RESTAURANTE_ORIGEN.nombre}, un restaurante de ${RESTAURANTE_ORIGEN.ciudad} que vende así todos los días.`,
  },
];
