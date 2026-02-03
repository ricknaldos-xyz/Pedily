import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

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
  ],
  openGraph: {
    title: "Pedily - Tu negocio digital, listo en minutos",
    description:
      "Recibe pedidos online, gestiona tu operacion y crece tu negocio. Sin comisiones por pedido.",
    type: "website",
    locale: "es_PE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <Header />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
