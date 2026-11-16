import { Encabezado } from "@/components/ui/Encabezado";
import { Boton } from "@/components/marca/Boton";
import { Captura } from "@/components/marca/Captura";
import { MarcoNavegador } from "@/components/marca/Marcos";
import { PLANES, soles } from "@/lib/planes";

const [TIENDA, , COMPLETO] = PLANES;

const PASOS = [
  {
    titulo: "Cuéntanos de tu restaurante",
    texto: "Tus datos y tres preguntas rápidas. Sin reunión obligatoria.",
  },
  {
    titulo: "Sube una foto de tu carta",
    texto: "La IA arma tus platos y precios, y tú los revisas antes de guardar. También vale un PDF o la plantilla de carta.",
  },
  {
    titulo: "Conecta tus cobros y tus boletas",
    texto:
      "Tu Culqi para tarjeta y Yape, tu Nubefact para las boletas y, si tienes el asistente, tu QR de Yape o Plin. Las llaves se validan y se guardan en el servidor.",
  },
  {
    titulo: "Haz un pedido de prueba y abre",
    texto: "Lo pides desde tu celular, lo ves llegar al panel y abres tu tienda.",
  },
];

/** Alta en 4 pasos (inventario §17, resultado visible para el restaurante). */
export function AbreTuTienda() {
  return (
    <section id="empezar" className="scroll-mt-16 bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <Encabezado
            etiqueta="El alta"
            titulo="Tu tienda abierta en 4 pasos, a tu ritmo"
            bajada="El asistente «Empezar» del panel te lleva paso a paso. ¿Prefieres que lo hagamos contigo? También."
          />
          <ol className="mt-8 space-y-5">
            {PASOS.map((p, i) => (
              <li key={p.titulo} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-tinta bg-aji-500 font-mono text-sm font-bold text-tinta">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-tinta">{p.titulo}</h3>
                  <p className="mt-0.5 text-[0.98rem] leading-relaxed text-sand-700">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 rounded-xl border border-dashed border-tinta/25 bg-papel p-4 text-sm leading-relaxed text-sand-700">
            <strong className="text-tinta">Alta:</strong> {soles(TIENDA.alta)} en Tienda y Tienda + WhatsApp, {soles(COMPLETO.alta)} en
            Completo (incluye dejar listos el kiosko y la impresora en remoto). Gratis si te quedas 6 meses.
          </p>
          <div className="mt-6">
            <Boton href="/contacto" tam="lg" flecha>
              Crear mi tienda
            </Boton>
          </div>
        </div>
        <figure>
          <MarcoNavegador url="mirestaurante · panel/empezar">
            <Captura clave="panel-empezar" sizes="(max-width: 1024px) 92vw, 600px" />
          </MarcoNavegador>
          <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-wider text-humo">
            Asistente «Empezar» del panel de la demo
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
