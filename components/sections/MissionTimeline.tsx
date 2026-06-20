"use client";

import { motion } from "framer-motion";
import { MissionData } from "../../lib/mission-engine";
import { Terminal, Calendar, Target, Clock } from "lucide-react";

export default function MissionTimeline({ mission }: { mission: MissionData }) {
  return (
    <section className="relative w-full py-24 px-6 flex flex-col items-center z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        {/* OS Dashboard Card */}
        <div className="glass-panel p-1 rounded-3xl relative group">
          {/* Animated Glow Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-glow-primary/0 via-glow-primary/30 to-glow-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="bg-surface-200/90 rounded-[22px] p-8 md:p-12 relative z-10 border border-white/5 backdrop-blur-2xl">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-glow-primary" />
                <span className="font-mono text-sm tracking-widest text-text-muted">SYSTEM STATUS: <span className="text-green-400">ACTIVE</span></span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-glow-secondary mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest font-bold">Mission Started</span>
                </div>
                <div className="text-3xl font-bold text-white">Day 1</div>
                <div className="text-text-muted font-mono">{mission.startDate}</div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-glow-primary mb-2">
                  <Target className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest font-bold">Target Completion</span>
                </div>
                <div className="text-3xl font-bold text-white">{mission.endDate}</div>
                <div className="text-text-muted font-mono">(1000-Day Mission)</div>
              </div>

            </div>

            {/* Progress Bar */}
            <div className="mt-12">
              <div className="flex justify-between text-xs font-mono text-text-muted mb-3">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4"/> PROGRESS</div>
                <div>{mission.percentageComplete}%</div>
              </div>
              <div className="h-2 w-full bg-surface-300 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${mission.percentageComplete}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-glow-secondary to-glow-primary relative"
                >
                  <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-[2px]" />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
