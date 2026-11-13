import type { Metadata } from "next";
import Hero from "@/components/Hero";
import StrategicInitiatives from "@/components/StrategicInitiatives";
import InitiativePhotoShowcase from "@/components/InitiativePhotoShowcase";
import JoinSection from "@/components/JoinSection";

export const metadata: Metadata = {
  title: "Strategic Initiatives & Projects",
  description:
    "Explore Move for Disability 2026 in Dar es Salaam, the Tanzania Physiotherapy Career Fair in Zanzibar, assistive device distribution, and clinical outreach.",
};

export default function InitiativesPage() {
  return (
    <>
      <Hero
        title="Inclusion in Action."
        description="Our strategic initiatives bridge Tanzania’s mobility gap, provide vital assistive devices, and open career pathways for the next generation of physiotherapists."
        actionHref="#strategic-initiatives"
        actionLabel="Explore Activities & Projects"
        secondaryHref="/donate"
        secondaryLabel="Sponsor Assistive Devices"
      />
      <StrategicInitiatives full />
      <InitiativePhotoShowcase />
      <JoinSection />
    </>
  );
}
