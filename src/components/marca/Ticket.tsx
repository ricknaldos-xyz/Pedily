import { clsx } from "clsx";

/**
 * Tira de ticket térmico: papel, borde dentado arriba y abajo, líneas
 * punteadas y números en mono. Es la pieza base de las tarjetas flotantes y de
 * cada parada del pedido.
 */
export function Ticket({
  children,
  className,
  as: Tag = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "figure";
  style?: React.CSSProperties;
}) {
  return (
    <Tag style={style} className={clsx("text-tinta [filter:drop-shadow(0_10px_14px_rgba(36,16,46,0.18))]", className)}>
      <div className="ticket h-full px-4 py-4">{children}</div>
    </Tag>
  );
}

/** Fila «concepto ...... monto» de un ticket. */
export function FilaTicket({
  concepto,
  monto,
  fuerte = false,
}: {
  concepto: React.ReactNode;
  monto: React.ReactNode;
  fuerte?: boolean;
}) {
  return (
    <div className={clsx("flex items-baseline gap-2 font-mono text-[12px]", fuerte && "font-bold text-[13px]")}>
      <span className="min-w-0">{concepto}</span>
      <span aria-hidden className="punteado mb-1 flex-1 text-tinta/30" />
      <span className="whitespace-nowrap">{monto}</span>
    </div>
  );
}

export function Corte() {
  return <div aria-hidden className="punteado my-2 text-tinta/30" />;
}
