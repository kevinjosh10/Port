"use client";

import { motion } from "framer-motion";
import { CheckSquare, Square } from "lucide-react";

export default function RoadmapConsole() {
  const completed = [
    "Lambda", "API Gateway", "SNS", "SQS", "EventBridge", "CloudWatch"
  ];
  
  const nextTargets = [
    "Terraform", "Docker", "Kubernetes", "AI Infrastructure", "Distributed Systems"
  ];

  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center justify-center z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl relative"
      >
        {/* Holographic Projection Base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-glow-primary/20 blur-[80px] rounded-full pointer-events-none" />
        
        {/* Console Container */}
        <div className="glass-panel border-glow-primary/30 p-8 md:p-16 relative overflow-hidden backdrop-blur-2xl">
          {/* Holographic scanline */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(77,166,255,0)_0%,rgba(77,166,255,0.05)_50%,rgba(77,166,255,0)_100%)] bg-[length:100%_10px] animate-[scan_10s_linear_infinite] pointer-events-none" />

          <div className="text-center mb-16 relative z-10">
            <h2 className="text-glow-primary tracking-[0.2em] uppercase text-sm font-bold mb-4">Engineering Roadmap</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Mission Planning Console</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            
            {/* Completed */}
            <div>
              <div className="border-b border-white/10 pb-4 mb-6">
                <h4 className="text-xl font-bold text-white tracking-widest uppercase">Current Focus</h4>
              </div>
              <ul className="flex flex-col gap-4">
                {completed.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-glow-secondary font-mono"
                  >
                    <CheckSquare className="w-5 h-5 text-glow-primary" />
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Next Targets */}
            <div>
              <div className="border-b border-white/10 pb-4 mb-6">
                <h4 className="text-xl font-bold text-white tracking-widest uppercase">Next Targets</h4>
              </div>
              <ul className="flex flex-col gap-4">
                {nextTargets.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-text-muted font-mono"
                  >
                    <Square className="w-5 h-5" />
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
