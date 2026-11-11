import { Container } from "./Container";
import {
  SOCIAL_LINKS,
  CONTACT_EMAIL,
  whatsappLink,
} from "@/lib/site";

const productLinks = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#bot-ia", label: "Bot WhatsApp con IA" },
  { href: "/precios", label: "Precios" },
  { href: "#faq", label: "Preguntas frecuentes" },
];

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  Facebook: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  TikTok: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  LinkedIn: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

const companyLinks = [
  { href: "/contacto", label: "Contacto" },
  { href: "/legal/terminos", label: "Terminos y condiciones" },
  { href: "/legal/privacidad", label: "Politica de privacidad" },
];

export function Footer() {
  return (
    <footer className="bg-sand-50">
      {/* Gradient separator */}
      <div className="h-px bg-sand-200" />

      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
                <span className="text-xs font-bold text-white">P</span>
              </div>
              <span className="text-xl font-bold text-sand-900">
                Pedily
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-sand-500">
              El sistema operativo de tu restaurante. Vende por web, WhatsApp y
              kiosko, y opera todo desde un solo Hub. Sin comisiones.
            </p>
            {/* Contacto */}
            <div className="mt-5 space-y-1.5 text-sm">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium text-primary-700 transition-colors hover:text-primary-800"
              >
                Escríbenos por WhatsApp →
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="block text-sand-500 transition-colors hover:text-primary-600"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            {/* Social links (solo los configurados) */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="mt-5 flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-sand-400 transition-all hover:bg-sand-100 hover:text-sand-700"
                  >
                    {socialIcons[social.name]}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-sand-900">Producto</h3>
            <ul className="mt-3 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm leading-relaxed text-sand-500 transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-sand-900">Empresa</h3>
            <ul className="mt-3 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm leading-relaxed text-sand-500 transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-sand-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-sand-400">
              &copy; {new Date().getFullYear()} Pedily. Todos los derechos reservados.
            </p>
            <p className="flex items-center gap-1.5 text-sm text-sand-400">
              Hecho con <span className="text-red-400">&#9829;</span> en Peru
              <span className="inline-block text-base">🇵🇪</span>
              por{" "}
              <span className="font-medium text-sand-500">
                Hub de Innovacion Digital SAC
              </span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
