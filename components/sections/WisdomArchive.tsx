"use client";

import { motion } from "framer-motion";

const lessons = [
  "The internet runs on DNS.",
  "Automation beats repetition.",
  "Monitoring matters.",
  "Simple systems scale better.",
  "Security is architecture.",
  "Consistency compounds.",
  "Systems fail.",
  "Observability matters.",
  "Documentation saves time.",
  "Progress beats perfection.",
  "The goal is not to know everything.",
  "The goal is to keep learning."
];

export default function WisdomArchive() {
  return (
    <section className="relative w-full py-40 px-6 flex flex-col items-center z-10 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-32 relative z-20"
      >
        <h2 className="text-glow-primary tracking-[0.2em] uppercase text-sm font-bold mb-4">Wisdom Archive</h2>
        <h3 className="text-4xl md:text-6xl font-black text-white uppercase">111 Days — 111 Lessons</h3>
      </motion.div>

      <div className="w-full max-w-7xl relative min-h-[600px]">
        {/* Floating Fragments */}
        {lessons.map((lesson, i) => {
          // Calculate random but deterministic spread
          const angle = (i / lessons.length) * Math.PI * 2;
          const radius = 250 + (i % 3) * 100;
          const left = `calc(50% + ${Math.cos(angle) * radius}px)`;
          const top = `calc(50% + ${Math.sin(angle) * radius * 0.6}px)`;
          
          return (
            <motion.div
              key={i}
              className="absolute whitespace-nowrap px-6 py-3 rounded-full border border-white/10 bg-surface-100/30 backdrop-blur-md text-text-secondary text-sm md:text-base font-medium shadow-xl cursor-default hover:border-glow-primary hover:text-white transition-colors duration-300"
              style={{ left, top, x: '-50%', y: '-50%' }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4 + (i % 3), 
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              >
                {lesson}
              </motion.div>
            </motion.div>
          );
        })}
        
        {/* Center glowing core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-glow-primary/5 rounded-full blur-2xl pointer-events-none" />
      </div>
    </section>
  );
}
