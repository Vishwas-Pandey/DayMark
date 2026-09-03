import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { StoryContainer } from './StoryContainer';
import { BackgroundLighting } from './BackgroundLighting';

export const Storytelling = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={ref} className="relative w-full h-[600vh] bg-surface-primary">
      <BackgroundLighting scrollProgress={scrollYProgress} />
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <StoryContainer scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
};