"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Lock, Unlock } from "lucide-react";

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
    desc: "Crypto intelligence platform revealing market behavior, manipulation patterns, sentiment trends, and hidden market dynamics.",
    isClassified: true
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

function ClassifiedCard({ project }: { project: any }) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div 
      className="glass-panel p-8 flex flex-col h-full relative overflow-hidden group cursor-pointer"
      onClick={() => setUnlocked(true)}
    >
      <div className={`absolute inset-0 bg-red-900/20 transition-opacity duration-1000 ${unlocked ? 'opacity-0' : 'opacity-100'}`} />
      <div className={`absolute inset-0 bg-glow-primary/10 transition-opacity duration-1000 ${unlocked ? 'opacity-100' : 'opacity-0'}`} />
      
      {!unlocked ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-surface-200/90 backdrop-blur-sm transition-all duration-1000">
          <Lock className="w-12 h-12 text-red-500 mb-4" />
          <div className="text-red-500 font-mono text-sm tracking-[0.2em] uppercase font-bold animate-pulse text-center px-4">
            Classified Project Detected<br/>
            <span className="text-xs text-text-muted mt-2 block font-normal cursor-pointer hover:text-white transition-colors">Click To Decrypt</span>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none opacity-0 animate-[flash_2s_ease-out_forwards]">
          <Unlock className="w-16 h-16 text-glow-primary mb-4" />
          <div className="text-white font-mono text-xl tracking-widest uppercase">Decrypted</div>
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className="font-mono text-xs text-glow-primary mb-4">MISSION {project.id}</div>
        <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
        <p className="text-text-muted font-light leading-relaxed flex-grow">
          {project.desc}
        </p>
      </div>
    </div>
  );
}

export default function ProjectVault() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 flex flex-col items-center z-10">
      
      {/* Massive energy pulse on entrance */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.5, 2, 3] }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-glow-primary/20 rounded-full blur-[100px] pointer-events-none"
        />
      )}

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
            {project.isClassified ? (
              <ClassifiedCard project={project} />
            ) : (
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
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
