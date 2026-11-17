import Link from "next/link";
import { PAGINAS_PARA, RUTA_PARA } from "@/lib/para";
import { Logo } from "@/components/marca/Logo";
import { SOCIAL_LINKS, CONTACT_EMAIL, whatsappLink, DEMO, EMPRESA, RESTAURANTE_ORIGEN } from "@/lib/site";
import { HERRAMIENTAS } from "@/lib/herramientas";
import { GRUPOS, RUTA_SOLUCION, solucionesDe } from "@/lib/soluciones";

const PRODUCTO = [
  { href: "/panel", label: "El panel por dentro" },
  { href: "/soluciones", label: "Todas las soluciones" },
  { href: "/integraciones", label: "Integraciones" },
  ...PAGINAS_PARA.map((p) => ({ href: RUTA_PARA(p.slug), label: `Para ${p.nombre.toLowerCase()}` })),
  { href: "/precios", label: "Precios" },
  { href: "/demo", label: "Demos para probar" },
  { href: DEMO.tiendaUrl, label: "Tienda de ejemplo" },
  { href: DEMO.kioskoUrl, label: "Kiosko de ejemplo" },
];

const EMPRESA_LINKS = [
  { href: "/contacto", label: "Contacto" },
  { href: "/#faq", label: "Preguntas frecuentes" },
  { href: "/legal/terminos", label: "Términos y condiciones" },
  { href: "/legal/privacidad", label: "Política de privacidad" },
];

function Columna({ titulo, enlaces }: { titulo: string; enlaces: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-aji-400">{titulo}</h2>
      <ul className="mt-3 space-y-1">
        {enlaces.map((l) => (
          <li key={l.href}>
            {l.href.startsWith("http") ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-block py-1 text-[0.92rem] text-chicha-100 hover:text-white hover:underline">
                {l.label} ↗
              </a>
            ) : (
              <Link href={l.href} className="inline-block py-1 text-[0.92rem] text-chicha-100 hover:text-white hover:underline">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const waHref = whatsappLink();
  return (
    <footer className="relative bg-tinta pb-24 text-white lg:pb-0">
      {/* Borde de ticket */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-[7px] h-[8px] bg-[radial-gradient(circle_at_7px_0,transparent_5px,#24102e_5.5px)] bg-[length:14px_8px] bg-repeat-x"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_3fr]">
          <div>
            <Logo claro />
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-chicha-100">
              Todo tu restaurante en un sistema: tienda web, WhatsApp con IA, kiosko y QR de mesa para vender; cocina,
              caja, boletas e inventario para operar. 0 % de comisión por pedido.
            </p>
            <p className="mt-3 text-sm text-chicha-100">
              Nació en {RESTAURANTE_ORIGEN.nombre}, {RESTAURANTE_ORIGEN.ciudad}.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              {waHref ? (
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-aji-400 hover:underline">
                  Escríbenos por WhatsApp →
                </a>
              ) : (
                <Link href="/contacto" className="font-semibold text-aji-400 hover:underline">
                  Escríbenos →
                </Link>
              )}
              {CONTACT_EMAIL && (
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-chicha-100 hover:text-white">
                  {CONTACT_EMAIL}
                </a>
              )}
            </div>
            {SOCIAL_LINKS.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3 text-sm">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-chicha-100 hover:text-white">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
            {GRUPOS.map((g) => (
              <Columna
                key={g.id}
                titulo={g.nombre}
                enlaces={solucionesDe(g.id).map((s) => ({ href: RUTA_SOLUCION(s.slug), label: s.nombre }))}
              />
            ))}
            <Columna titulo="Producto" enlaces={PRODUCTO} />
            <Columna
              titulo="Gratis"
              enlaces={[
                ...HERRAMIENTAS.map((h) => ({ href: `/herramientas/${h.slug}`, label: h.titulo })),
                { href: "/herramientas", label: "Todas las herramientas" },
              ]}
            />
            <Columna titulo="Empresa" enlaces={EMPRESA_LINKS} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-dashed border-white/20 pt-6 text-sm text-chicha-100 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Pedily. Hecho en {EMPRESA.pais}.</p>
          <p>
            {EMPRESA.razonSocial}
            {EMPRESA.ruc && <> · RUC {EMPRESA.ruc}</>}
            {EMPRESA.domicilioFiscal && <> · {EMPRESA.domicilioFiscal}</>}
          </p>
        </div>
      </div>
    </footer>
  );
}
