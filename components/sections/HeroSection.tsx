"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MissionData } from "../../lib/mission-engine";

export default function HeroSection({ mission }: { mission: MissionData }) {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-background overflow-hidden z-10">
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 pointer-events-none mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-2 uppercase">
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
          <div className="px-6 py-2 rounded-full border border-glow-primary/30 bg-glow-primary/5 text-glow-primary font-mono text-sm tracking-widest backdrop-blur-sm">
            {mission.currentDay} DAYS INTO A 1000-DAY MISSION
          </div>
          
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

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-12 flex flex-col items-center gap-3 text-text-muted/50 z-20"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-mono">Scroll To Begin Mission</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-glow-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
