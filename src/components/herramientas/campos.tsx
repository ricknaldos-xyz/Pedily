"use client";

import { useId } from "react";
import { clsx } from "clsx";

/** Campo numérico con prefijo/sufijo; acepta coma o punto decimal. */
export function CampoNumero({
  etiqueta,
  ayuda,
  valor,
  onChange,
  prefijo,
  sufijo,
  min = 0,
  max,
  paso = 1,
}: {
  etiqueta: string;
  ayuda?: string;
  valor: number;
  onChange: (v: number) => void;
  prefijo?: string;
  sufijo?: string;
  min?: number;
  max?: number;
  paso?: number;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-sand-800">
        {etiqueta}
      </label>
      <div className="mt-1 flex items-center rounded-xl border border-sand-300 bg-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200">
        {prefijo && <span className="pl-3 text-sm text-sand-500">{prefijo}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={paso}
          value={Number.isFinite(valor) ? valor : ""}
          onChange={(e) => {
            const n = Number(e.target.value.replace(",", "."));
            onChange(Number.isFinite(n) ? Math.max(min, max ? Math.min(max, n) : n) : 0);
          }}
          className="w-full min-w-0 rounded-xl bg-transparent px-3 py-2.5 text-base text-sand-900 outline-none"
        />
        {sufijo && <span className="pr-3 text-sm text-sand-500">{sufijo}</span>}
      </div>
      {ayuda && <p className="mt-1 text-xs text-sand-500">{ayuda}</p>}
    </div>
  );
}

export function Resultado({
  etiqueta,
  valor,
  tono = "neutro",
  detalle,
}: {
  etiqueta: string;
  valor: string;
  tono?: "neutro" | "bueno" | "malo";
  detalle?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl p-3 sm:p-4",
        tono === "bueno" && "bg-primary-50",
        tono === "malo" && "bg-accent-50",
        tono === "neutro" && "bg-sand-50"
      )}
    >
      <dt className="text-xs text-sand-600 sm:text-sm">{etiqueta}</dt>
      <dd
        className={clsx(
          "mt-1 text-xl font-extrabold sm:text-2xl",
          tono === "bueno" && "text-primary-700",
          tono === "malo" && "text-accent-700",
          tono === "neutro" && "text-sand-900"
        )}
      >
        {valor}
      </dd>
      {detalle && <p className="mt-0.5 text-xs text-sand-500">{detalle}</p>}
    </div>
  );
}

export function Tarjeta({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-white p-4 shadow-card sm:p-6">{children}</div>;
}
