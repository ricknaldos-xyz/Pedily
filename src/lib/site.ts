/**
 * Configuración central del sitio: contacto, demos, empresa, restaurante de
 * origen y programa de fundadores.
 *
 * Los datos de contacto se inyectan con variables de entorno (NEXT_PUBLIC_*)
 * para no inventar nada. Mientras no se definan valen null y lo que dependa de
 * ellos (botón de WhatsApp, correo, bot de demostración) no se pinta.
 */

// Número de WhatsApp de ventas en formato internacional sin "+" ni espacios.
// Sin NEXT_PUBLIC_WHATSAPP_NUMBER no hay número: nunca uno inventado.
export const WHATSAPP_NUMBER: string | null =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || null;

// Email de contacto.
// Sin NEXT_PUBLIC_CONTACT_EMAIL no se muestra ningún correo.
export const CONTACT_EMAIL: string | null =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;

export const CONTACT_LOCATION = "Lima, Perú";

export const SOCIAL_LINKS: { name: string; href: string }[] = [
  // Solo se pintan las que tienen URL.
  { name: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "" },
  { name: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "" },
  { name: "TikTok", href: process.env.NEXT_PUBLIC_TIKTOK_URL || "" },
  { name: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "" },
].filter((s) => s.href);

const DEFAULT_WA_MESSAGE =
  "Hola, quiero saber más sobre Pedily para mi restaurante.";

function enlaceWa(numero: string | null, mensaje: string): string | null {
  if (!numero) return null;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * Enlace wa.me de ventas con un mensaje precargado, o null si no hay número
 * configurado (quien lo use no debe pintar el botón).
 */
export function whatsappLink(
  message: string = DEFAULT_WA_MESSAGE
): string | null {
  return enlaceWa(WHATSAPP_NUMBER, message);
}

/** Versión legible del teléfono, p. ej. para JSON-LD (+51 ...), o null. */
export const WHATSAPP_TEL: string | null = WHATSAPP_NUMBER
  ? `+${WHATSAPP_NUMBER}`
  : null;

/**
 * Demostraciones públicas que el visitante puede tocar sin hablar con nadie.
 *
 * - `tiendaUrl`: tienda de ejemplo publicada (carta y pedido de prueba).
 * - `botWhatsapp`: número del bot de demostración (sin «+»). Sin
 *   NEXT_PUBLIC_DEMO_BOT_WHATSAPP el botón «Prueba el bot por WhatsApp» no se
 *   pinta en ningún sitio.
 */
export const DEMO = {
  tiendaUrl: "https://pedily-demo-web.vercel.app",
  botWhatsapp: process.env.NEXT_PUBLIC_DEMO_BOT_WHATSAPP?.trim() || null,
  botMensaje: "Hola, quiero hacer un pedido",
} as const;

/** wa.me del bot de demostración, o null si no hay número configurado. */
export function demoBotLink(): string | null {
  return enlaceWa(DEMO.botWhatsapp, DEMO.botMensaje);
}

/**
 * Empresa que opera Pedily. RUC y domicilio fiscal llegan al final: mientras
 * valgan null no se pintan (ni la etiqueta).
 */
export const EMPRESA = {
  razonSocial: "Hub de Innovacion Digital SAC",
  ruc: null as string | null,
  domicilioFiscal: null as string | null,
  pais: "Perú",
} as const;

/**
 * Restaurante donde nació y se probó Pedily. Se puede nombrar, pero SIN
 * NINGUNA CIFRA suya (decisión del dueño, 15-nov-2026). El guardián
 * (scripts/comprobar-promesas.sh) solo admite el nombre en este archivo y en
 * una línea sin números.
 */
export const RESTAURANTE_ORIGEN = {
  nombre: "Wantan Clan",
  ciudad: "Lima",
} as const;

/**
 * Programa de fundadores (decisiones del 15-nov-2026, D-decisiones): 10 cupos,
 * alta gratis SIN condición de permanencia y precio congelado 24 meses. El
 * dueño puede cambiarlos aquí y la landing se actualiza sola.
 * Sin contador de cupos restantes: solo el total.
 */
export const FUNDADORES = {
  activo: true,
  cupos: 10,
  mesesPrecioCongelado: 24,
  altaGratis: true,
  sinPermanencia: true,
  acompanamientoDirecto: true,
  aCambio: "nos das permiso para contar tu caso",
} as const;
