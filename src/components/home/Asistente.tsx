import { Check } from "lucide-react";
import { Encabezado } from "@/components/ui/Encabezado";
import { Boton } from "@/components/marca/Boton";
import { MarcoCelular } from "@/components/marca/Marcos";
import { ChatWhatsApp } from "@/components/producto/Escenas";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { demoBotLink } from "@/lib/site";
import { RUTA_SOLUCION } from "@/lib/soluciones";

const VENTAJAS = [
  "Pregunta lo que falta: cremas, tamaño, dirección.",
  "Solo ofrece lo que está en tu carta, con tus precios. El total lo calcula el servidor.",
  "Cobra con enlace de Yape o tarjeta, o con el QR de tu Yape o Plin.",
  "Entiende notas de voz y platos mal escritos («anticusho»).",
  "Si el cliente pide una persona, te avisa y tu equipo sigue el chat.",
  "Pocos mensajes por pedido y un tope mensual de gasto con avisos.",
];

/** El diferenciador n.º 1 (inventario §21 D1). */
export function Asistente() {
  const bot = demoBotLink();
  return (
    <section className="relative overflow-hidden bg-tinta py-16 text-white sm:py-24">
      <div aria-hidden className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-chicha-600/40 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <Encabezado
            oscuro
            etiqueta="Asistente de WhatsApp · desde S/ 499"
            titulo="Un asistente que conversa de verdad y cobra, no un formulario"
            bajada="Tu cliente escribe como le escribiría a tu cajero. El asistente arma el pedido, lo cobra y lo manda a cocina, también en hora punta."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {VENTAJAS.map((p) => (
              <li key={p} className="flex gap-2.5 text-[0.98rem] leading-snug text-chicha-100">
                <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-aji-400" />
                {p}
              </li>
            ))}
          </ul>
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
            <Boton href={RUTA_SOLUCION("asistente-whatsapp")} variante={bot ? "borde-claro" : "aji"} tam="lg" flecha>
              Cómo funciona el asistente
            </Boton>
          </div>
        </div>
        <div className="relative">
          <MarcoCelular oscuro={false} className="mx-auto w-full max-w-[19rem] rotate-[2deg]">
            <ChatWhatsApp className="min-h-[30rem]" />
          </MarcoCelular>
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-wider text-chicha-100">Ejemplo con la carta de la demo</p>
        </div>
      </div>
    </section>
  );
}
