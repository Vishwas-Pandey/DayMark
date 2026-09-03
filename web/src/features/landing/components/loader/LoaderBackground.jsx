import React from 'react';
import { motion } from 'framer-motion';

export const LoaderBackground = ({ isExiting }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Noise Texture */}
      <motion.div 
        className="absolute inset-0 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      {/* Subtle Grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)', backgroundSize: '64px 64px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 1 }}
      />
      {/* Aurora Radial Glow - drifting slowly */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center origin-center"
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ 
          opacity: isExiting ? 0 : [0, 0.15, 0.2], 
          scale: isExiting ? 1.5 : [0.8, 1.1, 1.2],
          rotate: isExiting ? 0 : [0, 10]
        }}
        transition={{ 
          opacity: { duration: 2, ease: 'easeOut', delay: 0.1 },
          scale: { duration: 4, ease: 'easeOut' },
          rotate: { duration: 10, ease: 'linear', repeat: Infinity }
        }}
      >
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-interactive-primary rounded-full blur-[120px] md:blur-[160px]" />
      </motion.div>
    </div>
  );
};