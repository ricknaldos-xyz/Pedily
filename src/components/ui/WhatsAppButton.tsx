import { whatsappLink } from "@/lib/site";
import { WhatsAppGlyph } from "./WhatsAppGlyph";

/**
 * Botón flotante de WhatsApp de ventas. Solo se pinta con
 * NEXT_PUBLIC_WHATSAPP_NUMBER. En móvil sube por encima de la barra de CTA
 * para no taparla.
 */
export function WhatsAppButton() {
  const href = whatsappLink();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
    >
      <span className="scale-125">
        <WhatsAppGlyph />
      </span>
    </a>
  );
}
