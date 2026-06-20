"use client";

import { motion } from "framer-motion";
import { MissionData } from "../../lib/mission-engine";
import { Terminal, Calendar, Target, Clock, Activity } from "lucide-react";
import { useEffect, useState } from "react";

function Counter({ target, duration = 2 }: { target: number, duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const update = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easeProgress * target);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  // Format nicely with one decimal place for percentages
  return <span>{count.toFixed(1)}</span>;
}

export default function MissionTimeline({ mission }: { mission: MissionData }) {
  // Segmented progress calculation
  const totalSegments = 40;
  const activeSegments = Math.floor((mission.percentageComplete / 100) * totalSegments);

  return (
    <section className="relative w-full py-24 px-6 flex flex-col items-center z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl"
      >
        {/* Advanced HUD Card Container */}
        <div className="relative p-[1px] rounded-[2rem] overflow-hidden group">
          {/* Animated border gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-glow-primary via-surface-300 to-glow-secondary opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Main Card Body */}
          <div className="relative bg-surface-200/95 backdrop-blur-3xl rounded-[2rem] h-full p-8 md:p-12 overflow-hidden">
            
            {/* Tech Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-200/95 via-transparent to-surface-200/95 pointer-events-none" />

            {/* Header Section */}
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-6 mb-10 gap-4">
              <div className="flex items-center gap-4 bg-black/40 px-6 py-3 rounded-full border border-white/5">
                <Terminal className="w-5 h-5 text-glow-primary animate-pulse" />
                <span className="font-mono text-sm tracking-widest text-text-muted flex items-center gap-2">
                  SYSTEM STATUS:
                  <div className="flex items-center gap-1.5 ml-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-[ping_2s_ease-out_infinite]" />
                    <span className="text-green-400 font-bold">ACTIVE</span>
                  </div>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-6 rounded-sm ${i < 3 ? 'bg-glow-primary' : 'bg-surface-300'} animate-pulse`} style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Core Data Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Dates */}
              <div className="flex flex-col gap-10">
                <div className="group/item">
                  <div className="flex items-center gap-3 text-glow-secondary mb-3 opacity-80 group-hover/item:opacity-100 transition-opacity">
                    <Calendar className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-widest font-bold">Mission Initialization</span>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight mb-1">
                    Day 1
                  </div>
                  <div className="text-text-muted font-mono text-sm uppercase tracking-wider">{mission.startDate}</div>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent" />

                <div className="group/item">
                  <div className="flex items-center gap-3 text-glow-primary mb-3 opacity-80 group-hover/item:opacity-100 transition-opacity">
                    <Target className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-widest font-bold">Target Trajectory</span>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight mb-1">
                    {mission.endDate}
                  </div>
                  <div className="text-text-muted font-mono text-sm uppercase tracking-wider">(1000-Day Mission)</div>
                </div>
              </div>

              {/* Middle Column: Massive Progress Readout */}
              <div className="lg:col-span-2 flex flex-col justify-center bg-black/20 rounded-3xl p-8 border border-white/5 relative overflow-hidden">
                {/* Decorative scanning light */}
                <div className="absolute top-0 bottom-0 left-[-100%] w-1/2 bg-gradient-to-r from-transparent via-glow-primary/10 to-transparent animate-[scan_3s_linear_infinite]" />

                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-glow-primary" />
                    <span className="text-sm font-mono tracking-widest text-text-muted uppercase">Global Progress</span>
                  </div>
                  <div className="text-right">
                    <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-glow-primary to-glow-secondary font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(77,166,255,0.5)]">
                      <Counter target={mission.percentageComplete} />%
                    </span>
                  </div>
                </div>

                {/* Advanced Segmented Progress Bar */}
                <div className="w-full relative z-10">
                  <div className="flex justify-between w-full gap-1 mb-2">
                    {[...Array(totalSegments)].map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scaleY: 0 }}
                        whileInView={{ opacity: 1, scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.02, duration: 0.3 }}
                        className={`h-8 flex-1 rounded-sm ${
                          i < activeSegments 
                            ? 'bg-glow-primary shadow-[0_0_10px_rgba(77,166,255,0.8)]' 
                            : 'bg-surface-300/50'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-text-muted/50 mt-2 uppercase tracking-widest">
                    <span>0% (Initialization)</span>
                    <span className="text-glow-primary/70">{mission.percentageComplete}% (Current)</span>
                    <span>100% (Completion)</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
