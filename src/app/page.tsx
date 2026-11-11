import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { ProductScreenshots } from "@/components/sections/ProductScreenshots";
import { BotShowcase } from "@/components/sections/BotShowcase";
import { OperationsShowcase } from "@/components/sections/OperationsShowcase";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { IntegrationLogos } from "@/components/sections/IntegrationLogos";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingTable } from "@/components/sections/PricingTable";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQPageJsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <FAQPageJsonLd />
      <Hero />
      <TrustStrip />
      <BenefitsGrid />
      <ProductScreenshots />
      <BotShowcase />
      <OperationsShowcase />
      <FeatureShowcase />
      <IntegrationLogos />
      <HowItWorks />
      <PricingTable />
      <CaseStudy />
      <ComparisonTable />
      <FAQ />
      <FinalCTA />
    </>
  );
}
