/**
 * Antes animaba al hacer scroll (framer-motion) y dejaba en blanco el
 * contenido a quien no hacía scroll, a los buscadores y a las capturas. Regla
 * de la landing v2: el movimiento nunca esconde contenido. Se conserva el
 * nombre para no romper las páginas que aún lo importan.
 */
export function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: string;
}) {
  return <div className={className}>{children}</div>;
}
