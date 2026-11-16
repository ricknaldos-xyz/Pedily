"use client";

import { useState } from "react";
import { CampoNumero, Resultado, Tarjeta } from "./campos";
import { soles } from "@/lib/planes";
import { REQUISITOS_MYPE, TASAS_MYPE_RESTAURANTE } from "@/lib/herramientas";

const TASA_GENERAL = 18;

function pct(n: number) {
  return `${String(n).replace(".", ",")} %`;
}

/** Impuesto contenido en un monto que ya lo incluye. */
export function impuestoIncluido(total: number, tasa: number) {
  const base = total / (1 + tasa / 100);
  return { base, impuesto: total - base };
}

export function CalculadoraIgv() {
  const [ventas, setVentas] = useState(30000);
  const [precio, setPrecio] = useState(34);
  const [cumple, setCumple] = useState<boolean[]>(REQUISITOS_MYPE.map(() => true));
  const esMype = cumple.every(Boolean);

  const filas = TASAS_MYPE_RESTAURANTE.map((t) => {
    const tasa = esMype ? t.total : TASA_GENERAL;
    const { base, impuesto } = impuestoIncluido(ventas, tasa);
    return { ...t, tasa, base, impuesto };
  });
  const [y26, y27] = filas;
  const subida = y27.impuesto - y26.impuesto;
  // Para recibir lo mismo (sin impuesto) en 2027 que en 2026.
  const precio2027 = precio * ((1 + y27.tasa / 100) / (1 + y26.tasa / 100));

  return (
    <Tarjeta>
      <div className="grid gap-4 sm:grid-cols-2">
        <CampoNumero
          etiqueta="Ventas del mes (con impuesto incluido)"
          valor={ventas}
          onChange={setVentas}
          prefijo="S/"
          max={100000000}
          paso={100}
        />
        <CampoNumero
          etiqueta="Precio de un plato hoy"
          ayuda="Para ver a cuánto subirlo en 2027 y recibir lo mismo."
          valor={precio}
          onChange={setPrecio}
          prefijo="S/"
          max={100000}
          paso={0.5}
        />
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-sand-800">
          ¿Cumples los requisitos de la tasa especial?
        </legend>
        <ul className="mt-2 space-y-2">
          {REQUISITOS_MYPE.map((r, i) => (
            <li key={r}>
              <label className="flex items-start gap-2 text-sm text-sand-700">
                <input
                  type="checkbox"
                  checked={cumple[i]}
                  onChange={(e) =>
                    setCumple((c) => c.map((v, j) => (j === i ? e.target.checked : v)))
                  }
                  className="mt-0.5 h-4 w-4 flex-shrink-0 accent-primary-600"
                />
                {r}
              </label>
            </li>
          ))}
        </ul>
        <p
          className={
            esMype
              ? "mt-3 rounded-lg bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-800"
              : "mt-3 rounded-lg bg-accent-50 px-3 py-2 text-sm font-semibold text-accent-700"
          }
          aria-live="polite"
        >
          {esMype
            ? "Te corresponde la tasa especial de restaurantes MYPE."
            : "Sin todos los requisitos pagas la tasa general de 18 %."}
        </p>
      </fieldset>

      <div className="mt-5 overflow-hidden rounded-xl border border-sand-200">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Impuesto por año sobre tus ventas del mes</caption>
          <thead className="bg-sand-50 text-xs text-sand-600">
            <tr>
              <th scope="col" className="px-3 py-2 font-semibold">Año</th>
              <th scope="col" className="px-3 py-2 font-semibold">Tasa</th>
              <th scope="col" className="px-3 py-2 text-right font-semibold">Impuesto al mes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {filas.map((f) => (
              <tr key={f.anio}>
                <th scope="row" className="px-3 py-2 font-semibold text-sand-900">
                  {f.anio === "2028" ? "2028 en adelante" : f.anio}
                </th>
                <td className="px-3 py-2 text-sand-700">
                  {pct(f.tasa)}
                  {esMype && f.anio !== "2028" && (
                    <span className="block text-xs text-sand-500">
                      IGV {pct(f.igv)} + IPM {pct(f.ipm)}
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 text-right font-semibold text-sand-900">
                  {soles(f.impuesto)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 sm:gap-3" aria-live="polite">
        <Resultado
          etiqueta="Pagarías de más cada mes en 2027"
          valor={soles(subida)}
          tono={subida > 0 ? "malo" : "neutro"}
          detalle={`${soles(subida * 12)} en el año`}
        />
        <Resultado
          etiqueta={`Tu plato de ${soles(precio, 2)} en 2027`}
          valor={soles(precio2027, 2)}
          tono="neutro"
          detalle="Para recibir lo mismo sin impuesto"
        />
      </dl>
      <p className="mt-3 text-xs leading-relaxed text-sand-500">
        Es el impuesto de tus ventas (débito fiscal), antes de restar el IGV de
        tus compras (crédito fiscal). No incluye impuesto a la renta.
      </p>
    </Tarjeta>
  );
}
