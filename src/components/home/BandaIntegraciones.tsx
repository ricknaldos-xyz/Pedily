import Link from "next/link";
import { ArrowUpRight, Plug } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { Encabezado } from "@/components/ui/Encabezado";
import { CATEGORIAS, INTEGRACIONES, RUTA_INTEGRACIONES, integracionesDe } from "@/lib/integraciones";

/**
 * Banda «Se conecta con lo que ya usas» de la portada (L-02, 16-nov): una
 * tarjeta por tipo de integración, con los nombres en texto (sin logos de
 * terceros), que lleva a /integraciones.
 */
export function BandaIntegraciones() {
  return (
    <section id="integraciones" aria-labelledby="t-integraciones" className="scroll-mt-16 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Encabezado
            id="t-integraciones"
            etiqueta={`Integraciones · ${INTEGRACIONES.length} conexiones`}
            titulo="Se conecta con lo que ya usas, también Rappi y PedidosYa"
            bajada="Los pedidos de las apps entran al mismo panel que tu web y tu WhatsApp. Y el motorizado, el POS, la impresora, SUNAT y tu contador, conectados."
          />
          <Boton href={RUTA_INTEGRACIONES} variante="tinta" tam="lg" flecha className="shrink-0">
            Ver todas las integraciones
          </Boton>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIAS.map((c, i) => (
            <li key={c.id} className={i === 0 ? "sm:col-span-2" : undefined}>
              <Link
                href={`${RUTA_INTEGRACIONES}#${c.id}`}
                className={
                  i === 0
                    ? "group flex h-full flex-col rounded-2xl border-2 border-tinta bg-aji-100 p-5 shadow-[0_6px_0_0_#24102e] transition-transform hover:-translate-y-0.5"
                    : "group flex h-full flex-col rounded-2xl border border-tinta/10 bg-papel p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                }
              >
                <span className="flex items-start justify-between">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-chicha-700">{c.nombre}</span>
                  <ArrowUpRight aria-hidden className="h-4 w-4 text-humo" />
                </span>
                <span className="mt-2 font-display text-lg font-bold leading-tight text-tinta">
                  {integracionesDe(c.id)
                    .map((it) => it.con)
                    .join(" · ")}
                </span>
                <span className="mt-1 text-sm leading-snug text-sand-700">{c.bajada}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-start gap-2 text-sm text-sand-700">
          <Plug aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-chicha-600" />
          Cada integración dice cómo se conecta: las de Rappi, PedidosYa, Izipay y los terminales se encienden cuando el proveedor
          aprueba tu local.
        </p>
      </div>
    </section>
  );
}
