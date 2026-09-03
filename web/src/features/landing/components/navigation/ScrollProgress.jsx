import React from 'react';
import { motion, useScroll } from 'framer-motion';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, var(--color-interactive-primary) 0%, #38bdf8 100%)'
      }}
    />
  );
};