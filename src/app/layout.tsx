import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
  SoftwareApplicationJsonLd,
} from "@/components/seo/JsonLd";
import { EMPRESA } from "@/lib/site";

// Sistema «la comanda» (benchmark §5.6): Bricolage Grotesque para titulares,
// Figtree para texto y JetBrains Mono para precios, números de pedido y horas.
//
// Servidas desde el repo (G-11): `next/font/google` las descargaba al compilar
// y a veces fallaba. Solo el subconjunto latino y los pesos que se usan, en
// woff2 de @fontsource 5.3.0 (las mismas instancias estáticas de Google
// Fonts). Licencia SIL Open Font License 1.1: `src/app/fonts/LICENSE-*.txt`.
const bricolage = localFont({
  src: [
    { path: "./fonts/bricolage-grotesque-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/bricolage-grotesque-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/bricolage-grotesque-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
const figtree = localFont({
  src: [
    { path: "./fonts/figtree-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/figtree-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/figtree-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/figtree-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-figtree",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
const jetbrains = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jetbrains-mono-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jetbrains",
  display: "swap",
  // Solo etiquetas pequeñas: no compite con el titular por la red.
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

const TITULO =
  "Pedily · Sistema para restaurantes: WhatsApp con IA, tienda web, cocina, caja y SUNAT";
const DESCRIPCION =
  "Vende directo y la comisión se queda contigo: asistente de WhatsApp que conversa y cobra, tienda web, kiosko y QR de mesa, cocina, caja, boletas SUNAT, inventario y reportes en un solo panel. Desde S/ 249 al mes con IGV, 0 % de comisión.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  authors: [{ name: EMPRESA.razonSocial }],
  creator: "Pedily",
  publisher: EMPRESA.razonSocial,
  metadataBase: new URL("https://pedily.vercel.app"),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    type: "website",
    locale: "es_PE",
    url: "https://pedily.vercel.app",
    siteName: "Pedily",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pedily: tu WhatsApp toma pedidos y tu web vende sin comisión, desde S/ 249 al mes con IGV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE">
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <SoftwareApplicationJsonLd />
      </head>
      <body className={`${bricolage.variable} ${figtree.variable} ${jetbrains.variable} font-sans antialiased`}>
        <Header />
        <LayoutWrapper>{children}</LayoutWrapper>
        <WhatsAppButton />
      </body>
    </html>
  );
}
