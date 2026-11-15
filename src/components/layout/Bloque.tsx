import { clsx } from "clsx";

/** Sección de la portada con el mismo aire en todas (móvil primero). */
export function Bloque({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={clsx("scroll-mt-16 py-9 sm:py-20", className)}>
      {children}
    </section>
  );
}
