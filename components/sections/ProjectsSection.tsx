"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverCard from "../ui/HoverCard";

// Need to register ScrollTrigger in the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "CloudWeaver",
    problem: "Manual cloud infrastructure provisioning is slow and error-prone.",
    solution: "Production-ready cloud architecture generator built with Next.js and Terraform.",
    impact: "Reduced infrastructure setup time by 80%."
  },
  {
    title: "Cloud-Morph",
    problem: "Complex serverless media processing pipelines are hard to scale.",
    solution: "Serverless, event-driven file processing platform on AWS.",
    impact: "Processes 10k+ files daily with 99.9% uptime."
  },
  {
    title: "Cryptexa",
    problem: "Crypto analytics lack real-time insights and predictive modeling.",
    solution: "Futuristic crypto analytics platform with AI-driven signals.",
    impact: "Grew to 5,000 active traders in the first month."
  },
  {
    title: "1000-Days AI/Cloud Journey",
    problem: "Knowledge retention across complex domains requires consistent practice.",
    solution: "Daily log of Linux, AWS, and Python mastery via public building.",
    impact: "Built a community of 20k+ followers."
  },
  {
    title: "AWS Static Website Platform",
    problem: "Hosting static sites securely with global CDN is often overcomplicated.",
    solution: "Production-grade hosting via S3, CloudFront, ACM.",
    impact: "Deployed 50+ sites with sub-50ms global latency."
  }
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrapperRef.current) return;
      const cards = gsap.utils.toArray(".project-card");
      
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          end: () => "+=" + wrapperRef.current?.offsetWidth
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-background overflow-hidden flex items-center">
      <div className="absolute top-20 left-10 text-5xl md:text-8xl font-bold text-white/5 z-0 pointer-events-none">
        THE CENTERPIECE
      </div>
      
      <div ref={wrapperRef} className="flex gap-8 px-10 md:px-[20vw] relative z-10 w-max">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card w-[85vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 flex items-center h-full">
            <HoverCard className="w-full min-h-[400px]">
              <div className="text-neon-blue font-mono text-sm tracking-widest mb-4">0{idx + 1}</div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white">{project.title}</h3>
              
              <div className="space-y-4 text-white/80">
                <div>
                  <span className="text-neon-violet font-semibold">Problem:</span> {project.problem}
                </div>
                <div>
                  <span className="text-neon-cyan font-semibold">Solution:</span> {project.solution}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <span className="text-neon-blue font-semibold">Impact:</span> {project.impact}
                </div>
              </div>
            </HoverCard>
          </div>
        ))}
      </div>
    </section>
  );
}
