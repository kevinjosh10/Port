"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export default function OrbJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        w: document.documentElement.clientWidth,
        h: document.documentElement.scrollHeight
      });
    };
    
    setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);
    
    const observer = new ResizeObserver(() => updateDimensions());
    observer.observe(document.body);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!orbRef.current || !pathRef.current || dimensions.h <= 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      tl.to(orbRef.current, {
        motionPath: {
          path: pathRef.current as any,
          align: pathRef.current as any,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [dimensions]);

  if (dimensions.h === 0) return null;

  const { w, h } = dimensions;
  
  const getPath = () => {
    const vh = window.innerHeight;
    const pathStartY = vh / 2;
    const pathEndY = h - vh / 2;
    const pathHeight = pathEndY - pathStartY;
    
    // Prevent errors if page is too short
    if (pathHeight <= 0) return `M ${w/2} 0 L ${w/2} ${h}`;

    const segments = Math.max(3, Math.floor(pathHeight / 800));
    const segmentHeight = pathHeight / segments;
    let d = `M ${w/2} ${pathStartY}`;
    
    for (let i = 0; i < segments; i++) {
      const segStartY = pathStartY + i * segmentHeight;
      const segEndY = pathStartY + (i + 1) * segmentHeight;
      const midY1 = segStartY + segmentHeight * 0.33;
      const midY2 = segStartY + segmentHeight * 0.66;
      
      const dir = i % 2 === 0 ? 1 : -1;
      const spread = w > 768 ? 200 : 80;
      
      d += ` C ${w/2 + spread * dir} ${midY1}, ${w/2 + spread * dir} ${midY2}, ${w/2} ${segEndY}`;
    }
    return d;
  };

  const pathD = getPath();

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full z-0 pointer-events-none overflow-hidden" style={{ height: dimensions.h }}>
      <svg width={w} height={dimensions.h} className="absolute top-0 left-0 opacity-20">
        <path 
          ref={pathRef} 
          d={pathD}
          stroke="url(#glowGradient)" 
          strokeWidth="3" 
          fill="none" 
          strokeDasharray="8 8"
        />
        <defs>
          <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4DA6FF" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
      </svg>
      
      <div 
        ref={orbRef} 
        className="absolute top-0 left-0"
        style={{ width: '0', height: '0' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_40px_15px_rgba(77,166,255,0.7)] z-10 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-glow-primary animate-ping opacity-60" />
          <div className="w-4 h-4 bg-blue-100 rounded-full shadow-[0_0_10px_3px_#fff]" />
        </div>
      </div>
    </div>
  );
}
