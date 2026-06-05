/**
 * Configuración central del sitio (contacto, WhatsApp, redes).
 *
 * Los valores reales se inyectan vía variables de entorno
 * (NEXT_PUBLIC_*) para no hardcodear datos. Mientras no se definan,
 * se usan placeholders evidentes — buscar "PENDIENTE" para encontrarlos.
 */

// Número de WhatsApp de ventas en formato internacional sin "+" ni espacios.
// TODO(PENDIENTE): reemplazar por el número real vía NEXT_PUBLIC_WHATSAPP_NUMBER.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51999999999";

// Email de contacto.
// TODO(PENDIENTE): definir NEXT_PUBLIC_CONTACT_EMAIL real.
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hola@pedily.com";

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

/** Construye un enlace wa.me con un mensaje pre-cargado. */
export function whatsappLink(message: string = DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Versión legible del teléfono, p. ej. para JSON-LD (+51 ...). */
export const WHATSAPP_TEL = `+${WHATSAPP_NUMBER}`;
