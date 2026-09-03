import React from 'react';
import { motion } from 'framer-motion';

export const AIBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute top-[30%] left-[60%] w-[50vw] h-[50vw] rounded-full bg-interactive-primary/10 blur-[150px] -translate-x-1/2 -translate-y-1/2" />
    <motion.div 
      className="absolute top-[40%] left-[70%] w-[40vw] h-[40vw] rounded-full bg-[#38bdf8]/10 blur-[120px] -translate-x-1/2 -translate-y-1/2"
      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);