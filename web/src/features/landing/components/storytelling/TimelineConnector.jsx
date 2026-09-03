import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const TimelineConnector = ({ scrollProgress }) => {
  const scaleX = useTransform(scrollProgress, [0.4, 0.6], [0, 1]);

  return (
    <motion.div 
      className="absolute h-[2px] bg-interactive-primary/50 w-full max-w-2xl origin-center blur-[1px]"
      style={{ scaleX }}
    />
  );
};