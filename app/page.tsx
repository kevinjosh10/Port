"use client";

import { getMissionData } from "../lib/mission-engine";
import dynamic from "next/dynamic";

// Dynamic imports for heavy or interactive components
const OrbJourney = dynamic(() => import("../components/orb/OrbJourney"), { ssr: false });
const HeroSection = dynamic(() => import("../components/sections/HeroSection"));
const MissionOverview = dynamic(() => import("../components/sections/MissionOverview"));
const MissionTimeline = dynamic(() => import("../components/sections/MissionTimeline"));
const Why1000Days = dynamic(() => import("../components/sections/Why1000Days"));
const JourneyPhaseTimeline = dynamic(() => import("../components/sections/JourneyPhaseTimeline"));
const EngineeringLog = dynamic(() => import("../components/sections/EngineeringLog"));
const ProjectVault = dynamic(() => import("../components/sections/ProjectVault"));
const SkillConstellation = dynamic(() => import("../components/sections/SkillConstellation"), { ssr: false });
const RoadmapConsole = dynamic(() => import("../components/sections/RoadmapConsole"));
const FinalContact = dynamic(() => import("../components/sections/FinalContact"));

export default function Home() {
  const mission = getMissionData();

  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col items-center selection:bg-glow-primary/30">
      {/* Central Scrolling Orb System */}
      <OrbJourney />

      {/* Narrative Sections */}
      <div className="w-full relative z-10 flex flex-col items-center">
        <HeroSection mission={mission} />
        <MissionOverview mission={mission} />
        <MissionTimeline mission={mission} />
        <Why1000Days />
        <JourneyPhaseTimeline />
        <EngineeringLog mission={mission} />
        <ProjectVault />
        <SkillConstellation />
        <RoadmapConsole />
        <FinalContact mission={mission} />
      </div>
    </main>
  );
}
