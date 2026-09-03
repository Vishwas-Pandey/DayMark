import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const ScrollCue = ({ scrollProgress }) => {
  const opacity = useTransform(scrollProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
      <span className="text-xs font-medium tracking-widest uppercase">Scroll to transform</span>
      <motion.div 
        className="w-[1px] h-8 bg-interactive-primary"
        animate={{ scaleY: [0, 1, 0], y: [0, 10, 20] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
};