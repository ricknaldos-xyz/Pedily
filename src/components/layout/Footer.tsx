import { Container } from "./Container";

const productLinks = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#precios", label: "Precios" },
  { href: "#faq", label: "Preguntas frecuentes" },
];

const resourceLinks = [
  { href: "/docs", label: "Documentacion" },
  { href: "#", label: "Centro de ayuda" },
  { href: "#", label: "Blog" },
];

const companyLinks = [
  { href: "#", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/legal/terminos", label: "Terminos y condiciones" },
  { href: "/legal/privacidad", label: "Politica de privacidad" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-xl font-extrabold text-primary-600">
              Pedily
            </span>
            <p className="mt-3 text-sm text-slate-500">
              Recibe pedidos por web, WhatsApp y kiosko. Todo en un solo lugar,
              sin comisiones.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Producto</h3>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Recursos</h3>
            <ul className="mt-3 space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Empresa</h3>
            <ul className="mt-3 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Pedily. Hecho con{" "}
            <span className="text-red-400">&#9829;</span> en Peru por{" "}
            <span className="font-medium text-slate-500">
              Hub de Innovacion Digital SAC
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
