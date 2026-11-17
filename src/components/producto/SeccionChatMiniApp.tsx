import { Check, MessageCircle, Power, Smartphone } from "lucide-react";
import { Encabezado } from "@/components/ui/Encabezado";
import { Captura } from "@/components/marca/Captura";
import { MarcoCelular } from "@/components/marca/Marcos";
import type { ClaveCaptura } from "@/lib/capturas";
import { PIEZA_CHAT, PIEZA_MINIAPP, REGLA_CHAT_MINIAPP } from "@/lib/chat-miniapp";

/**
 * Sección protagonista de /soluciones/asistente-whatsapp: «Chat + mini-app».
 * Las pantallas son capturas reales de la mini-app (`pedily-web/app/wa/**`,
 * LV2-C, datos de «Restaurante Demo»).
 */

const PANTALLAS: { clave: ClaveCaptura; titulo: string; texto: string }[] = [
  { clave: "wa-carta", titulo: "Carta con fotos", texto: "Se abre desde «Ver carta», dentro de WhatsApp." },
  { clave: "wa-plato", titulo: "Tamaños y cremas", texto: "Elige cremas e indicaciones para cocina." },
  { clave: "wa-carrito", titulo: "Carrito unido al chat", texto: "Lo pedido por chat ya está; lo demás, tocando." },
  { clave: "wa-confirmar", titulo: "Delivery o recojo", texto: "Con su dirección, cupón y saldo a favor." },
  { clave: "wa-entrega", titulo: "Para más tarde", texto: "Día y franja, si enciendes los programados." },
  { clave: "wa-pago", titulo: "Yape, tarjeta o QR", texto: "O el QR de Yape o Plin de tu local." },
];

const POR_QUE = [
  {
    titulo: "Más claro",
    texto: "Fotos, tamaños y botones en lugar de listas de texto. Tu cliente ve el total antes de pagar.",
  },
  {
    titulo: "Más seguro",
    texto: "La dirección y el pago van en una página de tu restaurante, no en mensajes. El enlace es de un solo uso, solo para ese cliente, y vence.",
  },
  {
    titulo: "Sin perder nada",
    texto: "El carrito del chat viaja a la mini-app, y si pregunta «¿qué llevo?» el asistente ve lo que agregó tocando.",
  },
];

export function SeccionChatMiniApp() {
  const piezas = [
    { ...PIEZA_CHAT, Icono: MessageCircle },
    { ...PIEZA_MINIAPP, Icono: Smartphone },
  ];
  return (
    <section id="chat-mini-app" aria-labelledby="chat-mini-app-titulo" className="scroll-mt-16 overflow-hidden bg-tinta py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Encabezado
          oscuro
          id="chat-mini-app-titulo"
          etiqueta="Chat + mini-app · plan de S/ 499"
          titulo={<>«{REGLA_CHAT_MINIAPP}»</>}
          bajada="El plan con asistente trae dos cosas juntas. El chat conversa y arma el pedido; la mini-app, que se abre desde el mismo chat, es donde tu cliente elige, pone su dirección y paga."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {piezas.map(({ nombre, bajada, items, Icono }, i) => (
            <div key={nombre} className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
              <p className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-aji-500 font-mono font-bold text-tinta">{i + 1}</span>
                <Icono aria-hidden className="h-6 w-6 text-aji-400" />
                <span className="font-display text-2xl font-extrabold">{nombre}</span>
              </p>
              <p className="mt-3 text-chicha-100">{bajada}</p>
              <ul className="mt-4 space-y-2.5">
                {items.map((p) => (
                  <li key={p.texto} className="flex gap-2.5 leading-snug">
                    {"opcion" in p && p.opcion ? (
                      <Power aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-aji-400" />
                    ) : (
                      <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-aji-400" />
                    )}
                    {p.texto}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ol aria-label="Pantallas reales de la mini-app" className="sin-barra -mx-4 mt-12 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
          {PANTALLAS.map((p, i) => (
            <li key={p.clave} className="w-[11.5rem] shrink-0 snap-start lg:w-auto">
              <MarcoCelular oscuro={false}>
                <div className="aspect-[390/844] overflow-hidden">
                  <Captura clave={p.clave} sizes="(max-width: 1024px) 184px, 190px" />
                </div>
              </MarcoCelular>
              <p className="mt-3 font-display font-bold leading-tight">
                <span className="mr-1.5 font-mono text-aji-400">{i + 1}</span>
                {p.titulo}
              </p>
              <p className="mt-1 text-sm leading-snug text-chicha-100">{p.texto}</p>
            </li>
          ))}
        </ol>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-chicha-100">
          Mini-app real con datos de la demo · en tu restaurante sale con tu nombre y tu logo
        </p>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {POR_QUE.map((p) => (
            <li key={p.titulo} className="rounded-2xl border-2 border-dashed border-aji-400/60 p-5">
              <p className="font-display text-xl font-bold text-aji-400">{p.titulo}</p>
              <p className="mt-2 text-[0.96rem] leading-relaxed text-chicha-100">{p.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
