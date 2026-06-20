"use client";

import { motion } from "framer-motion";
import { MissionData } from "../../lib/mission-engine";
import { useEffect, useState } from "react";

function Counter({ target, duration = 2 }: { target: number, duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const update = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function MissionOverview({ mission }: { mission: MissionData }) {
  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center z-10">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Animated Counters */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="surface-panel p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-glow-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-4xl md:text-5xl font-black text-white mb-2 font-mono">
              <Counter target={mission.currentDay} />
              <span className="text-text-muted text-2xl">/1000</span>
            </div>
            <div className="text-xs tracking-widest text-text-muted uppercase font-bold">Current Day</div>
          </div>

          <div className="surface-panel p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-glow-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-4xl md:text-5xl font-black text-glow-secondary mb-2 font-mono">
              {mission.percentageComplete}%
            </div>
            <div className="text-xs tracking-widest text-text-muted uppercase font-bold">Complete</div>
          </div>

          <div className="surface-panel p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="text-4xl md:text-5xl font-black text-white mb-2 font-mono">
              <Counter target={mission.weeksCompleted} />
            </div>
            <div className="text-xs tracking-widest text-text-muted uppercase font-bold">Weeks Logged</div>
          </div>

          <div className="surface-panel p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="text-4xl md:text-5xl font-black text-white mb-2 font-mono">
              <Counter target={6} />
            </div>
            <div className="text-xs tracking-widest text-text-muted uppercase font-bold">Core Projects</div>
          </div>
          
          <div className="surface-panel p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="text-4xl md:text-5xl font-black text-white mb-2 font-mono">
              <Counter target={20} />+
            </div>
            <div className="text-xs tracking-widest text-text-muted uppercase font-bold">AWS Services</div>
          </div>

          <div className="surface-panel p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 border border-glow-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-4xl md:text-5xl font-black text-glow-primary mb-2 font-mono">
              <Counter target={220} />+
            </div>
            <div className="text-xs tracking-widest text-glow-primary/80 uppercase font-bold">Hours Invested</div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-glow-primary tracking-[0.2em] uppercase text-sm font-bold flex items-center gap-4">
            <span className="w-12 h-[1px] bg-glow-primary"></span>
            Mission Overview
          </h2>
          <h3 className="text-5xl md:text-7xl font-black text-white uppercase leading-[0.9]">
            THE<br/>MISSION
          </h3>
          <div className="mt-8 flex flex-col gap-4 text-2xl font-light text-text-secondary">
            <p><strong className="text-white font-bold">1000</strong> Days.</p>
            <p><strong className="text-white font-bold">One</strong> Engineer.</p>
            <p><strong className="text-white font-bold">One</strong> Roadmap.</p>
            <p className="text-glow-primary font-medium mt-4">One Commitment.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
