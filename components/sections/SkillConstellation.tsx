"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
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
  { name: "GitHub Actions", icon: Repeat },
  { name: "CI/CD", icon: Repeat },
  { name: "Monitoring", icon: Eye },
  { name: "Linux", icon: Settings },
  { name: "Systemd", icon: Settings },
  { name: "SSH", icon: Terminal },
  { name: "DNS", icon: Globe },
  { name: "TCP/IP", icon: Network }
];

function SkillCloud() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate random stable positions for nodes in a cloud (spherical volume)
  const nodes = useMemo(() => {
    return skillData.map((data) => {
      // Create a spherical distribution cluster
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 5.5; // Radius of the cloud

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      return { ...data, position: new THREE.Vector3(x, y, z) };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow ambient rotation of the entire cloud
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.02) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central glow core */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#4DA6FF" transparent opacity={0.05} />
      </mesh>
      
      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <group key={i} position={node.position}>
            <Html transform sprite center distanceFactor={8}>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-200/40 backdrop-blur-md border border-white/10 shadow-lg hover:border-glow-primary hover:shadow-[0_0_20px_rgba(77,166,255,0.4)] hover:bg-surface-200/80 transition-all duration-300 w-24 h-24 cursor-pointer group">
                <Icon className="w-8 h-8 text-text-muted group-hover:text-glow-primary transition-colors duration-300 mb-2" strokeWidth={1.5} />
                <span className="text-[11px] font-bold text-white text-center leading-tight tracking-wide uppercase">
                  {node.name}
                </span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function SkillConstellation() {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex flex-col items-center justify-center z-10 bg-background overflow-hidden">
      
      <div className="absolute top-32 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none w-full px-6">
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

      <div className="absolute inset-0 z-0 cursor-move">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <fog attach="fog" args={['#050505', 5, 20]} />
          <ambientLight intensity={0.5} />
          <SkillCloud />
        </Canvas>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted text-xs uppercase tracking-widest font-mono z-20 pointer-events-none">
        Drag to explore cloud
      </div>
    </section>
  );
}
