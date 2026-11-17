import Link from "next/link";
import { clsx } from "clsx";
import { Check, Minus, Plus, Power } from "lucide-react";
import { Encabezado } from "@/components/ui/Encabezado";
import { IconoSolucion } from "@/components/marca/IconoSolucion";
import { COMPLEMENTO_MESA, PLANES, precioComplemento, soles } from "@/lib/planes";
import { RUTA_SOLUCION } from "@/lib/soluciones";
import { TINTE_GRUPO } from "@/lib/tintes";
import { comparativa, totalesPorPlan, type Celda } from "./datos-comparativa";

const CORTO = ["Tienda", "+ WhatsApp", "Completo"];

function Marca({ celda, plan }: { celda: Celda; plan: string }) {
  if (celda === "si")
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-hierba-50">
        <Check aria-hidden className="h-4 w-4 text-hierba-600" />
        <span className="sr-only">Incluido en {plan}</span>
      </span>
    );
  if (celda === "enciende")
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-chicha-50">
        <Power aria-hidden className="h-4 w-4 text-chicha-600" />
        <span className="sr-only">En {plan}, se enciende en tu restaurante</span>
      </span>
    );
  if (celda === "complemento")
    return (
      <span className="inline-flex h-7 items-center justify-center whitespace-nowrap rounded-full bg-aji-100 px-1.5 font-mono text-[10px] font-bold text-tinta sm:px-2 sm:text-xs">
        +{soles(COMPLEMENTO_MESA.precioMensual).replace("S/ ", "S/\u00a0")}
        <span className="sr-only"> al mes: en {plan} es un complemento</span>
      </span>
    );
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center">
      <Minus aria-hidden className="h-4 w-4 text-tinta/25" />
      <span className="sr-only">No viene en {plan}</span>
    </span>
  );
}

/**
 * Comparativa función por función (sale de las 12 páginas de solución; ver
 * `datos-comparativa.ts`). Un <details> por solución: el texto completo está en el
 * HTML aunque esté cerrado, y se abre sin JS. Las dos primeras salen abiertas.
 */
export function Comparativa() {
  const bloques = comparativa();
  const totales = totalesPorPlan(bloques);
  const nFunciones = bloques.reduce((n, b) => n + b.filas.length, 0);

  return (
    <section id="comparativa" aria-labelledby="t-comparativa" className="scroll-mt-16 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Encabezado
          id="t-comparativa"
          etiqueta={`Función por función · ${nFunciones} funciones`}
          titulo="Qué trae cada plan, sin letra chica"
          bajada="Las funciones de las 12 soluciones y las integraciones, una por una. Las marcadas con el interruptor vienen apagadas: las encendemos contigo cuando las quieras usar; las integraciones, cuando el proveedor aprueba tu local."
        />

        {/* Cabecera fija con los tres planes */}
        <div className="sticky top-16 z-20 mt-10 grid grid-cols-[minmax(0,1fr)_repeat(3,3.6rem)] items-end border-b-2 border-tinta bg-white/95 py-3 backdrop-blur sm:grid-cols-[minmax(0,1fr)_repeat(3,8.5rem)]">
          <p className="pl-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-humo sm:pl-3 sm:text-xs">Función</p>
          {PLANES.map((p, i) => (
            <p key={p.id} className="text-center">
              <span className="block font-display text-[11px] font-bold leading-tight text-tinta sm:text-base">
                <span className="sm:hidden">{CORTO[i]}</span>
                <span className="hidden sm:inline">{p.nombre}</span>
              </span>
              <span className="block font-mono text-[10px] text-humo sm:text-xs">{soles(p.precioMensual)}</span>
            </p>
          ))}
        </div>

        <div className="divide-y divide-dashed divide-tinta/20">
          {bloques.map((b, bi) => {
            const tinte = TINTE_GRUPO[b.grupoId];
            return (
              <details key={b.slug} open={bi < 2} className="group">
                <summary className="flex min-h-14 cursor-pointer items-center gap-3 py-4">
                  <span className={clsx("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", tinte.fondo, tinte.texto)}>
                    <IconoSolucion icono={b.icono} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-bold leading-tight text-tinta">{b.nombre}</span>
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-humo">
                      {b.grupo} · {b.filas.length} funciones
                    </span>
                  </span>
                  <Plus aria-hidden className="h-5 w-5 shrink-0 text-chicha-600 transition-transform group-open:rotate-45" />
                </summary>
                <table className="mb-4 w-full table-fixed border-collapse text-left">
                  <caption className="sr-only">Funciones de {b.nombre} por plan</caption>
                  <colgroup>
                    <col />
                    <col className="w-[3.6rem] sm:w-[8.5rem]" />
                    <col className="w-[3.6rem] sm:w-[8.5rem]" />
                    <col className="w-[3.6rem] sm:w-[8.5rem]" />
                  </colgroup>
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Función</th>
                      {PLANES.map((p) => (
                        <th key={p.id} scope="col">
                          {p.nombre}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.filas.map((f, fi) => (
                      <tr key={`${f.texto}-${fi}`} className="border-t border-tinta/[0.06] odd:bg-papel/60">
                        <th scope="row" className="py-2.5 pl-2 pr-2 text-[0.93rem] font-normal leading-snug text-sand-800 sm:pl-3">
                          {f.texto}
                        </th>
                        {f.celdas.map((c, i) => (
                          <td key={i} className="py-2 text-center align-middle">
                            <Marca celda={c} plan={PLANES[i].nombre} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mb-5 pl-2 sm:pl-3">
                  <Link href={b.href ?? RUTA_SOLUCION(b.slug)} className="text-sm font-semibold text-chicha-700 underline underline-offset-2">
                    {b.href ? `Ver cómo se conecta cada una →` : <>Ver la página de «{b.nombre}» →</>}
                  </Link>
                </p>
              </details>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-sand-700">
            <li className="flex items-center gap-2">
              <Check aria-hidden className="h-4 w-4 text-hierba-600" /> Incluido y encendido
            </li>
            <li className="flex items-center gap-2">
              <Power aria-hidden className="h-4 w-4 text-chicha-600" /> Incluido; se enciende en tu restaurante
            </li>
            <li className="flex items-center gap-2">
              <span className="rounded-full bg-aji-100 px-1.5 font-mono text-[11px] font-bold text-tinta">+S/</span> Complemento{" "}
              {COMPLEMENTO_MESA.nombre}, {precioComplemento()}
            </li>
            <li className="flex items-center gap-2">
              <Minus aria-hidden className="h-4 w-4 text-tinta/40" /> No viene en ese plan
            </li>
          </ul>
          <dl className="grid grid-cols-3 gap-2 text-center">
            {PLANES.map((p, i) => (
              <div key={p.id} className="rounded-xl border border-tinta/10 px-3 py-2">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-humo">{CORTO[i]}</dt>
                <dd className="font-display text-xl font-extrabold text-tinta">{totales[i]}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-humo">
          Cada función sale de su página de solución y del inventario del producto revisado en el código el 15 de noviembre de
          2026; las integraciones, del código revisado el 16 de noviembre. El cobro con terminal en el kiosko va con el kiosko, en
          Completo. Además del asistente, los planes con WhatsApp traen un cupo mensual de conversaciones; en Completo es 3 veces
          mayor. El kiosko trae licencia para 1 pantalla; el equipo lo compras tú.
        </p>
      </div>
    </section>
  );
}
