import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const ProgressBeam = ({ scrollProgress }) => {
  const height = useTransform(scrollProgress, [0.5, 0.7], ["0%", "100%"]);
  
  return (
    <motion.div 
      className="absolute w-[2px] bg-gradient-to-b from-transparent via-[#38bdf8] to-transparent origin-top"
      style={{ height, top: 0, bottom: 0 }}
    />
  );
};