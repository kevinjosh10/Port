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
    
    const colorInside = new THREE.Color("#ffffff"); // White/cloudy
    const colorOutside = new THREE.Color("#00f3ff"); // Electric blue tint

    // Define cloud clusters
    const clusters = [
      { center: new THREE.Vector3(0, 0, 0), radius: 1.5 },
      { center: new THREE.Vector3(1.5, 0.5, 0), radius: 1.2 },
      { center: new THREE.Vector3(-1.5, -0.2, 0.2), radius: 1.3 },
      { center: new THREE.Vector3(0.8, -0.8, -0.5), radius: 1.0 },
      { center: new THREE.Vector3(-1.0, 0.8, -0.2), radius: 1.1 },
      { center: new THREE.Vector3(2.5, -0.3, 0), radius: 0.8 },
      { center: new THREE.Vector3(-2.5, 0.4, 0.3), radius: 0.9 },
    ];

    for (let i = 0; i < particlesCount; i++) {
      // Pick a random cluster
      const cluster = clusters[Math.floor(Math.random() * clusters.length)];
      
      // Random point in sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * cluster.radius;

      const x = cluster.center.x + r * Math.sin(phi) * Math.cos(theta);
      const y = cluster.center.y + r * Math.sin(phi) * Math.sin(theta);
      const z = cluster.center.z + r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Color interpolation based on distance from center
      const dist = Math.sqrt(x*x + y*y + z*z) / 3.0;
      const mixedColor = colorInside.clone().lerp(colorOutside, dist);
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
    
    // Get mouse position in 3D space
    mouse.current.x = (state.pointer.x * viewport.width) / 2;
    mouse.current.y = (state.pointer.y * viewport.height) / 2;
    mouse.current.z = 0; // Cloud is roughly at z=0

    const positionsAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = positionsAttribute.array as Float32Array;

    for (let i = 0; i < particlesCount; i++) {
      const idx = i * 3;
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];

      const px = posArray[idx];
      const py = posArray[idx + 1];
      const pz = posArray[idx + 2];

      // Calculate distance to mouse
      const dx = px - mouse.current.x;
      const dy = py - mouse.current.y;
      // Slight depth perception on mouse
      const dz = pz - mouse.current.z; 
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      const maxDistance = 1.5;
      const force = Math.max(0, maxDistance - dist) / maxDistance;

      if (force > 0) {
        // Repel
        const pushX = (dx / dist) * force * 0.1;
        const pushY = (dy / dist) * force * 0.1;
        const pushZ = (dz / dist) * force * 0.1;

        posArray[idx] += pushX;
        posArray[idx + 1] += pushY;
        posArray[idx + 2] += pushZ;
      } else {
        // Return to original smoothly
        posArray[idx] += (ox - px) * 0.05;
        posArray[idx + 1] += (oy - py) * 0.05;
        posArray[idx + 2] += (oz - pz) * 0.05;
      }
    }
    
    positionsAttribute.needsUpdate = true;

    // Slow overall floating rotation
    const elapsedTime = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = Math.sin(elapsedTime * 0.1) * 0.1;
    pointsRef.current.rotation.x = Math.cos(elapsedTime * 0.1) * 0.05;
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
