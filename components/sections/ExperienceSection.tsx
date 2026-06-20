"use client";

import ScrollReveal from "../motion/ScrollReveal";

const experiences = [
  { year: "2024", role: "AI Infrastructure Lead", company: "NextGen Cloud" },
  { year: "2022", role: "Senior Full Stack Engineer", company: "DataScale" },
  { year: "2020", role: "Creative Developer", company: "Studio Void" },
];

export default function ExperienceSection() {
  return (
    <section className="relative w-full py-32 bg-background z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center text-white/90">
            THE JOURNEY
          </h2>
        </ScrollReveal>

        {/* Central glowing laser */}
        <div className="absolute left-[24px] md:left-1/2 top-48 bottom-0 w-[2px] bg-gradient-to-b from-neon-blue via-neon-violet to-transparent md:-translate-x-1/2 shadow-neon-blue" />

        <div className="space-y-24 relative z-10">
          {experiences.map((exp, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
              
              {/* Timeline Node */}
              <div className="absolute left-[-5px] md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-neon-cyan md:-translate-x-1/2 z-20 shadow-neon-cyan" />

              <div className="w-full md:w-[45%] pl-12 md:pl-0">
                <ScrollReveal delay={0.2} yOffset={20}>
                  <div className={`glass-panel p-8 hover:border-neon-cyan/50 transition-colors ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    <div className="text-neon-cyan font-mono mb-2">{exp.year}</div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                    <div className="text-white/60">{exp.company}</div>
                  </div>
                </ScrollReveal>
              </div>
              
              <div className="hidden md:block w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
