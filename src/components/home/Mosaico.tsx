import Link from "next/link";
import { clsx } from "clsx";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import { Encabezado } from "@/components/ui/Encabezado";
import { IconoSolucion } from "@/components/marca/IconoSolucion";
import { GRUPOS, RUTA_SOLUCION, solucionesDe } from "@/lib/soluciones";
import { TINTE_GRUPO } from "@/lib/tintes";
import { COMPLEMENTO_MESA, PLANES, soles } from "@/lib/planes";
import { TOTAL_PANTALLAS } from "@/lib/panel";

const PRECIO = Object.fromEntries(PLANES.map((p) => [p.id, p.precioMensual]));

/** Mosaico «Todo lo que trae»: las 12 soluciones agrupadas, cada una con su página. */
export function Mosaico() {
  return (
    <section id="todo" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Encabezado
          etiqueta="Todo lo que trae"
          titulo="Vende, opera y haz que vuelvan. Todo en un sistema."
          bajada="Cada pieza tiene su página con lo que hace, función por función, lo que necesitas y lo que no hace."
        />
        <div className="mt-10 space-y-10">
          {GRUPOS.map((g) => (
            <div key={g.id}>
              <div className="mb-4 flex items-baseline gap-3">
                <h3 className={clsx("font-mono text-xs font-bold uppercase tracking-[0.14em]", TINTE_GRUPO[g.id].texto)}>{g.nombre}</h3>
                <span className="text-sm text-humo">{g.bajada}</span>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {solucionesDe(g.id).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={RUTA_SOLUCION(s.slug)}
                      className={clsx(
                        "group flex h-full flex-col rounded-2xl border bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-card-hover",
                        TINTE_GRUPO[g.id].borde
                      )}
                    >
                      <span className="flex items-start justify-between">
                        <span className={clsx("flex h-10 w-10 items-center justify-center rounded-xl", TINTE_GRUPO[g.id].fondo, TINTE_GRUPO[g.id].texto)}>
                          <IconoSolucion icono={s.icono} className="h-5 w-5" />
                        </span>
                        <ArrowUpRight aria-hidden className="h-4 w-4 text-humo transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-3 font-display text-[1.05rem] font-bold leading-tight text-tinta">{s.nombre}</span>
                      <span className="mt-1 flex-1 text-sm leading-snug text-sand-700">{s.linea}</span>
                      <span className="mt-3 flex items-center justify-between border-t border-dashed border-tinta/15 pt-2.5 font-mono text-[11px] text-humo">
                        <span>{s.funciones.length} funciones</span>
                        <span>desde {soles(PRECIO[s.plan])}{s.complemento === "mesa" ? ` + ${COMPLEMENTO_MESA.precioMensual}` : ""}</span>
                      </span>
                    </Link>
                  </li>
                ))}
                {g.id === "vuelven" && (
                  <li className="sm:col-span-2 lg:col-span-3">
                    <Link
                      href="/panel"
                      className="group flex h-full flex-col justify-between gap-4 rounded-2xl bg-tinta p-5 text-white sm:flex-row sm:items-center"
                    >
                      <span className="flex items-center gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-aji-500 text-tinta">
                          <LayoutDashboard aria-hidden className="h-6 w-6" />
                        </span>
                        <span>
                          <span className="block font-display text-xl font-bold">Y el panel que lo une todo</span>
                          <span className="block text-sm text-chicha-100">
                            {TOTAL_PANTALLAS} pantallas: operación, caja, carta, almacén, equipo, clientes, asistente y reportes.
                          </span>
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-aji-400">
                        Recorrerlo <ArrowUpRight aria-hidden className="h-4 w-4" />
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
