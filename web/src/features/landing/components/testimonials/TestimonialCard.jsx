import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const TestimonialCard = React.memo(({ testimonial }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative w-[340px] md:w-[400px] shrink-0 p-8 rounded-[28px] bg-surface-secondary/40 border border-border-default backdrop-blur-xl overflow-hidden group transition-all duration-500 hover:border-interactive-primary/40 hover:shadow-[0_20px_40px_rgba(var(--color-interactive-primary-rgb),0.15)]"
    >
      {/* Mouse Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--color-interactive-primary-rgb), 0.15), transparent 40%)`
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-12 h-12 rounded-full overflow-hidden border border-border-default bg-surface-primary"
              whileHover={{ scale: 1.1 }}
            >
              <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
            <div>
              <h4 className="font-semibold text-text-heading text-sm">{testimonial.name}</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-text-muted group-hover:text-interactive-primary/80 transition-colors">{testimonial.occupation}</span>
                <span className="w-1 h-1 rounded-full bg-border-default" />
                <span className="text-xs text-text-muted">{testimonial.country}</span>
              </div>
            </div>
          </div>
          {/* Flame Streak */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:border-orange-500/40 transition-colors cursor-default" aria-label={`${testimonial.streak} day streak`}>
            <motion.svg 
              width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"
              animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path>
            </motion.svg>
            <span className="text-xs font-bold">{testimonial.streak}</span>
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star, i) => (
            <motion.svg 
              key={star} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" 
              className="text-yellow-400/90"
              initial={{ opacity: 0.8 }}
              animate={isHovered ? { opacity: [0.8, 1, 0.8], scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </motion.svg>
          ))}
        </div>

        {/* Quote */}
        <p className="text-text-muted text-[15px] leading-relaxed flex-1 italic">
          "{testimonial.quote}"
        </p>

        {/* Footer Feature */}
        <div className="mt-2 flex items-center justify-between">
          <div className="px-3 py-1.5 rounded-lg bg-surface-primary border border-border-default text-[11px] font-semibold text-text-muted group-hover:bg-interactive-primary/10 group-hover:text-interactive-primary group-hover:border-interactive-primary/30 transition-all">
            Favorite: {testimonial.feature}
          </div>
          <span className="text-[10px] text-text-muted opacity-60">Verified User</span>
        </div>
      </div>
    </motion.div>
  );
});
