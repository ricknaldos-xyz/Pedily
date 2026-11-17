import { HeroHome } from "@/components/home/HeroHome";
import { CintaCanales } from "@/components/home/CintaCanales";
import { Dolor } from "@/components/home/Dolor";
import { RecorridoPedido } from "@/components/home/RecorridoPedido";
import { Asistente } from "@/components/home/Asistente";
import { PanelProtagonista } from "@/components/home/PanelProtagonista";
import { Mosaico } from "@/components/home/Mosaico";
import { BandaSalon } from "@/components/home/BandaSalon";
import { BandaIntegraciones } from "@/components/home/BandaIntegraciones";
import { Personalizador } from "@/components/home/Personalizador";
import { ComparativaCanales } from "@/components/sections/ComparativaCanales";
import { Calculadora } from "@/components/sections/Calculadora";
import { PricingTable } from "@/components/sections/PricingTable";
import { AbreTuTienda } from "@/components/sections/AbreTuTienda";
import { Fundadores } from "@/components/sections/Fundadores";
import { Origen } from "@/components/sections/Origen";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQPageJsonLd } from "@/components/seo/JsonLd";

// Estructura: research_notes/Pedily landing v2 2026-11-15/01_benchmark.md §5.3
// (home de 14 secciones contada como «un pedido de punta a punta», con el
// panel como protagonista). 16-nov: banda hacia /para/restaurantes-con-salon
// y banda de integraciones hacia /integraciones (L-02).
export default function Home() {
  return (
    <>
      <FAQPageJsonLd />
      <HeroHome />
      <CintaCanales />
      <Dolor />
      <RecorridoPedido />
      <Asistente />
      <PanelProtagonista />
      <Mosaico />
      <BandaIntegraciones />
      <BandaSalon />
      <Personalizador />
      <ComparativaCanales />
      <Calculadora />
      <PricingTable />
      <AbreTuTienda />
      <Fundadores />
      <Origen />
      <FAQ />
      <FinalCTA />
    </>
  );
}
