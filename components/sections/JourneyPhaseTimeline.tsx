"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed } from "lucide-react";

interface PhaseProps {
  number: string;
  title: string;
  weeks: string;
  description: string;
  caption: string;
  isActive?: boolean;
  align?: "left" | "right";
}

function PhaseBox({ number, title, weeks, description, caption, isActive = false, align = "left" }: PhaseProps) {
  return (
    <div className={`relative w-full md:w-1/2 flex ${align === "left" ? "md:justify-end md:pr-16" : "md:ml-auto md:justify-start md:pl-16"} mb-24`}>
      {/* Orb connection line for desktop */}
      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-16 h-[2px] ${align === "left" ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"} from-glow-primary to-transparent opacity-30`} />
      
      <motion.div
        initial="dormant"
        whileInView="active"
        viewport={{ once: true, margin: "-200px" }}
        variants={{
          dormant: { opacity: 0.3, y: 50, filter: "brightness(0.5)" },
          active: { 
            opacity: 1, 
            y: 0, 
            filter: "brightness(1)",
            transition: { duration: 0.8, ease: "easeOut" }
          }
        }}
        className={`w-full max-w-lg relative group ${isActive ? "z-20" : "z-10"}`}
      >
        {/* Activation Flash & Permanent Glow */}
        <motion.div
          variants={{
            dormant: { opacity: 0 },
            active: { 
              opacity: [0, 1, 0.2], // Flash then settle
              transition: { duration: 1.5, times: [0, 0.2, 1] }
            }
          }}
          className={`absolute -inset-4 bg-glow-primary blur-2xl rounded-3xl ${isActive ? "opacity-30" : "opacity-0 group-hover:opacity-10 transition-opacity"}`}
        />

        <div className={`surface-panel p-8 relative overflow-hidden transition-all duration-500 ${isActive ? "border-glow-primary shadow-glow-primary" : "border-white/5"}`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-text-muted">BOX {number}</span>
              {isActive ? (
                <span className="px-2 py-1 rounded bg-glow-primary/10 text-glow-primary text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-glow-primary animate-pulse"/>
                  Current
                </span>
              ) : null}
            </div>
            <div className="text-text-muted font-mono text-sm">{weeks}</div>
          </div>

          <h3 className={`text-2xl font-bold mb-4 uppercase tracking-wide ${isActive ? "text-white" : "text-text-secondary"}`}>
            {title}
          </h3>
          
          <p className="text-text-muted font-light leading-relaxed mb-6">
            {description}
          </p>

          <div className={`pt-6 border-t border-white/5 flex items-start gap-3 font-medium ${isActive ? "text-glow-secondary" : "text-text-muted"}`}>
            {isActive ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <CircleDashed className="w-5 h-5 shrink-0 mt-0.5" />}
            <span className="italic">{caption}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function JourneyPhaseTimeline() {
  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center z-10 overflow-hidden">
      
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-32 relative z-20"
      >
        <h2 className="text-glow-primary tracking-[0.2em] uppercase text-sm font-bold mb-4">Milestones</h2>
        <h3 className="text-4xl md:text-6xl font-black text-white uppercase">The Journey Timeline</h3>
      </motion.div>

      <div className="w-full max-w-6xl relative flex flex-col">
        {/* The center line tracking the orb conceptually */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />

        <PhaseBox 
          number="01"
          title="Foundation Phase"
          weeks="Weeks 1–4"
          description="Mastering Linux Administration, systemd, Bash scripting, TCP/IP networking, AWS VPCs, route tables, subnets, NAT gateways, and cloud foundations."
          caption="Learning how the internet actually works."
          align="left"
        />

        <PhaseBox 
          number="02"
          title="Automation Phase"
          weeks="Weeks 5–8"
          description="Scaling through code. Transitioning from manual work to automation using Python, OOP, boto3, CLI tools, infrastructure scripts, and monitoring systems."
          caption="Replacing manual work with code."
          align="right"
        />

        <PhaseBox 
          number="03"
          title="Production Phase"
          weeks="Weeks 9–11"
          description="Building for production. Engineered CI/CD pipelines with GitHub Actions, testing workflows, Git best practices, and secure AWS three-tier architectures."
          caption="Building systems the right way."
          align="left"
        />

        <PhaseBox 
          number="04"
          title="Serverless Architectures"
          weeks="Weeks 12–15"
          description="Designing event-driven systems using Lambda, API Gateway, SNS, SQS, EventBridge, DynamoDB, and CloudWatch."
          caption="Building event-driven cloud systems."
          align="right"
          isActive={true}
        />
      </div>
    </section>
  );
}
