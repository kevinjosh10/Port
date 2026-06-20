"use client";

import { motion } from "framer-motion";
import { 
  Server, Database, Shield, Network, Globe, Zap, Lock, Cpu, Waypoints,
  Bell, ListTree, Activity, LineChart, Maximize, GitMerge, HardDrive, FolderOpen,
  Code2, Terminal, Wrench, Cloud as CloudIcon, GitBranch, Repeat, Eye, Settings, FileJson
} from "lucide-react";

// Map skills to icons
const skillData = [
  { name: "EC2", icon: Server },
  { name: "S3", icon: Database },
  { name: "IAM", icon: Shield },
  { name: "VPC", icon: Network },
  { name: "Route 53", icon: Globe },
  { name: "CloudFront", icon: Zap },
  { name: "ACM", icon: Lock },
  { name: "Lambda", icon: Cpu },
  { name: "API Gateway", icon: Waypoints },
  { name: "DynamoDB", icon: Database },
  { name: "SNS", icon: Bell },
  { name: "SQS", icon: ListTree },
  { name: "EventBridge", icon: Activity },
  { name: "CloudWatch", icon: LineChart },
  { name: "Auto Scaling", icon: Maximize },
  { name: "ELB", icon: GitMerge },
  { name: "RDS", icon: Database },
  { name: "EBS", icon: HardDrive },
  { name: "EFS", icon: FolderOpen },
  { name: "Python", icon: Code2 },
  { name: "Bash", icon: Terminal },
  { name: "Boto3", icon: Wrench },
  { name: "JSON", icon: FileJson },
  { name: "REST APIs", icon: CloudIcon },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: GitBranch },
  { name: "CI/CD", icon: Repeat },
  { name: "Monitoring", icon: Eye },
  { name: "Linux", icon: Settings },
  { name: "TCP/IP", icon: Network }
];

export default function SkillConstellation() {
  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center z-10 overflow-hidden">
      
      {/* Headings */}
      <div className="text-center z-20 mb-20 w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-glow-primary tracking-[0.2em] uppercase text-sm font-bold mb-4"
        >
          Cloud Architecture
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-white uppercase"
        >
          Unlocked Achievements
        </motion.h3>
      </div>

      {/* 2D Floating Cloud Container */}
      <div className="relative z-20 w-full max-w-6xl flex flex-wrap justify-center gap-6 md:gap-8">
        {skillData.map((node, i) => {
          const Icon = node.icon;
          
          // Generate a deterministic random floating animation for each card
          const floatDuration = 4 + (i % 3) * 1.5;
          const floatDelay = (i % 5) * 0.4;
          const yOffset = 10 + (i % 3) * 5;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.08 }} // Stagger one by one
            >
              <motion.div
                animate={{ y: [0, -yOffset, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: floatDuration,
                  ease: "easeInOut",
                  delay: floatDelay
                }}
                className="flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl bg-surface-200/10 backdrop-blur-md border border-white/10 shadow-xl hover:border-glow-primary hover:shadow-[0_0_25px_rgba(77,166,255,0.4)] hover:bg-surface-200/30 transition-all duration-500 w-28 h-28 md:w-32 md:h-32 cursor-default group"
              >
                <Icon 
                  className="w-10 h-10 md:w-12 md:h-12 text-text-muted group-hover:text-glow-primary transition-colors duration-300 mb-3" 
                  strokeWidth={1.5} 
                />
                <span className="text-xs md:text-sm font-bold text-white text-center leading-tight tracking-wider uppercase">
                  {node.name}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Central subtle glow behind the cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-glow-primary/5 blur-[120px] rounded-[100%] pointer-events-none z-0" />
      
    </section>
  );
}
