"use client";

import ScrollReveal from "../motion/ScrollReveal";

const capabilities = [
  { title: "AI Systems", desc: "LLM Orchestration, RAG, Agentic Workflows" },
  { title: "Product Engineering", desc: "Next.js, React, Scalable UI/UX" },
  { title: "Full Stack Development", desc: "Node.js, Python, PostgreSQL, Redis" },
  { title: "Automation", desc: "CI/CD, GitHub Actions, Terraform" },
  { title: "Growth Systems", desc: "Analytics, A/B Testing, SEO Optimization" },
];

export default function CapabilitiesSection() {
  return (
    <section className="relative w-full py-32 px-6 bg-background z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-white/90">
            SYSTEMS & CAPABILITIES
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="glass-panel p-8 group transition-all duration-300 hover:border-neon-violet/50 hover:shadow-neon-violet cursor-default">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-violet transition-colors">
                  {cap.title}
                </h3>
                <p className="text-white/60">
                  {cap.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
