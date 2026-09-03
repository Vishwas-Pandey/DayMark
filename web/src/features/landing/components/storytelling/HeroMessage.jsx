import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { StoryCTA } from './StoryCTA';

export const HeroMessage = ({ scrollProgress }) => {
  // 0-0.3: Life gets messy
  // 0.4-0.6: One system changes everything
  // 0.7-1.0: Everything. Finally. In One Place.
  
  const y1 = useTransform(scrollProgress, [0, 0.3, 0.4], [0, 0, -20]);
  const op1 = useTransform(scrollProgress, [0, 0.2, 0.3, 0.4], [0, 1, 1, 0]);

  const y2 = useTransform(scrollProgress, [0.3, 0.4, 0.6, 0.7], [20, 0, 0, -20]);
  const op2 = useTransform(scrollProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);

  const y3 = useTransform(scrollProgress, [0.55, 0.65, 1], [20, 0, 0]);
  const op3 = useTransform(scrollProgress, [0.55, 0.65, 1], [0, 1, 1]);

  return (
    <div className="relative h-24 flex flex-col items-center justify-center w-full text-center">
      <motion.h2 style={{ opacity: op1, y: y1 }} className="absolute text-4xl md:text-5xl lg:text-6xl font-bold text-text-muted">
        Life gets messy.
      </motion.h2>
      
      <motion.h2 style={{ opacity: op2, y: y2 }} className="absolute text-4xl md:text-5xl lg:text-6xl font-bold text-interactive-primary">
        One system changes everything.
      </motion.h2>
      
      <motion.div style={{ opacity: op3, y: y3 }} className="absolute flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-heading mb-6">
          Everything. Finally. In One Place.
        </h2>
        <StoryCTA scrollProgress={scrollProgress} />
      </motion.div>
    </div>
  );
};