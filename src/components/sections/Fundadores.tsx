import { Container } from "@/components/layout/Container";
import { Bloque } from "@/components/layout/Bloque";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight, Check } from "lucide-react";
import { FUNDADORES } from "@/lib/site";

/** Programa de fundadores: todo sale de FUNDADORES (src/lib/site.ts). */
export function Fundadores() {
  if (!FUNDADORES.activo) return null;

  const beneficios = [
    `Tu precio congelado ${FUNDADORES.mesesPrecioCongelado} meses`,
    ...(FUNDADORES.altaGratis
      ? [FUNDADORES.sinPermanencia ? "Alta gratis, sin permanencia" : "Alta gratis"]
      : []),
    ...(FUNDADORES.acompanamientoDirecto
      ? ["Te acompaña directamente el equipo en la puesta en marcha"]
      : []),
  ];

  return (
    <Bloque id="fundadores" className="bg-gradient-to-br from-primary-700 to-primary-900">
      <Container className="max-w-3xl">
        <AnimatedSection>
          <p className="text-xs font-bold uppercase tracking-wider text-primary-200">
            Programa de fundadores
          </p>
          <h2 className="mt-2 text-[1.7rem] font-extrabold leading-tight text-white sm:text-4xl">
            Los primeros {FUNDADORES.cupos} restaurantes entran con condiciones
            de fundador
          </h2>
          <ul className="mt-5 space-y-2">
            {beneficios.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-base text-primary-50">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary-300" />
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-primary-100/85">
            A cambio, {FUNDADORES.aCambio}. Son{" "}
            {FUNDADORES.cupos} cupos en total.
          </p>
          <a
            href="/contacto"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-primary-800 shadow-lg transition-all hover:bg-primary-50 active:scale-[0.98]"
          >
            Quiero ser fundador <ArrowRight className="h-4 w-4" />
          </a>
        </AnimatedSection>
      </Container>
    </Bloque>
  );
}
