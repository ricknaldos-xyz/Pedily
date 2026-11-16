import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
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

const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

const TITULO =
  "Pedily · Pedidos por WhatsApp con IA, tienda web y boletas SUNAT para restaurantes";
const DESCRIPCION =
  "Tu WhatsApp toma pedidos solo, tu web vende sin comisión y la boleta sale sola. Tienda propia para restaurantes en Perú desde S/ 249 al mes con IGV, 0 % de comisión por pedido.";

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
        alt: "Pedily: tu WhatsApp toma pedidos solo, tu web vende sin comisión y la boleta sale sola",
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
      <body className={`${gabarito.variable} font-sans antialiased`}>
        <Header />
        <LayoutWrapper>{children}</LayoutWrapper>
        <WhatsAppButton />
      </body>
    </html>
  );
}
