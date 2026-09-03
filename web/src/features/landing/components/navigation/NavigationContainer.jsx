import React, { useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { NavigationLogo } from './NavigationLogo';
import { NavigationLinks } from './NavigationLinks';
import { NavigationActions } from './NavigationActions';
import { MobileMenu } from './MobileMenu';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

export const NavigationContainer = () => {
  const { scrollY } = useScroll();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // Height interpolates from 80px (h-20) to 64px (h-16) as we scroll down
  const height = useTransform(scrollY, [0, 50], [80, 64]);
  // Horizontal padding scales gently down
  const px = useTransform(scrollY, [0, 50], [24, 16]);

  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-auto relative z-10"
      style={{ height, paddingLeft: px, paddingRight: px }}
    >
      <NavigationLogo />
      {!isMobile && <NavigationLinks />}
      {!isMobile ? <NavigationActions /> : <MobileMenu />}
    </motion.div>
  );
};