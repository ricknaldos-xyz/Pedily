import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Bloque } from "@/components/layout/Bloque";
import { Encabezado } from "@/components/ui/Encabezado";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight } from "lucide-react";

const pasos = [
  {
    titulo: "Cuéntanos de tu restaurante",
    texto: "Tus datos y tres preguntas rápidas. Sin reunión obligatoria.",
  },
  {
    titulo: "Sube una foto de tu carta",
    texto: "La IA arma tus platos y precios, y tú los revisas antes de guardar.",
  },
  {
    titulo: "Conecta tus cobros y tus boletas",
    texto:
      "Desde el primer día cobras con el QR de tu Yape o Plin. Cuando Culqi te aprueba, sumas tarjeta.",
  },
  {
    titulo: "Haz un pedido de prueba y abre",
    texto: "Lo pides desde tu celular, lo ves llegar al panel y abres tu tienda.",
  },
];

export function AbreTuTienda() {
  return (
    <Bloque id="empezar" className="bg-white">
      <Container className="max-w-5xl">
        <Encabezado
          etiqueta="Así abres tu tienda"
          titulo="En 4 pasos, a tu ritmo"
          bajada="Un asistente en tu panel te lleva paso a paso. ¿Prefieres que lo hagamos contigo? También."
        />
        <div className="mt-6 grid items-center gap-5 lg:grid-cols-2">
          <ol className="space-y-3">
            {pasos.map((p, i) => (
              <AnimatedSection key={p.titulo} delay={i * 0.06}>
                <li className="flex gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-sand-900">{p.titulo}</h3>
                    <p className="text-sm leading-relaxed text-sand-600">{p.texto}</p>
                  </div>
                </li>
              </AnimatedSection>
            ))}
          </ol>
          <AnimatedSection delay={0.1}>
            <figure className="mx-auto max-w-[14rem] overflow-hidden sm:max-w-md rounded-xl border border-sand-300 shadow-elevated">
              <Image
                src="/capturas/panel-empezar.webp"
                alt="Asistente «Empezar» del panel: tu tienda está lista al 36 %, con los pasos Tu negocio, Tu carta, Horarios y Cobros"
                width={800}
                height={800}
                sizes="(max-width: 1024px) 92vw, 450px"
                className="h-auto w-full"
              />
            </figure>
          </AnimatedSection>
        </div>
        <p className="mt-6 hidden text-center sm:block">
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-7 py-4 text-base font-semibold text-white shadow-warm hover:bg-primary-700 active:scale-[0.98]"
          >
            Crear mi tienda <ArrowRight className="h-4 w-4" />
          </a>
        </p>
      </Container>
    </Bloque>
  );
}
