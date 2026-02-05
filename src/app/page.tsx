import { Hero } from "@/components/sections/Hero";
import { LogoBar } from "@/components/sections/LogoBar";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { ProductScreenshots } from "@/components/sections/ProductScreenshots";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { IntegrationLogos } from "@/components/sections/IntegrationLogos";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingTable } from "@/components/sections/PricingTable";
import { ROICalculator } from "@/components/sections/ROICalculator";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Testimonials } from "@/components/sections/Testimonials";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQPageJsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <FAQPageJsonLd />
      <Hero />
      <LogoBar />
      <BenefitsGrid />
      <ProductScreenshots />
      <FeatureShowcase />
      <IntegrationLogos />
      <HowItWorks />
      <PricingTable />
      <ROICalculator />
      <CaseStudy />
      <Testimonials />
      <ComparisonTable />
      <FAQ />
      <FinalCTA />
    </>
  );
}
