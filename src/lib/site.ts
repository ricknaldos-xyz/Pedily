/**
 * Configuración central del sitio (contacto, WhatsApp, redes).
 *
 * Los valores reales se inyectan vía variables de entorno
 * (NEXT_PUBLIC_*) para no hardcodear datos. Mientras no se definan, valen
 * null y los enlaces correspondientes (WhatsApp, correo) no se pintan.
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
  // TODO(PENDIENTE): completar con las URLs reales. Las vacías no se renderizan.
  { name: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "" },
  { name: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "" },
  { name: "TikTok", href: process.env.NEXT_PUBLIC_TIKTOK_URL || "" },
  { name: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "" },
].filter((s) => s.href);

const DEFAULT_WA_MESSAGE =
  "Hola Pedily 👋 Quiero saber más sobre la plataforma para mi restaurante.";

/**
 * Construye un enlace wa.me con un mensaje pre-cargado, o null si no hay
 * número configurado (quien lo use no debe pintar el botón).
 */
export function whatsappLink(
  message: string = DEFAULT_WA_MESSAGE
): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Versión legible del teléfono, p. ej. para JSON-LD (+51 ...), o null. */
export const WHATSAPP_TEL: string | null = WHATSAPP_NUMBER
  ? `+${WHATSAPP_NUMBER}`
  : null;
