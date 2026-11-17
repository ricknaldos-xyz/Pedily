import { clsx } from "clsx";
import { BellRing } from "lucide-react";

/**
 * El dato clave del panel, en grande y legible (auditoría L-01 §4 P1-7).
 * Las cifras salen tal cual de la captura real `public/capturas/panel/pedidos.webp`
 * (LV2-C, «Restaurante Demo»): alarma «NUEVO PEDIDO PAGADO #RD001412 · Delivery ·
 * S/ 119.00», «54 Hoy» y «Meta del día: 136 %». Si se regenera la captura, hay
 * que actualizar estas cifras.
 */
export const DATO_ALARMA = {
  pedido: "#RD001412",
  tipo: "Delivery",
  total: "S/ 119,00",
  hoy: 54,
  meta: "136 %",
} as const;

export function TarjetaAlarma({ className, compacta = false }: { className?: string; compacta?: boolean }) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-2xl border-2 border-tinta bg-white text-tinta shadow-[0_8px_0_0_#24102e]",
        className
      )}
    >
      <p className="flex items-center gap-2 bg-rocoto-600 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-white">
        <BellRing aria-hidden className="h-4 w-4 shrink-0 motion-safe:animate-pulse" />
        Nuevo pedido pagado
      </p>
      <div className={clsx("px-3.5", compacta ? "py-2.5" : "py-3.5")}>
        <p className="font-mono text-[12px] font-semibold text-sand-700">
          {DATO_ALARMA.pedido} · {DATO_ALARMA.tipo}
        </p>
        <p className={clsx("font-display font-extrabold leading-none tracking-[-0.02em]", compacta ? "mt-1 text-[1.9rem]" : "mt-1.5 text-[2.6rem]")}>
          {DATO_ALARMA.total}
        </p>
        <div className="mt-2.5 flex items-center justify-between gap-3">
          <p className="text-[12px] leading-tight text-sand-700">
            <strong className="font-mono text-tinta">{DATO_ALARMA.hoy}</strong> pedidos hoy
            {compacta ? " · " : <br />}
            meta del día <strong className="font-mono text-hierba-700">{DATO_ALARMA.meta}</strong>
          </p>
          <span aria-hidden className={clsx("rounded-lg bg-tinta px-3 py-1.5 text-[12px] font-semibold text-white", compacta && "hidden")}>
            Atender
          </span>
        </div>
      </div>
    </div>
  );
}
