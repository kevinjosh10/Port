"use client";

import ScrollReveal from "../motion/ScrollReveal";
import { motion } from "framer-motion";

export default function AboutSection() {
  const quote = "I don't just write code. I build systems, products, and experiences.";
  const words = quote.split(" ");

  return (
    <section className="relative w-full py-32 px-6 bg-background z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        
        <div className="flex-1">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white/90">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-8">
          <ScrollReveal delay={0.2} className="glass-panel p-8 text-center">
            <div className="text-5xl font-bold text-neon-blue mb-2">1000+</div>
            <div className="text-white/60">Days Documented</div>
          </ScrollReveal>
          <ScrollReveal delay={0.4} className="glass-panel p-8 text-center">
            <div className="text-5xl font-bold text-neon-violet mb-2">15+</div>
            <div className="text-white/60">Products Shipped</div>
          </ScrollReveal>
          <ScrollReveal delay={0.6} className="glass-panel p-8 text-center">
            <div className="text-5xl font-bold text-neon-cyan mb-2">10M+</div>
            <div className="text-white/60">Requests Handled</div>
          </ScrollReveal>
          <ScrollReveal delay={0.8} className="glass-panel p-8 text-center">
            <div className="text-5xl font-bold text-white mb-2">100%</div>
            <div className="text-white/60">Obsession</div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
