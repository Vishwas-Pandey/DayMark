import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const NotificationOverflow = ({ scrollProgress }) => {
  const y = useTransform(scrollProgress, [0, 0.4], [0, 150]);
  
  return (
    <motion.div 
      style={{ y }}
      className="absolute bottom-[30%] left-[40%] flex flex-col gap-2 opacity-60"
    >
      {[1,2,3].map(i => (
        <div key={i} className={`w-40 h-8 rounded-full border border-border-default backdrop-blur-md flex items-center px-3 ${i%2===0 ? 'bg-surface-secondary/40 -translate-x-4' : 'bg-surface-primary/40 translate-x-4'}`}>
          <div className="w-2 h-2 rounded-full bg-text-muted/50 mr-2" />
          <div className="h-1.5 w-1/2 bg-text-muted/40 rounded" />
        </div>
      ))}
    </motion.div>
  );
};