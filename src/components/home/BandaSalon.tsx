import { Check } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { Captura } from "@/components/marca/Captura";
import { MarcoCelular } from "@/components/marca/Marcos";
import { Sello } from "@/components/marca/Sello";
import { COMPLEMENTO_MESA, PLANES, precioComplemento, soles } from "@/lib/planes";
import { RUTA_SALON } from "@/lib/para";

const COMPLETO = PLANES[2];

/** Banda «¿Tienes salón?» de la portada (añadido 16-nov): lleva a /para/restaurantes-con-salon. */
export function BandaSalon() {
  return (
    <section aria-labelledby="t-salon" className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl border-2 border-tinta bg-aji-100 p-6 [&>*]:min-w-0 sm:p-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">¿Tienes salón?</p>
            <h2 id="t-salon" className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] text-tinta text-balance sm:text-4xl">
              Que tus mesas pidan y paguen desde el celular
            </h2>
            <ul className="mt-5 grid gap-2 text-[0.98rem] text-sand-800 sm:grid-cols-2">
              {[
                "Carta digital por QR, en todos los planes",
                `${COMPLEMENTO_MESA.nombre}: ${precioComplemento()}, o incluido en ${COMPLETO.nombre}`,
                "Rondas a cocina con el nombre de la mesa",
                "Cuenta en vivo, pago dividido y boleta por ronda",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-hierba-600" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Boton href={RUTA_SALON} tam="lg" flecha>
                Ver la solución para salón
              </Boton>
              <span className="text-sm text-sand-700">
                Desde {soles(PLANES[0].precioMensual + COMPLEMENTO_MESA.precioMensual)} al mes con IGV
              </span>
            </div>
          </div>
          <div className="relative mx-auto hidden w-[12rem] sm:block lg:mr-6">
            <MarcoCelular>
              <Captura clave="mesa-ronda" sizes="192px" decorativa />
            </MarcoCelular>
            <div className="absolute -left-8 bottom-10">
              <Sello tono="cocina" giro={-7}>
                Ronda 2 · En cocina
              </Sello>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
