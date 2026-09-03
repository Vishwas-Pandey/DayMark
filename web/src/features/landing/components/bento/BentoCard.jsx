import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const BentoCard = ({ className = '', title, description, badge, preview, delay = 0 }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse tracking for cursor lighting
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex flex-col bg-surface-secondary/30 backdrop-blur-md border border-border-default rounded-3xl overflow-hidden group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -4, scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <HoverLighting x={smoothX} y={smoothY} isHovered={isHovered} />
      <CardReflection />
      
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-8 flex-1 flex flex-col gap-2 relative z-20">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-text-heading">{title}</h3>
            {badge && (
              <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-interactive-primary/20 text-interactive-primary rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-text-muted leading-relaxed max-w-sm">{description}</p>
        </div>
        
        {/* Preview Area - Usually absolute or flex-growing based on card type */}
        <div className="relative w-full flex-1 min-h-[150px] overflow-hidden">
          {/* We clone the preview element to pass the hover state */}
          {React.cloneElement(preview, { isHovered })}
        </div>
      </div>
      
      <CardBorder />
    </motion.div>
  );
};

const HoverLighting = ({ x, y, isHovered }) => (
  <motion.div
    className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    style={{
      background: 'radial-gradient(circle 300px at calc(var(--x) * 1px) calc(var(--y) * 1px), rgba(var(--color-interactive-primary-rgb), 0.12), transparent 80%)',
      '--x': x,
      '--y': y
    }}
  />
);

const CardReflection = () => (
  <div className="absolute inset-0 z-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-text-heading/[0.03] to-transparent" />
);

const CardBorder = () => (
  <div className="absolute inset-0 z-30 pointer-events-none rounded-3xl border border-transparent group-hover:border-interactive-primary/20 transition-colors duration-300" />
);