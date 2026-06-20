import dynamic from "next/dynamic";
import AboutSection from "../components/sections/AboutSection";
import MissionSection from "../components/sections/MissionSection";
import CapabilitiesSection from "../components/sections/CapabilitiesSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ContactSection from "../components/sections/ContactSection";

const HeroSection = dynamic(() => import("../components/sections/HeroSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("../components/sections/ProjectsSection"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <ProjectsSection />
      <CapabilitiesSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
