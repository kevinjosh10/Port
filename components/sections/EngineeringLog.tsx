"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MissionData } from "../../lib/mission-engine";

export default function EngineeringLog({ mission }: { mission: MissionData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [displayedText, setDisplayedText] = useState("");
  
  const fullText = `$ mission-status

Current Day: ${mission.currentDay}

Current Focus:
- AWS Lambda
- API Gateway
- SNS
- SQS
- EventBridge
- CloudWatch

Latest Project:
GitWrapped

Progress:
${mission.currentDay} / 1000 Days

Status:
MISSION ACTIVE`;

  useEffect(() => {
    if (!isInView) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) {
        clearInterval(interval);
      }
    }, 20); // Typing speed

    return () => clearInterval(interval);
  }, [isInView, fullText]);

  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center justify-center z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl relative"
        ref={containerRef}
      >
        {/* Terminal Boot Glow */}
        <div className="absolute -inset-4 bg-glow-primary/20 blur-3xl rounded-[2rem] opacity-50" />
        
        <div className="relative bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Header Bar */}
          <div className="bg-[#151515] px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <div className="ml-4 font-mono text-xs text-text-muted">engineering-log ~ bash</div>
          </div>

          {/* Terminal Body */}
          <div className="p-8 md:p-12 font-mono text-sm md:text-base text-glow-primary min-h-[400px] relative">
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
            
            <pre className="whitespace-pre-wrap leading-relaxed relative z-10">
              {displayedText}
              {isInView && <span className="animate-pulse inline-block w-2.5 h-5 bg-glow-primary translate-y-1 ml-1" />}
            </pre>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
