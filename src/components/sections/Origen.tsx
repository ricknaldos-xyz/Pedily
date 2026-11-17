import { Building2, ChefHat } from "lucide-react";
import { EMPRESA, RESTAURANTE_ORIGEN } from "@/lib/site";

/**
 * Caso de origen (sin cifras, decisión del 15-nov) y quién está detrás.
 * PENDIENTE (L-03, auditoría L-01 §4 P1-3a): una cita con nombre y foto del
 * dueño del restaurante de origen iría aquí, pero falta su permiso por escrito.
 * No se pone ni se inventa. El RUC y el domicilio salen solos cuando se
 * carguen en `EMPRESA` (src/lib/site.ts); el dueño los deja para el final.
 */
export function Origen() {
  return (
    <section id="quien" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-[1.3fr_1fr] lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-tinta p-6 text-white sm:p-10">
          <ChefHat aria-hidden className="h-8 w-8 text-aji-400" />
          <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-aji-400">Nació en una cocina real</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-5xl">
            Nació en {RESTAURANTE_ORIGEN.nombre}
          </h2>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-chicha-100">
            Pedily no se diseñó en una oficina. Nació y se probó en {RESTAURANTE_ORIGEN.nombre}, un restaurante de{" "}
            {RESTAURANTE_ORIGEN.ciudad} que vende así todos los días: web, WhatsApp, kiosko y reparto en un solo panel. Es el
            mismo sistema que usa su cocina.
          </p>
        </div>
        <div className="rounded-3xl border border-tinta/10 bg-white p-6 sm:p-10">
          <Building2 aria-hidden className="h-8 w-8 text-chicha-600" />
          <h2 className="mt-5 font-display text-2xl font-extrabold leading-tight text-tinta sm:text-3xl">Quién está detrás</h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-sand-700">
            Una empresa peruana: <strong className="text-tinta">{EMPRESA.razonSocial}</strong>. Contratos bajo ley peruana,
            precios en soles con IGV y atención en español de aquí.
          </p>
          {(EMPRESA.ruc || EMPRESA.domicilioFiscal) && (
            <dl className="mt-3 space-y-1 text-sm text-sand-700">
              {EMPRESA.ruc && (
                <div>
                  <dt className="inline font-semibold">RUC: </dt>
                  <dd className="inline">{EMPRESA.ruc}</dd>
                </div>
              )}
              {EMPRESA.domicilioFiscal && (
                <div>
                  <dt className="inline font-semibold">Domicilio fiscal: </dt>
                  <dd className="inline">{EMPRESA.domicilioFiscal}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
