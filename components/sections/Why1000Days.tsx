"use client";

import { motion } from "framer-motion";

export default function Why1000Days() {
  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center justify-center z-10 min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-4xl relative"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-glow-primary/5 blur-3xl rounded-[3rem]" />
        
        {/* Panel */}
        <div className="relative glass-panel p-12 md:p-20 text-center rounded-[3rem] overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tight"
          >
            Why 1000 Days?
          </motion.h2>

          <div className="flex flex-col gap-8 text-xl md:text-3xl font-light text-text-secondary leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Most people quit when <span className="text-glow-secondary font-medium">motivation fades</span>.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              This project isn't about motivation.<br/>
              It's about <span className="text-white font-bold">consistency</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-8 flex flex-col gap-4 font-medium"
            >
              <p className="text-glow-primary text-2xl md:text-4xl font-bold">1000 days.</p>
              <p>Every day documented.</p>
              <p>Every lesson shipped.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="pt-8 text-text-muted font-mono tracking-widest text-sm md:text-base uppercase flex justify-center gap-6"
            >
              <span>No shortcuts.</span>
              <span className="text-glow-primary/50">•</span>
              <span>No excuses.</span>
              <span className="text-glow-primary/50">•</span>
              <span className="text-white">Just progress.</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
