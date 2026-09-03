import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const FloatingNotes = ({ scrollProgress }) => {
  const x = useTransform(scrollProgress, [0, 0.4], [0, -100]);
  const y = useTransform(scrollProgress, [0, 0.4], [0, -50]);
  const rotate = useTransform(scrollProgress, [0, 0.4], [-12, -45]);

  return (
    <motion.div 
      style={{ x, y, rotate }}
      className="absolute top-[10%] left-[10%] w-48 bg-yellow-900/40 border border-yellow-700/50 p-4 rounded shadow-lg backdrop-blur-sm"
      whileHover={{ scale: 1.05 }}
    >
      <div className="h-2 w-1/2 bg-yellow-700/50 rounded mb-2" />
      <div className="h-2 w-3/4 bg-yellow-700/50 rounded mb-2" />
      <div className="h-2 w-full bg-yellow-700/50 rounded" />
    </motion.div>
  );
};