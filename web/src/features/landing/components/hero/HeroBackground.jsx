import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export const HeroBackground = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  
  // Mouse lighting
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    if (typeof window === 'undefined') return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-surface-primary" onMouseMove={handleMouseMove}>
      <motion.div style={{ y }} className="absolute inset-0">
        <AuroraLayer />
        <GradientOrbs />
        <MouseLighting x={smoothX} y={smoothY} />
      </motion.div>
      <GridLayer />
      <NoiseLayer />
    </div>
  );
};

const AuroraLayer = () => (
  <div className="absolute inset-0 opacity-40 mix-blend-screen overflow-hidden">
    <motion.div 
      className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-interactive-primary/20 blur-[120px]"
      animate={{ 
        x: [0, 50, 0], 
        y: [0, 30, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-interactive-secondary/15 blur-[120px]"
      animate={{ 
        x: [0, -40, 0], 
        y: [0, 50, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const GradientOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div 
      className="absolute bottom-0 left-[20%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/10 blur-[100px]"
      animate={{ y: [20, -20, 20] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const MouseLighting = ({ x, y }) => (
  <motion.div 
    className="absolute w-[800px] h-[800px] rounded-full bg-interactive-primary/5 blur-[100px] -ml-[400px] -mt-[400px] pointer-events-none mix-blend-screen"
    style={{ x, y }}
  />
);

const GridLayer = () => (
  <div 
    className="absolute inset-0 opacity-[0.03]"
    style={{ backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}
  />
);

const NoiseLayer = () => (
  <div 
    className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
  />
);