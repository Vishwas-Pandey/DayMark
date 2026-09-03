import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const BackgroundLighting = ({ scrollProgress }) => {
  // Chaos (0-0.3): desaturated, dark, scattered.
  // Clarity (0.7-1): bright aurora, centered.
  
  const opacityChaos = useTransform(scrollProgress, [0, 0.4], [0.8, 0]);
  const opacityClarity = useTransform(scrollProgress, [0.6, 1], [0, 0.8]);
  const scale = useTransform(scrollProgress, [0, 1], [0.8, 1.2]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="sticky top-0 h-[100dvh] w-full">
        {/* Chaos Lighting */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black mix-blend-multiply"
          style={{ opacity: opacityChaos }}
        />
        
        {/* Clarity Lighting (Aurora) */}
        <motion.div style={{ opacity: opacityClarity, scale }} className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[60vw] h-[60vw] bg-interactive-primary/20 blur-[150px] rounded-full" />
          <div className="absolute w-[40vw] h-[40vw] bg-[#38bdf8]/15 blur-[120px] rounded-full translate-x-[20%] translate-y-[20%]" />
        </motion.div>
        
        {/* Noise overlay constant */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      </div>
    </div>
  );
};