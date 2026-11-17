import { HeroHome } from "@/components/home/HeroHome";
import { HechosProducto } from "@/components/home/HechosProducto";
import { CintaCanales } from "@/components/home/CintaCanales";
import { RecorridoPedido } from "@/components/home/RecorridoPedido";
import { Asistente } from "@/components/home/Asistente";
import { PanelProtagonista } from "@/components/home/PanelProtagonista";
import { Mosaico } from "@/components/home/Mosaico";
import { BandaSalon } from "@/components/home/BandaSalon";
import { BandaIntegraciones } from "@/components/home/BandaIntegraciones";
import { Calculadora } from "@/components/sections/Calculadora";
import { PricingTable } from "@/components/sections/PricingTable";
import { Fundadores } from "@/components/sections/Fundadores";
import { Origen } from "@/components/sections/Origen";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQPageJsonLd } from "@/components/seo/JsonLd";

// Estructura: research_notes/Pedily landing v2 2026-11-15/01_benchmark.md §5.3
// (un pedido de punta a punta, con el panel como protagonista). 16-nov: banda
// hacia /para/restaurantes-con-salon y banda de integraciones (L-02).
// L-03 (16-nov, auditoría L-01 §4 P1-3/P1-6/P2-1): hechos comprobables justo
// bajo el hero, calculadora y fundadores arriba, y la home condensada. Lo que
// salió de aquí sigue en su página: «¿Te pasa esto?» (Dolor) en /soluciones,
// el personalizador en /demo, y la comparativa de canales y el alta en 4
// pasos en /precios.
export default function Home() {
  return (
    <>
      <FAQPageJsonLd />
      <HeroHome />
      <HechosProducto />
      <CintaCanales />
      <Calculadora />
      <Fundadores />
      <RecorridoPedido />
      <Asistente />
      <PanelProtagonista />
      <Mosaico compacto />
      <BandaIntegraciones />
      <BandaSalon />
      <PricingTable resumenMovil />
      <Origen />
      <FAQ />
      <FinalCTA />
    </>
  );
}
