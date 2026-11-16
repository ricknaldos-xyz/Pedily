import { clsx } from "clsx";

// ── Chat de WhatsApp ────────────────────────────────────────────────────────
// Platos, precios, cremas y zona salen de la carta y la configuración de la
// demo publicada (pedily-backend/config/ejemplos/carta.demo.json y
// restaurante.demo.config.json: medio pollo S/ 34 con 2 cremas incluidas,
// chicha morada jarra 1 L S/ 14, reparto a Jesús María S/ 8 y 45 min).
// 16-nov: «chat para conversar, mini-app para comprar» (core-prompt.ts:69-71):
// el asistente cierra con el botón «Ver carta» (copy-voice.ts:210) y la
// dirección y el pago se hacen en la mini-app.
export const CHAT_DEMO: { de: "cliente" | "bot"; texto: string; hora: string; boton?: string }[] = [
  { de: "cliente", texto: "hola, medio pollo y una jarra de chicha pa’ Jesús María", hora: "13:02" },
  {
    de: "bot",
    texto:
      "¡Hola! El medio pollo trae 2 cremas: mayonesa, kétchup, mostaza, ají de la casa u ocopa (+S/ 1). ¿Cuáles te pongo?",
    hora: "13:02",
  },
  { de: "cliente", texto: "mayo y ají nomás", hora: "13:03" },
  {
    de: "bot",
    texto:
      "Te anoto:\n• Medio pollo a la brasa (mayonesa, ají) — S/ 34\n• Chicha morada, jarra 1 L — S/ 14\nTe abro la carta para confirmar la dirección y pagar con Yape, tarjeta o QR 👇",
    hora: "13:03",
    boton: "Ver carta",
  },
  { de: "bot", texto: "Pago recibido ✅ Tu pedido ya está en cocina. Llega en unos 45 min 🛵", hora: "13:05" },
];

export function ChatWhatsApp({
  nombre = "Restaurante Demo",
  iniciales = "RD",
  mensajes = CHAT_DEMO,
  animado = false,
  className,
  color = "#075e54",
  logo,
}: {
  nombre?: string;
  iniciales?: string;
  mensajes?: { de: "cliente" | "bot"; texto: string; hora?: string; boton?: string }[];
  animado?: boolean;
  className?: string;
  color?: string;
  logo?: string | null;
}) {
  return (
    <div className={clsx("flex flex-col overflow-hidden bg-[#efeae2] text-left", className)}>
      <div className="flex items-center gap-2.5 px-3 pb-2.5 pt-7 text-white" style={{ background: color }}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/20 text-xs font-bold">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" className="h-full w-full object-cover" />
          ) : (
            iniciales
          )}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold leading-tight">{nombre}</p>
          <p className="text-[10px] opacity-85">asistente de pedidos</p>
        </div>
      </div>
      <div className="flex-1 space-y-1.5 px-2.5 py-3">
        {mensajes.map((m, i) => (
          <p
            key={i}
            style={animado ? { animationDelay: `${300 + i * 650}ms` } : undefined}
            className={clsx(
              "w-fit max-w-[86%] whitespace-pre-line rounded-lg px-2.5 py-1.5 text-[12.5px] leading-snug text-[#111b21] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]",
              m.de === "cliente" ? "ml-auto rounded-tr-sm bg-[#d9fdd3]" : "rounded-tl-sm bg-white",
              animado && "animate-entra"
            )}
          >
            {m.texto}
            {m.hora && <span className="ml-2 inline-block translate-y-0.5 font-mono text-[9px] text-[#54656f]">{m.hora}</span>}
            {m.boton && (
              <span className="-mx-2.5 -mb-1.5 mt-1.5 block border-t border-black/10 py-1.5 text-center text-[12.5px] font-semibold text-[#027eb5]">
                {m.boton}
              </span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

