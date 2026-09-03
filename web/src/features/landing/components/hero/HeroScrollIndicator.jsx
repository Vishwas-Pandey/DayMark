import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroScrollIndicator = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <motion.div 
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 4, duration: 1 }}
    >
      <div className="w-[1px] h-12 bg-border-subtle relative overflow-hidden">
        <motion.div 
          className="w-full h-1/2 bg-interactive-primary absolute top-0"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};