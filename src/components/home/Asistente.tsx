import { Check, MessageCircle, Smartphone } from "lucide-react";
import { Encabezado } from "@/components/ui/Encabezado";
import { Boton } from "@/components/marca/Boton";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { SecuenciaChatMiniApp } from "@/components/producto/ChatMiniApp";
import { demoBotLink } from "@/lib/site";
import { RUTA_SOLUCION } from "@/lib/soluciones";
import { PIEZA_CHAT, PIEZA_MINIAPP, REGLA_CHAT_MINIAPP } from "@/lib/chat-miniapp";

/**
 * El diferenciador n.º 1 (inventario §21 D1), contado como dos cosas juntas:
 * el chat con IA y la mini-app que se abre desde el mismo chat (decisión del
 * dueño, 16-nov). A la derecha, un celular que cambia de estado: chat →
 * «Ver carta» → mini-app → pago → «PAGADO / EN COCINA».
 */
export function Asistente() {
  const bot = demoBotLink();
  const piezas = [
    { ...PIEZA_CHAT, Icono: MessageCircle },
    { ...PIEZA_MINIAPP, Icono: Smartphone },
  ];
  return (
    <section className="relative overflow-hidden bg-tinta py-14 text-white sm:py-24">
      <div aria-hidden className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-chicha-600/40 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 lg:gap-12 [&>*]:min-w-0 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div>
          <Encabezado
            oscuro
            etiqueta="Asistente de WhatsApp · desde S/ 499"
            titulo="Dos cosas juntas: un chat que conversa y una mini-app para comprar"
            bajada="Tu cliente escribe como le escribiría a tu cajero. Cuando toca elegir y pagar, el mismo chat le abre tu carta dentro de WhatsApp."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {piezas.map(({ nombre, bajada, items, Icono }, i) => (
              <div key={nombre} className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
                <p className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-aji-400 font-mono text-sm font-bold text-aji-400">
                    {i + 1}
                  </span>
                  <Icono aria-hidden className="h-5 w-5 text-aji-400" />
                  <span className="font-display text-xl font-bold">{nombre}</span>
                </p>
                <p className="mt-2 text-[0.95rem] leading-snug text-chicha-100">{bajada}</p>
                {/* En móvil la lista completa queda en la página del asistente (L-03). */}
                <ul className="mt-3 hidden space-y-2 sm:block">
                  {items.map((p) => (
                    <li key={p.texto} className="flex gap-2 text-[0.93rem] leading-snug text-white">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-aji-400" />
                      {p.texto}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl border-2 border-dashed border-aji-400/70 px-4 py-3 text-[0.98rem] leading-snug text-chicha-100">
            <strong className="font-display text-lg text-aji-400">«{REGLA_CHAT_MINIAPP}».</strong> La dirección y el pago van en la
            mini-app: es más claro para tu cliente y nadie escribe datos de pago en el chat.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {bot ? (
              <a
                href={bot}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-2 border-white bg-aji-500 px-6 font-semibold text-tinta"
              >
                <WhatsAppGlyph className="h-5 w-5" /> Probar el asistente
              </a>
            ) : null}
            <Boton href={`${RUTA_SOLUCION("asistente-whatsapp")}#chat-mini-app`} variante={bot ? "borde-claro" : "aji"} tam="lg" flecha>
              Cómo funcionan chat y mini-app
            </Boton>
          </div>
        </div>
        <SecuenciaChatMiniApp oscuro />
      </div>
    </section>
  );
}
