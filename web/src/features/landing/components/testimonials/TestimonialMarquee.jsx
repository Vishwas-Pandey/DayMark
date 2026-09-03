import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialCard } from './TestimonialCard';
import { TESTIMONIALS } from './TestimonialData';

export const TestimonialMarquee = () => {
  const row1 = TESTIMONIALS.slice(0, 4);
  const row2 = TESTIMONIALS.slice(4, 8);

  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden py-10 flex flex-col gap-8 hidden md:flex">
      {/* Left/Right Fade */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface-primary to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface-primary to-transparent z-20 pointer-events-none" />

      {/* Row 1: Left */}
      <div className="flex gap-8 group">
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {[...row1, ...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>

      {/* Row 2: Right */}
      <div className="flex gap-8 group">
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
        >
          {[...row2, ...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const TestimonialCarousel = () => {
  return (
    <div className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-8 custom-scrollbar">
      {TESTIMONIALS.map((t, i) => (
        <div key={i} className="snap-center shrink-0">
          <TestimonialCard testimonial={t} />
        </div>
      ))}
    </div>
  );
};
