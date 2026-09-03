import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const UnfinishedJournal = ({ scrollProgress }) => {
  const x = useTransform(scrollProgress, [0, 0.4], [0, 120]);
  const y = useTransform(scrollProgress, [0, 0.4], [0, 20]);
  const rotate = useTransform(scrollProgress, [0, 0.4], [-5, 10]);

  return (
    <motion.div 
      style={{ x, y, rotate }}
      className="absolute top-[40%] right-[5%] w-48 bg-surface-primary/60 border border-border-default p-4 rounded-md shadow-xl backdrop-blur-md opacity-70"
    >
      <div className="text-[10px] text-text-muted mb-2">3 days ago</div>
      <div className="h-1.5 w-full bg-text-muted/30 rounded mb-1" />
      <div className="h-1.5 w-3/4 bg-text-muted/30 rounded mb-1" />
      <div className="h-1.5 w-1/2 bg-text-muted/30 rounded" />
    </motion.div>
  );
};