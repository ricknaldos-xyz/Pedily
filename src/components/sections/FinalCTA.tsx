import { Check } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { demoBotLink } from "@/lib/site";
import { MESES_PERMANENCIA_ALTA_GRATIS } from "@/lib/planes";

const GARANTIAS = [
  "0 % de comisión",
  "Cobras en tu cuenta",
  `Alta gratis con ${MESES_PERMANENCIA_ALTA_GRATIS} meses`,
  "Empresa peruana",
];

export function FinalCTA({
  titulo = "Tu próximo pedido puede llegar sin comisión",
  bajada = "Crea tu tienda hoy. El alta es gratis si te quedas 6 meses y te acompañamos en cada paso.",
  secundario,
}: {
  titulo?: string;
  bajada?: string;
  /** Segundo botón fijo (p. ej. en /demo no tiene sentido «Ver la demo»). */
  secundario?: { href: string; texto: string };
}) {
  const bot = demoBotLink();
  return (
    <section id="cta" className="relative overflow-hidden bg-chicha-600 py-16 sm:py-24">
      <div aria-hidden className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-chicha-400/40 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-white text-balance sm:text-6xl">{titulo}</h2>
        <p className="mx-auto mt-4 max-w-xl text-[1.05rem] text-chicha-100 sm:text-lg">{bajada}</p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Boton href="/contacto" tam="lg" flecha>
            Crear mi tienda
          </Boton>
          {secundario ? (
            <Boton href={secundario.href} variante="borde-claro" tam="lg">
              {secundario.texto}
            </Boton>
          ) : bot ? (
            <a
              href={bot}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-6 font-semibold text-white hover:border-white"
            >
              <WhatsAppGlyph className="h-5 w-5" /> Probar el asistente
            </a>
          ) : (
            <Boton href="/demo" variante="borde-claro" tam="lg">
              Ver la demo
            </Boton>
          )}
        </div>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-chicha-100">
          {GARANTIAS.map((g) => (
            <li key={g} className="flex items-center gap-1.5">
              <Check aria-hidden className="h-4 w-4 text-aji-400" />
              {g}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
