import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TOTAL_PANTALLAS } from "@/lib/panel";
import { SOLUCIONES } from "@/lib/soluciones";
import { INTEGRACIONES, RUTA_INTEGRACIONES } from "@/lib/integraciones";
import { comparativa } from "@/components/precios/datos-comparativa";
import { RESTAURANTE_ORIGEN } from "@/lib/site";

/**
 * Prueba honesta, sin clientes inventados (auditoría L-01 §4 P1-3b). Cada
 * cifra se calcula de los mismos datos que pintan su página, así que siempre
 * coincide con lo que el visitante puede abrir y contar:
 * - pantallas: `src/lib/panel.ts` (todas con captura real en /panel);
 * - funciones: la comparativa de /precios (`datos-comparativa.ts`);
 * - integraciones: `src/lib/integraciones.ts` (/integraciones);
 * - soluciones: `src/lib/soluciones.ts` (/soluciones).
 * Sin testimonios ni logos: Pedily aún no tiene clientes que contar. La cita
 * del dueño del restaurante de origen espera su permiso por escrito (L-03).
 */
export function HechosProducto() {
  const funciones = comparativa().reduce((n, b) => n + b.filas.length, 0);
  const hechos = [
    { n: String(TOTAL_PANTALLAS), t: "pantallas del panel, todas con su captura real", href: "/panel" },
    { n: String(funciones), t: "funciones comparadas plan por plan", href: "/precios#comparativa" },
    { n: String(INTEGRACIONES.length), t: "integraciones, con cómo se conecta cada una", href: RUTA_INTEGRACIONES },
    { n: String(SOLUCIONES.length), t: "soluciones, cada una con lo que no hace", href: "/soluciones" },
  ];
  return (
    <section aria-labelledby="t-hechos" className="border-t border-tinta/10 bg-tinta text-white">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <h2 id="t-hechos" className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-aji-400 sm:text-xs">
          Sin clientes inventados: esto lo puedes comprobar hoy
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-5">
          {hechos.map((h) => (
            <li key={h.t}>
              <Link href={h.href} className="group block">
                <span className="flex items-baseline gap-1 font-display text-[2rem] font-extrabold leading-none tracking-[-0.03em] text-white sm:text-4xl">
                  {h.n}
                  <ArrowUpRight aria-hidden className="h-4 w-4 text-aji-400 transition-transform group-hover:-translate-y-0.5" />
                </span>
                <span className="mt-1 block text-[0.88rem] leading-snug text-chicha-100 group-hover:text-white">{h.t}</span>
              </Link>
            </li>
          ))}
          <li className="col-span-2 lg:col-span-1">
            <Link href="#quien" className="group block rounded-xl border border-white/15 px-3 py-2.5 lg:h-full">
              <span className="block font-display text-lg font-bold leading-tight">Nació en {RESTAURANTE_ORIGEN.nombre}</span>
              <span className="mt-0.5 block text-[0.88rem] leading-snug text-chicha-100 group-hover:text-white">
                Un restaurante de {RESTAURANTE_ORIGEN.ciudad} que lo usa a diario
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
