import type { Metadata } from "next";
import { DocsPage } from "@/components/layout/DocsPage";

export const metadata: Metadata = {
  title: "Documentacion - Pedily",
  description:
    "Documentacion tecnica completa de la plataforma Pedily. Aprende a configurar tu tienda online, gestionar pedidos y mas.",
};

export default function Docs() {
  return <DocsPage />;
}
