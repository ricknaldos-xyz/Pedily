import Link from "next/link";
import { clsx } from "clsx";

const OTRAS = [
  { href: "/legal/terminos", texto: "Términos y condiciones" },
  { href: "/legal/privacidad", texto: "Política de privacidad" },
];

/**
 * Marco de las páginas legales con el sistema «la comanda». Solo estilo: el
 * texto legal llega como `children` sin tocar (los h2, h3, listas y enlaces se
 * pintan con las variantes de abajo y con `.legal` de globals.css).
 */
export function PaginaLegal({
  titulo,
  actualizado,
  ruta,
  children,
}: {
  titulo: string;
  actualizado: string;
  ruta: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="papel-trama border-b border-dashed border-tinta/20">
        <div className="mx-auto max-w-3xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-16">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">Legal</p>
          <h1 className="mt-3 font-display text-[2.3rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-tinta text-balance sm:text-5xl">
            {titulo}
          </h1>
          <p className="mt-4 inline-block rounded-md border-2 border-tinta/15 bg-white px-2.5 py-1 font-mono text-xs text-sand-700">
            {actualizado}
          </p>
          <nav aria-label="Páginas legales" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {OTRAS.map((o) => (
                <li key={o.href}>
                  <Link
                    href={o.href}
                    aria-current={o.href === ruta ? "page" : undefined}
                    className={clsx(
                      "inline-flex min-h-10 items-center rounded-full border-2 px-4 text-sm font-semibold",
                      o.href === ruta ? "border-tinta bg-aji-500 text-tinta" : "border-tinta/15 bg-white text-sand-700 hover:border-tinta/40"
                    )}
                  >
                    {o.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <section className="bg-white py-12 sm:py-16">
        <div
          className={clsx(
            "legal mx-auto max-w-3xl space-y-4 px-4 text-[1rem] text-sand-700 sm:px-6",
            "[&_h2]:mt-12 [&_h2]:border-t [&_h2]:border-dashed [&_h2]:border-tinta/20 [&_h2]:pt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-[-0.02em]",
            "[&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-tinta",
            "[&_strong]:text-tinta [&_a]:font-semibold [&_a]:underline-offset-2 [&_a]:break-words",
            "[&_ul]:marker:text-chicha-600"
          )}
        >
          {children}
        </div>
      </section>
    </>
  );
}
