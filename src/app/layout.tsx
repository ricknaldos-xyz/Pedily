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

const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pedily - El sistema operativo de tu restaurante",
  description:
    "Vende por web, WhatsApp con IA y kiosko, y opera todo desde un solo lugar: pedidos, cocina, inventario, finanzas y facturacion SUNAT. Sin comisiones por pedido.",
  keywords: [
    "pedidos online",
    "restaurante digital",
    "plataforma pedidos",
    "delivery",
    "menu digital",
    "SaaS restaurantes",
    "bot whatsapp restaurante",
    "kiosko autoservicio",
    "pedily",
  ],
  authors: [{ name: "Hub de Innovacion Digital SAC" }],
  creator: "Pedily",
  publisher: "Hub de Innovacion Digital SAC",
  metadataBase: new URL("https://pedily.com"),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Pedily - El sistema operativo de tu restaurante",
    description:
      "Vende por web, WhatsApp con IA y kiosko. Opera pedidos, inventario, finanzas y facturacion SUNAT desde un solo Hub. Sin comisiones por pedido.",
    type: "website",
    locale: "es_PE",
    url: "https://pedily.com",
    siteName: "Pedily",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Pedily - Plataforma de pedidos para restaurantes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedily - El sistema operativo de tu restaurante",
    description:
      "Vende por web, WhatsApp con IA y kiosko, y opera todo desde un Hub. Sin comisiones por pedido.",
    images: ["/og-image.svg"],
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
    <html lang="es">
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
