"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function HeroParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesCount = 8000;
  
  const { positions, originalPositions, colors } = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const originalPositions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const colorInside = new THREE.Color("#ffffff"); // White core
    const colorOutside = new THREE.Color("#00f3ff"); // Electric blue edges

    // Cloud-like overlapping clusters (wider on X, flatter on bottom)
    const clusters = [
      { center: new THREE.Vector3(0, 0, 0), radius: 1.5 },
      { center: new THREE.Vector3(1.2, 0.2, 0.2), radius: 1.2 },
      { center: new THREE.Vector3(-1.2, 0.1, -0.2), radius: 1.2 },
      { center: new THREE.Vector3(2.0, -0.2, 0), radius: 0.9 },
      { center: new THREE.Vector3(-2.0, -0.1, 0.1), radius: 0.9 },
      { center: new THREE.Vector3(0.5, 0.8, -0.2), radius: 1.1 },
      { center: new THREE.Vector3(-0.6, 0.7, 0.3), radius: 1.0 },
    ];

    for (let i = 0; i < particlesCount; i++) {
      const cluster = clusters[Math.floor(Math.random() * clusters.length)];
      
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * cluster.radius;

      // Base spherical coordinates
      let x = cluster.center.x + r * Math.sin(phi) * Math.cos(theta);
      let y = cluster.center.y + r * Math.sin(phi) * Math.sin(theta);
      let z = cluster.center.z + r * Math.cos(phi);

      // Shape it into a cloud: stretch horizontally, squish vertically
      x *= 1.4;
      y *= 0.7;
      
      // Flatten the bottom of the cloud slightly
      if (y < -0.8) {
        y = -0.8 + (y + 0.8) * 0.4;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Color interpolation: blue at edges, white in the dense center
      const dist = Math.sqrt(x*x + y*y + z*z) / 3.5;
      const mixedColor = colorInside.clone().lerp(colorOutside, Math.min(dist, 1.0));
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return { positions, originalPositions, colors };
  }, [particlesCount]);

  const mouse = useRef(new THREE.Vector3(0, 0, 0));
  const { viewport } = useThree();

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Map mouse pointer to 3D space
    mouse.current.x = (state.pointer.x * viewport.width) / 2;
    mouse.current.y = (state.pointer.y * viewport.height) / 2;
    mouse.current.z = 0;

    const positionsAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = positionsAttribute.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < particlesCount; i++) {
      const idx = i * 3;
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];

      const px = posArray[idx];
      const py = posArray[idx + 1];
      const pz = posArray[idx + 2];

      // 1. Ambient Movement (Continuous subtle vibration/wobble)
      const wobbleX = Math.sin(time * 1.2 + i) * 0.03;
      const wobbleY = Math.cos(time * 1.5 + i) * 0.03;
      const wobbleZ = Math.sin(time * 1.8 + i) * 0.03;

      let targetX = ox + wobbleX;
      let targetY = oy + wobbleY;
      let targetZ = oz + wobbleZ;

      // 2. Mouse Repulsion (Slight interaction)
      const dx = px - mouse.current.x;
      const dy = py - mouse.current.y;
      const dz = pz - mouse.current.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      const maxDistance = 1.2; // Interaction radius
      if (dist < maxDistance) {
        const force = (maxDistance - dist) / maxDistance;
        // Pushes the target away slightly
        targetX += (dx / dist) * force * 0.15;
        targetY += (dy / dist) * force * 0.15;
        targetZ += (dz / dist) * force * 0.15;
      }

      // 3. Spring physics: smoothly move current position toward target
      posArray[idx] += (targetX - px) * 0.08;
      posArray[idx + 1] += (targetY - py) * 0.08;
      posArray[idx + 2] += (targetZ - pz) * 0.08;
    }
    
    positionsAttribute.needsUpdate = true;

    // Very slow atmospheric rotation
    pointsRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
    pointsRef.current.rotation.x = Math.cos(time * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
