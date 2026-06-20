"use client";

import { Canvas } from "@react-three/fiber";
import HeroParticleSphere from "../3d/HeroParticleSphere";
import ScrollReveal from "../motion/ScrollReveal";
import MagneticButton from "../motion/MagneticButton";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <HeroParticleSphere />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center pointer-events-none">
        <ScrollReveal yOffset={100} delay={0.2}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
            DESIGNING.<br />BUILDING.<br />SCALING.
          </h1>
        </ScrollReveal>
        
        <ScrollReveal yOffset={50} delay={0.8} className="mt-12 pointer-events-auto">
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl font-light">
            I build systems, products, and experiences for the future of the web.
          </p>
        </ScrollReveal>

        <ScrollReveal yOffset={50} delay={1.2} className="mt-16 pointer-events-auto">
          <MagneticButton className="px-8 py-4 rounded-full glass-panel text-white hover:text-neon-blue transition-colors font-medium tracking-wide">
            EXPLORE THE WORK
          </MagneticButton>
        </ScrollReveal>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce pointer-events-none">
        <div className="w-1 h-16 rounded-full bg-gradient-to-b from-neon-blue to-transparent opacity-50" />
      </div>
    </section>
  );
}
