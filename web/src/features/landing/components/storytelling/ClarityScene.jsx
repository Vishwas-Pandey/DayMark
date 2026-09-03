import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { UnifiedWorkspace } from './UnifiedWorkspace';

export const ClarityScene = ({ scrollProgress }) => {
  // Fades in as we approach 0.7
  const opacity = useTransform(scrollProgress, [0.6, 0.8], [0, 1]);
  const scale = useTransform(scrollProgress, [0.6, 0.8], [0.9, 1]);
  const pointerEvents = useTransform(opacity, o => o > 0.5 ? 'auto' : 'none');

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, scale, pointerEvents }}
    >
      <UnifiedWorkspace />
    </motion.div>
  );
};