import AuroraBackground from "@/components/AuroraBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import CinematicChrome from "@/components/CinematicChrome";
import ScrollEngine from "@/components/ScrollEngine";
import ScrollGridMotion, {
  GridMotionMarqueeBand,
} from "@/components/ui/ScrollGridMotion";
import HeroSection from "@/components/sections/HeroSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import RitualSection from "@/components/sections/RitualSection";
import WhyDifferentSection from "@/components/sections/WhyDifferentSection";
import FormulationSection from "@/components/sections/FormulationSection";
import VisionSection from "@/components/sections/VisionSection";
import CrossSellSection from "@/components/sections/CrossSellSection";

export default function HomePage() {
  return (
    <>
      <AuroraBackground />
      <ScrollGridMotion />
      <Navbar />
      <ScrollEngine />

      <main className="shell">
        <HeroSection />
        <GridMotionMarqueeBand />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <RitualSection />
        <SectionDivider />
        <WhyDifferentSection />
        <SectionDivider />
        <FormulationSection />
        <GridMotionMarqueeBand />
        <SectionDivider />
        <VisionSection />
        <SectionDivider />
        <CrossSellSection />
      </main>

      <CinematicChrome />
      <Footer />
    </>
  );
}
