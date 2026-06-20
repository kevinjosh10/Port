"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: "01",
    title: "S3 Backup Tool",
    desc: "Automated cloud backup system featuring incremental synchronization, encrypted storage, and lifecycle management."
  },
  {
    id: "02",
    title: "GitWrapped",
    desc: "Interactive GitHub analytics platform transforming engineering activity into visual insights."
  },
  {
    id: "03",
    title: "Cloud Morph",
    desc: "Serverless file transformation engine powered by event-driven AWS workflows."
  },
  {
    id: "04",
    title: "Cryptexa",
    desc: "Crypto intelligence platform revealing market behavior, manipulation patterns, sentiment trends, and hidden market dynamics."
  },
  {
    id: "05",
    title: "AWS Static Website Platform",
    desc: "Production-grade static hosting using S3, CloudFront, ACM, automation, and CI/CD."
  },
  {
    id: "06",
    title: "Smart Attendance System",
    desc: "Geolocation-based attendance platform with cloud integration and real-time validation."
  }
];

export default function ProjectVault() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 flex flex-col items-center z-10">
      
      {/* Subtle static background glow to replace laggy blur animation */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(77,166,255,0.05),transparent_50%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24 relative z-20"
      >
        <h2 className="text-glow-primary tracking-[0.2em] uppercase text-sm font-bold mb-4">Project Vault</h2>
        <h3 className="text-4xl md:text-6xl font-black text-white uppercase">Systems Engineered</h3>
      </motion.div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group [perspective:1000px] h-[320px]"
          >
            <div className="glass-panel p-8 flex flex-col h-full relative overflow-hidden transition-transform duration-500 ease-out group-hover:[transform:rotateX(5deg)_rotateY(-5deg)_scale(1.02)] group-hover:border-glow-primary/50 group-hover:shadow-[0_0_30px_rgba(77,166,255,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-br from-glow-primary/0 via-glow-primary/0 to-glow-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="font-mono text-xs text-text-muted mb-4 group-hover:text-glow-primary transition-colors">MISSION {project.id}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-text-muted font-light leading-relaxed flex-grow">
                  {project.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
