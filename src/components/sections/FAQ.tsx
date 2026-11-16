import { Plus } from "lucide-react";
import { Encabezado } from "@/components/ui/Encabezado";
import { FAQS, type Pregunta } from "@/lib/faq";

/**
 * Preguntas frecuentes con <details>: el texto está en el HTML, se abre sin JS
 * y coincide con el JSON-LD FAQPage de la misma página.
 */
export function FAQ({
  preguntas = FAQS,
  titulo = "Lo que todos preguntan antes de empezar",
  bajada = "Precio, permanencia, dinero y lo que pagas aparte, sin letra chica.",
  id = "faq",
}: {
  preguntas?: Pregunta[];
  titulo?: string;
  bajada?: string;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-16 bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <Encabezado etiqueta="Preguntas frecuentes" titulo={titulo} bajada={bajada} />
          <p className="mt-6 text-sm text-sand-700">
            ¿Tienes otra pregunta?{" "}
            <a href="/contacto" className="font-semibold text-chicha-700 underline underline-offset-2">
              Escríbenos
            </a>
          </p>
        </div>
        <div className="divide-y divide-dashed divide-tinta/20 border-y border-dashed border-tinta/20">
          {preguntas.map((f) => (
            <details key={f.pregunta} className="group">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-left font-display text-[1.08rem] font-bold text-tinta">
                {f.pregunta}
                <Plus aria-hidden className="h-5 w-5 shrink-0 text-chicha-600 transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 pr-8 text-[0.98rem] leading-relaxed text-sand-700">{f.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
