import { Hero } from "@/components/sections/Hero";
import { Dolor } from "@/components/sections/Dolor";
import { RecorridoPedido } from "@/components/sections/RecorridoPedido";
import { ComparativaCanales } from "@/components/sections/ComparativaCanales";
import { CanalesPropios } from "@/components/sections/CanalesPropios";
import { ClientesQueVuelven } from "@/components/sections/ClientesQueVuelven";
import { Origen } from "@/components/sections/Origen";
import { Fundadores } from "@/components/sections/Fundadores";
import { AbreTuTienda } from "@/components/sections/AbreTuTienda";
import { PricingTable } from "@/components/sections/PricingTable";
import { Calculadora } from "@/components/sections/Calculadora";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQPageJsonLd } from "@/components/seo/JsonLd";

// Estructura: research_notes/Pedily landing auditoría 2026-11-14,
// 01_copy_conversion.md §5 ajustada por 02_benchmark_landings.md §4.
export default function Home() {
  return (
    <>
      <FAQPageJsonLd />
      <Hero />
      <Dolor />
      <RecorridoPedido />
      <ComparativaCanales />
      <CanalesPropios />
      <ClientesQueVuelven />
      <Origen />
      <Fundadores />
      <AbreTuTienda />
      <PricingTable />
      <Calculadora />
      <FAQ />
      <FinalCTA />
    </>
  );
}
