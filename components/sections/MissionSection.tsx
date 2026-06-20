"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MissionSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Parallax text */}
        <motion.div style={{ y: y1 }} className="absolute whitespace-nowrap text-[20vw] font-bold text-white/[0.02] -z-10 leading-none">
          PHILOSOPHY
        </motion.div>
        
        <div className="max-w-4xl px-6 text-center z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
          >
            WHY I BUILD
          </motion.h2>
          
          <motion.div style={{ y: y2 }} className="text-2xl md:text-4xl text-white/80 font-light leading-relaxed">
            Driven by curiosity. Focused on innovation. 
            Designing architectures that scale and products that create long-term impact.
          </motion.div>
        </div>
      </div>
    </section>
  );
}
