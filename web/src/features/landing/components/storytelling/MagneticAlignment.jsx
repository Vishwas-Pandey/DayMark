import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const MagneticAlignment = ({ scrollProgress }) => {
  const scale = useTransform(scrollProgress, [0.3, 0.6], [1.5, 0.8]);
  const rotate = useTransform(scrollProgress, [0.3, 0.6], [45, 0]);

  return (
    <motion.div style={{ scale, rotate }} className="relative w-64 h-64">
      {/* Symbolic abstract shapes converging into a center point */}
      {[0, 90, 180, 270].map((deg, i) => (
        <motion.div 
          key={i}
          className="absolute inset-0 border-2 border-interactive-primary/40 rounded-3xl"
          style={{ rotate: deg }}
        />
      ))}
      <div className="absolute inset-0 bg-interactive-primary/10 rounded-full blur-xl" />
    </motion.div>
  );
};