"use client";

import MagneticButton from "../motion/MagneticButton";
import ScrollReveal from "../motion/ScrollReveal";

export default function ContactSection() {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center bg-background border-t border-white/5 py-32 overflow-hidden z-10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center px-6">
        <ScrollReveal>
          <h2 className="text-5xl md:text-8xl lg:text-[120px] font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/30">
            LET&apos;S BUILD
          </h2>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-16 text-white/50">
            SOMETHING REMARKABLE.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <MagneticButton className="px-12 py-6 rounded-full glass-panel text-white text-xl hover:text-neon-cyan hover:border-neon-cyan/50 hover:shadow-neon-cyan transition-all font-medium tracking-wide">
            START THE CONVERSATION
          </MagneticButton>
        </ScrollReveal>
      </div>
      
      <div className="absolute bottom-10 left-0 w-full text-center text-white/30 text-sm font-mono">
        &copy; {new Date().getFullYear()} The Builder. All rights reserved.
      </div>
    </section>
  );
}
