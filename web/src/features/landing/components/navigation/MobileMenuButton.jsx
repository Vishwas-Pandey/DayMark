import React from 'react';
import { motion } from 'framer-motion';

export const MobileMenuButton = ({ isOpen, toggle }) => {
  return (
    <button 
      onClick={toggle}
      className="p-2 z-[60] relative text-text-heading focus-ring rounded-md outline-none"
      aria-label="Toggle Menu"
      aria-expanded={isOpen}
    >
      <div className="w-5 h-4 flex flex-col justify-between overflow-hidden">
        <motion.span 
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          className="w-full h-[2px] bg-current rounded-full origin-center transition-transform"
        />
        <motion.span 
          animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
          className="w-full h-[2px] bg-current rounded-full transition-all"
        />
        <motion.span 
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          className="w-full h-[2px] bg-current rounded-full origin-center transition-transform"
        />
      </div>
    </button>
  );
};