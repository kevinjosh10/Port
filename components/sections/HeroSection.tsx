"use client";

import { motion } from "framer-motion";
import { MissionData } from "../../lib/mission-engine";

export default function HeroSection({ mission }: { mission: MissionData }) {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden z-10">
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 pointer-events-none mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-2 uppercase bg-gradient-to-r from-glow-primary via-white to-glow-primary bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text">
            Kevin Joshua
          </h1>
          <h2 className="text-2xl md:text-4xl text-glow-primary font-light tracking-widest uppercase mb-6">
            1st Year CSE
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-xl md:text-2xl text-text-muted max-w-2xl font-light mt-6">
            Building cloud systems, AI infrastructure, and distributed architectures designed for scale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-8 text-text-secondary font-medium text-sm md:text-base tracking-wide">
            <span>Every day documented.</span>
            <span className="hidden sm:block text-white/20">•</span>
            <span>Every system engineered.</span>
            <span className="hidden sm:block text-white/20">•</span>
            <span>Every lesson shipped.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
