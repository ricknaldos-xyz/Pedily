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
      <label htmlFor={id} className="block text-sm font-semibold text-tinta">
        {etiqueta}
      </label>
      <div className="mt-1.5 flex min-h-12 items-center rounded-xl border-2 border-tinta/15 bg-white focus-within:border-chicha-600 focus-within:ring-2 focus-within:ring-chicha-600/20">
        {prefijo && <span className="pl-3 font-mono text-sm text-sand-700">{prefijo}</span>}
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
          className="w-full min-w-0 rounded-xl bg-transparent px-3 py-2.5 font-mono text-base font-semibold text-tinta outline-none"
        />
        {sufijo && <span className="pr-3 font-mono text-sm text-sand-700">{sufijo}</span>}
      </div>
      {ayuda && <p className="mt-1 text-xs text-sand-700">{ayuda}</p>}
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
        "min-w-0 rounded-xl border-2 p-3 sm:p-4",
        tono === "bueno" && "border-hierba-600 bg-hierba-50",
        tono === "malo" && "border-rocoto-300 bg-rocoto-50",
        tono === "neutro" && "border-tinta/10 bg-papel"
      )}
    >
      <dt className="text-xs leading-snug text-sand-700 sm:text-sm">{etiqueta}</dt>
      <dd
        className={clsx(
          "mt-1 break-words font-mono text-xl font-bold sm:text-2xl",
          tono === "bueno" && "text-hierba-700",
          tono === "malo" && "text-rocoto-600",
          tono === "neutro" && "text-tinta"
        )}
      >
        {valor}
      </dd>
      {detalle && <p className="mt-0.5 text-xs leading-snug text-sand-700">{detalle}</p>}
    </div>
  );
}

/** Marco de la calculadora: tarjeta con borde de comanda y sombra dura. */
export function Tarjeta({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border-2 border-tinta bg-white p-4 shadow-[0_8px_0_0_#24102e] sm:p-6">{children}</div>
  );
}
