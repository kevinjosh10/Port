"use client";

import { motion } from "framer-motion";
import { MissionData } from "../../lib/mission-engine";
import { Mail, Link, Terminal } from "lucide-react";

export default function FinalContact({ mission }: { mission: MissionData }) {
  return (
    <section className="relative w-full min-h-screen py-32 px-6 flex flex-col items-center justify-center z-10 overflow-hidden">
      
      {/* Dynamic Counters */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center mb-24 relative z-20"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex flex-col items-center">
            <span className="text-6xl md:text-8xl font-black text-white font-mono">{mission.currentDay}</span>
            <span className="text-text-muted tracking-[0.3em] uppercase text-sm mt-4">Days Complete</span>
          </div>
          
          <div className="hidden md:block w-[1px] h-32 bg-white/10" />
          
          <div className="flex flex-col items-center">
            <span className="text-6xl md:text-8xl font-black text-glow-primary font-mono">{mission.remainingDays}</span>
            <span className="text-glow-primary/70 tracking-[0.3em] uppercase text-sm mt-4">Days Remaining</span>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 text-2xl md:text-4xl font-light text-text-secondary">
          <p>The systems get larger.</p>
          <p>The problems get harder.</p>
          <p className="text-white font-bold mt-4">The mission continues.</p>
        </div>
      </motion.div>

      {/* Contact Terminal */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full max-w-4xl relative z-20 mt-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <a 
            href="mailto:kingkevinjosh7@gmail.com" 
            className="group relative surface-panel p-8 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-glow-primary/50 hover:shadow-glow-primary"
          >
            <div className="absolute inset-0 bg-glow-primary/0 group-hover:bg-glow-primary/5 transition-colors duration-500" />
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:text-glow-primary">
              <Mail className="w-8 h-8" />
            </div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-2">Transmit Signal</h4>
            <span className="text-text-muted text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">mailto:kingkevinjosh7</span>
          </a>

          <a 
            href="https://www.linkedin.com/in/kevin-josh10" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative surface-panel p-8 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-glow-secondary/50 hover:shadow-glow-secondary"
          >
            <div className="absolute inset-0 bg-glow-secondary/0 group-hover:bg-glow-secondary/5 transition-colors duration-500" />
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:text-glow-secondary">
              <Link className="w-8 h-8" />
            </div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-2">Connect to Network</h4>
            <span className="text-text-muted text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">/in/kevin-josh10</span>
          </a>

          <a 
            href="https://github.com/kevinjosh10" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative surface-panel p-8 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:text-white">
              <Terminal className="w-8 h-8" />
            </div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-2">Engineering Logs</h4>
            <span className="text-text-muted text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">/kevinjosh10</span>
          </a>

        </div>
      </motion.div>

      {/* Orb Ending Sequence Space */}
      <div className="h-64" />
      
    </section>
  );
}
