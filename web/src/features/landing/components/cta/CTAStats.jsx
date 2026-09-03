import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { label: 'Tasks Completed', value: 42, suffix: 'K+' },
  { label: 'Consistency Rate', value: 98, suffix: '%' },
  { label: 'Longest Streak', value: 365, suffix: '' },
  { label: 'Average User Rating', value: 4.9, suffix: '★' }
];

const AnimatedMetric = ({ value, label, suffix, delay }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();
      
      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out quint
        const easeOut = 1 - Math.pow(1 - progress, 5);
        
        // Handle decimals for 4.9
        if (value % 1 !== 0) {
          setCount((easeOut * value).toFixed(1));
        } else {
          setCount(Math.floor(easeOut * value));
        }
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setCount(value);
        }
      };
      
      requestAnimationFrame(update);
    }
  }, [inView, value]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-heading mb-1">
        {count}{suffix}
      </div>
      <div className="text-[11px] font-semibold tracking-wider text-text-muted uppercase">
        {label}
      </div>
    </motion.div>
  );
};

export const CTAStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl mx-auto my-12 border-y border-border-default/50 py-8 bg-surface-secondary/10 backdrop-blur-md rounded-3xl">
      {STATS.map((stat, i) => (
        <AnimatedMetric key={i} {...stat} delay={i * 0.1} />
      ))}
    </div>
  );
};
