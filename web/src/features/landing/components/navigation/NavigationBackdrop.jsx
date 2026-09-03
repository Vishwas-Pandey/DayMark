import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

export const NavigationBackdrop = ({ scrollY }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // Interpolations based on scroll depth
  const top = useTransform(scrollY, [0, 20], [0, isMobile ? 0 : 16]);
  const width = useTransform(scrollY, [0, 20], ["100%", isMobile ? "100%" : "calc(100% - 32px)"]);
  const maxWidth = useTransform(scrollY, [0, 20], ["100%", isMobile ? "100%" : "1280px"]);
  const borderRadius = useTransform(scrollY, [0, 20], [0, isMobile ? 0 : 24]);
  const bgOpacity = useTransform(scrollY, [0, 20], [0, 0.65]); // Background opacity
  const borderOpacity = useTransform(scrollY, [0, 20], [0, 1]);
  const blur = useTransform(scrollY, [0, 20], [0, 16]);

  return (
    <motion.div
      className="absolute mx-auto pointer-events-auto"
      style={{
        top,
        width,
        maxWidth,
        borderRadius,
        backdropFilter: useTransform(blur, b => `blur(${b}px)`),
        backgroundColor: useTransform(bgOpacity, o => `rgba(var(--color-surface-primary-rgb), ${o})`),
        border: useTransform(borderOpacity, o => `1px solid rgba(var(--color-border-subtle-rgb), ${o})`),
        boxShadow: useTransform(borderOpacity, o => `0 4px 24px -1px rgba(0,0,0,${o * 0.1})`),
        height: '100%',
        zIndex: 0
      }}
    >
      {/* Noise overlay that fades in slightly */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay rounded-inherit pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")', borderRadius: 'inherit' }}
      />
    </motion.div>
  );
};