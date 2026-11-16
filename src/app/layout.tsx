import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
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
const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});
const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const TITULO =
  "Pedily · Sistema para restaurantes: WhatsApp con IA, tienda web, cocina, caja y SUNAT";
const DESCRIPCION =
  "Todo tu restaurante en un sistema: asistente de WhatsApp que conversa y cobra, tienda web, kiosko y QR de mesa, cocina, caja, boletas SUNAT, inventario y reportes. Desde S/ 249 al mes con IGV, 0 % de comisión.";

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
        alt: "Pedily: todo tu restaurante en un sistema, sin comisión",
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
