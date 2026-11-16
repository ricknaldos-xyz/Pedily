import { Encabezado } from "@/components/ui/Encabezado";
import { Boton } from "@/components/marca/Boton";
import { PanelSeis } from "@/components/panel/PanelSeis";
import { PANEL, TOTAL_PANTALLAS } from "@/lib/panel";

const MOMENTOS = [
  { h: "11:30", t: "Abres", d: "Conteo de apertura y tienda abierta" },
  { h: "12:00", t: "Vendes", d: "Pedidos de todos tus canales en vivo" },
  { h: "12:05", t: "Cocinas", d: "Pantalla de cocina y alarma" },
  { h: "12:20", t: "Cobras", d: "Pagos verificados y boleta sola" },
  { h: "22:10", t: "Cierras", d: "Cierre del día que cuadra" },
  { h: "Lunes", t: "Decides", d: "Reportes, costos y campañas" },
];

/** El panel como protagonista (benchmark §5.3 n.º 6). */
export function PanelProtagonista() {
  return (
    <section id="panel" className="scroll-mt-16 bg-[#160a1d] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <Encabezado
            oscuro
            etiqueta={`El panel · ${TOTAL_PANTALLAS} pantallas en ${PANEL.length} áreas`}
            titulo="Todo tu restaurante en una pantalla. Tócalo."
            bajada="Cambia de pestaña y mira cómo se opera un día: pedidos, cocina, caja, almacén, clientes y números. Es el mismo panel que usa tu equipo."
          />
          <Boton href="/panel" variante="borde-claro" flecha className="justify-self-start">
            Ver el panel por dentro
          </Boton>
        </div>

        <div className="mt-10">
          <PanelSeis oscuro />
        </div>

        <ol className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
          {MOMENTOS.map((m) => (
            <li key={m.t} className="bg-[#160a1d] p-4">
              <p className="font-mono text-xs text-aji-400">{m.h}</p>
              <p className="mt-1 font-display text-lg font-bold">{m.t}</p>
              <p className="mt-0.5 text-sm leading-snug text-chicha-100">{m.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
