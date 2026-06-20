"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const skills = [
  "EC2", "S3", "IAM", "VPC", "Route 53", "CloudFront", "ACM", 
  "Lambda", "API Gateway", "DynamoDB", "SNS", "SQS", "EventBridge", 
  "CloudWatch", "Auto Scaling", "ELB", "RDS", "EBS", "EFS",
  "Python", "Bash", "Boto3", "JSON", "REST APIs",
  "Git", "GitHub", "GitHub Actions", "CI/CD", "Monitoring", 
  "Logging", "Automation", "Linux", "Systemd", "SSH", "DNS", 
  "Networking", "TCP/IP"
];

function Constellation() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate random stable positions for nodes
  const nodes = useMemo(() => {
    return skills.map((skill) => {
      // Create a spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 3 + Math.random() * 2; // Radius 3 to 5
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      return { skill, position: new THREE.Vector3(x, y, z) };
    });
  }, []);

  // Generate lines between close nodes
  const lines = useMemo(() => {
    const connections: { start: THREE.Vector3, end: THREE.Vector3 }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 2.5) {
          connections.push({ start: nodes[i].position, end: nodes[j].position });
        }
      }
    }
    return connections;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Draw connection lines */}
      {lines.map((line, i) => (
        <Line 
          key={i}
          points={[line.start, line.end]} 
          color="#4DA6FF" 
          opacity={0.15} 
          transparent 
          lineWidth={1}
        />
      ))}
      
      {/* Draw nodes and text */}
      {nodes.map((node, i) => (
        <group key={i} position={node.position}>
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#4DA6FF" transparent opacity={0.3} />
          </mesh>
          <Text
            position={[0, -0.2, 0]}
            fontSize={0.2}
            color="#E5E7EB"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {node.skill}
          </Text>
        </group>
      ))}
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
          Skill Constellation
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
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <fog attach="fog" args={['#050505', 5, 15]} />
          <ambientLight intensity={0.5} />
          <Constellation />
        </Canvas>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted text-xs uppercase tracking-widest font-mono z-20 pointer-events-none">
        Drag to rotate constellation
      </div>
    </section>
  );
}
