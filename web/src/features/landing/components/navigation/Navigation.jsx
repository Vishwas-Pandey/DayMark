import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { NavigationContainer } from './NavigationContainer';
import { NavigationBackdrop } from './NavigationBackdrop';
import { ScrollProgress } from './ScrollProgress';

export const Navigation = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // Hide navigation if scrolling down past 150px
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    // Track if scrolled to interpolate floating state
    setScrolled(latest > 20);
  });

  return (
    <>
      <ScrollProgress />
      <motion.nav
        variants={{
          visible: { y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
          hidden: { y: '-100%', transition: { duration: 0.3, ease: 'easeIn' } }
        }}
        animate={hidden ? "hidden" : "visible"}
        className="fixed top-0 inset-x-0 z-[50] flex flex-col items-center pointer-events-none"
      >
        <NavigationBackdrop scrolled={scrolled} scrollY={scrollY} />
        <NavigationContainer scrolled={scrolled} />
      </motion.nav>
    </>
  );
};