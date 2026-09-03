import React from 'react';
import { motion } from 'framer-motion';

export const AIEnergyForecast = () => {
  return (
    <div className="p-6 rounded-2xl bg-surface-primary border border-border-default hover:shadow-xl transition-shadow group">
      <h3 className="text-sm font-bold text-text-heading mb-6">Energy Forecast</h3>
      
      {/* Fake Graph */}
      <div className="relative h-32 flex items-end justify-between px-2 pb-6 border-b border-border-subtle">
        {[40, 70, 100, 80, 50, 90, 60, 30].map((h, i) => (
          <div key={i} className="relative w-8 group-hover:-translate-y-1 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
            <motion.div 
              className="w-full bg-gradient-to-t from-interactive-primary/20 to-interactive-primary/80 rounded-t-sm"
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        ))}
        {/* Overlay curve */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <motion.path 
            d="M0,100 Q50,40 100,20 T200,60 T300,10 T400,80" 
            fill="none" stroke="rgba(var(--color-interactive-primary-rgb), 0.5)" strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </svg>
      </div>
      <div className="flex justify-between mt-4 text-[10px] font-bold text-text-muted uppercase">
        <span>Morning</span>
        <span>Afternoon</span>
        <span>Evening</span>
      </div>
    </div>
  );
};