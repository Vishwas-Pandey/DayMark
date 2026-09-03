import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { TRUST_STATS } from './TestimonialData';

const Counter = ({ value, label, suffix }) => {
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
        
        setCount(Math.floor(easeOut * value));
        
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };
      
      requestAnimationFrame(update);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-secondary/20 border border-border-default/50 backdrop-blur-sm">
      <div className="text-3xl lg:text-4xl font-bold tracking-tight text-text-heading mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-medium text-text-muted">{label}</div>
    </div>
  );
};

export const TrustCounters = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto mb-20 px-6">
      {TRUST_STATS.map((stat, i) => (
        <Counter key={i} {...stat} />
      ))}
    </div>
  );
};
