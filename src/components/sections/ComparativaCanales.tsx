import { clsx } from "clsx";
import { Container } from "@/components/layout/Container";
import { Bloque } from "@/components/layout/Bloque";
import { Encabezado } from "@/components/ui/Encabezado";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Check, Minus, X } from "lucide-react";
import { PLANES, soles } from "@/lib/planes";

/**
 * Mensaje C del plan del 15-nov: «un asistente que conversa de verdad y cobra,
 * no un formulario», con una comparativa honesta de canales. Sin nombrar a
 * nadie y sin nada que no se pueda comprobar: cada fila describe cómo funciona
 * cada TIPO de canal, incluida la desventaja del nuestro (gasta más mensajes de
 * Meta que un formulario).
 */

type Nota = "bien" | "regular" | "mal";

interface Canal {
  id: string;
  nombre: string;
  destacado?: boolean;
  filas: { nota: Nota; texto: string }[];
}

const whatsapp = PLANES.find((p) => p.id === "whatsapp")!;

const CANALES: Canal[] = [
  {
    id: "asistente",
    nombre: "Asistente de Pedily",
    destacado: true,
    filas: [
      { nota: "bien", texto: "0 % de comisión: cuota fija al mes" },
      { nota: "bien", texto: "Tu cliente escribe como habla; el asistente pregunta lo que falta" },
      { nota: "bien", texto: "Cobra en el chat con enlace de Yape o tarjeta, a tu cuenta" },
      { nota: "bien", texto: "Si piden una persona, te pasa el chat" },
      { nota: "regular", texto: "Gasta varias respuestas por pedido: Meta las cobra pasadas las 1.000 gratis del mes" },
    ],
  },
  {
    id: "formulario",
    nombre: "Formulario dentro de WhatsApp",
    filas: [
      { nota: "bien", texto: "Sin comisión por pedido" },
      { nota: "regular", texto: "Tu cliente toca opciones; si escribe, alguien tiene que contestarle" },
      { nota: "bien", texto: "Puede cobrar con enlace de pago" },
      { nota: "regular", texto: "No conversa: las dudas van a tu equipo" },
      { nota: "bien", texto: "Un mensaje por pedido: lo más barato en mensajes de Meta" },
    ],
  },
  {
    id: "a-mano",
    nombre: "WhatsApp atendido a mano",
    filas: [
      { nota: "bien", texto: "Sin comisión por pedido" },
      { nota: "bien", texto: "Tu cliente escribe como habla" },
      { nota: "mal", texto: "Alguien anota, suma el total y revisa la captura del Yape" },
      { nota: "mal", texto: "En hora punta los chats esperan" },
      { nota: "bien", texto: "Con la app WhatsApp Business, Meta no cobra los mensajes" },
    ],
  },
  {
    id: "apps",
    nombre: "Apps de delivery",
    filas: [
      { nota: "mal", texto: "Comisión por cada pedido, la que fija cada app" },
      { nota: "bien", texto: "Te traen clientes que todavía no te conocen" },
      { nota: "regular", texto: "La app cobra y te liquida después" },
      { nota: "regular", texto: "Los datos del cliente los maneja la app" },
      { nota: "bien", texto: "Sin mensajes de WhatsApp que pagar" },
    ],
  },
];

const ICONO: Record<Nota, { Icono: typeof Check; clase: string; etiqueta: string }> = {
  bien: { Icono: Check, clase: "bg-primary-100 text-primary-700", etiqueta: "A favor" },
  regular: { Icono: Minus, clase: "bg-cream-300 text-cream-800", etiqueta: "Depende" },
  mal: { Icono: X, clase: "bg-accent-100 text-accent-600", etiqueta: "En contra" },
};

export function ComparativaCanales() {
  return (
    <Bloque id="comparativa" className="bg-white">
      <Container className="max-w-6xl">
        <Encabezado
          etiqueta="Compara antes de elegir"
          titulo="Un asistente que conversa de verdad y cobra, no un formulario"
          bajada="Cuatro formas de recibir pedidos, con lo bueno y lo malo de cada una. También lo nuestro."
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CANALES.map((c, i) => (
            <AnimatedSection key={c.id} delay={i * 0.05}>
              <div
                className={clsx(
                  "h-full rounded-2xl p-4",
                  c.destacado
                    ? "border-2 border-primary-500 bg-primary-50/60"
                    : "border border-sand-200 bg-white"
                )}
              >
                <h3 className="text-base font-bold text-sand-900">{c.nombre}</h3>
                <ul className="mt-2.5 space-y-2">
                  {c.filas.map((f) => {
                    const { Icono, clase, etiqueta } = ICONO[f.nota];
                    return (
                      <li key={f.texto} className="flex items-start gap-2 text-sm leading-snug text-sand-700">
                        <span
                          className={clsx(
                            "mt-px flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                            clase
                          )}
                        >
                          <Icono className="h-3 w-3" aria-hidden />
                          <span className="sr-only">{etiqueta}:</span>
                        </span>
                        {f.texto}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-sand-600">
          El asistente viene desde el plan de {soles(whatsapp.precioMensual)}. ¿Cuánto
          te costarían los mensajes de Meta?{" "}
          <a
            href="/herramientas/costo-mensajes-whatsapp"
            className="font-semibold text-primary-700 underline underline-offset-2"
          >
            Calcúlalo gratis
          </a>
          .
        </p>
      </Container>
    </Bloque>
  );
}
