import Link from "next/link";

/**
 * CTA fijo abajo en móvil (benchmark §2: solo Toast y Restaurant.pe lo
 * dejan a la vista). No tapa contenido: el pie reserva su alto.
 */
export function BarraMovil() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-tinta/10 bg-papel/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[1fr_1.3fr] gap-2">
        <Link href="/demo" className="flex min-h-12 items-center justify-center rounded-xl border-2 border-tinta/15 bg-white text-[0.95rem] font-semibold text-tinta">
          Ver la demo
        </Link>
        <Link
          href="/contacto"
          className="flex min-h-12 items-center justify-center rounded-xl border-2 border-tinta bg-aji-500 text-[0.95rem] font-semibold text-tinta"
        >
          Crear mi tienda
        </Link>
      </div>
    </div>
  );
}
