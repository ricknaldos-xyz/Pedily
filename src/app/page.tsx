import { Hero } from "@/components/sections/Hero";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingTable } from "@/components/sections/PricingTable";
import { Testimonials } from "@/components/sections/Testimonials";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BenefitsGrid />
      <FeatureShowcase />
      <HowItWorks />
      <PricingTable />
      <Testimonials />
      <ComparisonTable />
      <FAQ />
      <FinalCTA />
    </>
  );
}
