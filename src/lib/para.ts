/**
 * Páginas por tipo de restaurante (/para/<slug>). Añadido 16-nov
 * (`pedily/_notas/plan/D-decisiones-2026-11-15.md`): la primera es para
 * restaurantes con salón. Se enlazan desde el menú, el pie y la portada, y la
 * guarda comprueba que cada una esté en el sitemap y enlazada.
 */
export const PAGINAS_PARA = [
  {
    slug: "restaurantes-con-salon",
    nombre: "Restaurantes con salón",
    linea: "QR de mesa que cobra, carta por QR, cocina y caja",
  },
] as const;

export const RUTA_PARA = (slug: string) => `/para/${slug}`;
export const RUTA_SALON = RUTA_PARA("restaurantes-con-salon");
