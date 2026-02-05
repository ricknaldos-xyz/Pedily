import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
  SoftwareApplicationJsonLd,
} from "@/components/seo/JsonLd";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pedily - Tu negocio digital, listo en minutos",
  description:
    "Plataforma de pedidos online para restaurantes, pastelerias y negocios de comida. Sin comisiones por pedido. Tu marca, tu control.",
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
    title: "Pedily - Recibe pedidos por web, WhatsApp y kiosko",
    description:
      "Plataforma multicanal para restaurantes. Sin comisiones por pedido. Bot WhatsApp con IA, kiosko de autoservicio, facturacion SUNAT. Desde S/ 249/mes.",
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
    title: "Pedily - Tu negocio digital, listo en minutos",
    description:
      "Recibe pedidos por web, WhatsApp y kiosko. Sin comisiones. Desde S/ 249/mes.",
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
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <Header />
        <LayoutWrapper>{children}</LayoutWrapper>
        <WhatsAppButton />
      </body>
    </html>
  );
}
