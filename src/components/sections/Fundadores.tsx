import { Check } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { Sello } from "@/components/marca/Sello";
import { FUNDADORES } from "@/lib/site";

/** Programa de fundadores: todo sale de FUNDADORES (src/lib/site.ts). */
export function Fundadores() {
  if (!FUNDADORES.activo) return null;

  const beneficios = [
    `Tu precio congelado ${FUNDADORES.mesesPrecioCongelado} meses`,
    ...(FUNDADORES.altaGratis ? [FUNDADORES.sinPermanencia ? "Alta gratis, sin permanencia" : "Alta gratis"] : []),
    ...(FUNDADORES.acompanamientoDirecto ? ["Te acompaña directamente el equipo en la puesta en marcha"] : []),
  ];

  return (
    <section id="fundadores" className="scroll-mt-16 bg-aji-500 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-tinta">Programa de fundadores</p>
          <h2 className="mt-3 font-display text-[1.9rem] font-extrabold leading-[1.05] tracking-[-0.025em] text-tinta text-balance sm:text-5xl">
            Los primeros {FUNDADORES.cupos} restaurantes entran con condiciones de fundador
          </h2>
          <p className="mt-4 text-[1.02rem] text-tinta/85">
            A cambio, {FUNDADORES.aCambio}. Son {FUNDADORES.cupos} cupos en total.
          </p>
          <div className="mt-7">
            <Boton href="/contacto" variante="tinta" tam="lg" flecha>
              Quiero ser fundador
            </Boton>
          </div>
        </div>
        <div className="ticket relative px-6 py-7 [filter:drop-shadow(0_14px_20px_rgba(36,16,46,0.25))]">
          <p className="font-mono text-[11px] uppercase tracking-wider text-humo">Condiciones de fundador</p>
          <ul className="mt-3 space-y-3">
            {beneficios.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[1rem] font-semibold text-tinta">
                <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-hierba-600" />
                {b}
              </li>
            ))}
          </ul>
          <div className="absolute -right-2 -top-4">
            <Sello tono="cocina" giro={8}>
              {FUNDADORES.cupos} cupos
            </Sello>
          </div>
        </div>
      </div>
    </section>
  );
}
