import React from 'react';
import { motion } from 'framer-motion';

export const AnalyticsPreview = ({ isHovered }) => {
  return (
    <div className="absolute inset-x-8 inset-y-8 flex gap-8">
      {/* Chart Area */}
      <div className="flex-1 bg-surface-primary border border-border-default rounded-xl p-6 shadow-xl flex flex-col relative overflow-hidden">
        <h4 className="text-sm font-semibold text-text-heading mb-6">Weekly Performance</h4>
        
        <div className="flex-1 flex items-end justify-between gap-2 z-10 relative">
          {[40, 55, 30, 75, 90, 65, 85].map((val, i) => (
            <motion.div 
              key={i} 
              className="w-full bg-interactive-primary rounded-t flex-1"
              initial={{ height: "10%" }}
              animate={{ height: isHovered ? `${val}%` : "10%" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
          ))}
        </div>
        
        {/* Fake Area Background */}
        <motion.div 
          className="absolute bottom-6 left-6 right-6 h-full bg-gradient-to-t from-interactive-primary/20 to-transparent pointer-events-none opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ delay: 0.4 }}
        />
      </div>
      
      {/* Stats Area */}
      <div className="w-48 flex flex-col gap-4 hidden lg:flex">
        <StatCard label="Tasks Completed" value="142" trend="+12%" isHovered={isHovered} delay={0} />
        <StatCard label="Deep Work Hours" value="28h" trend="+5%" isHovered={isHovered} delay={0.1} />
        <StatCard label="Current Streak" value="12 Days" trend="🔥" isHovered={isHovered} delay={0.2} />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend, isHovered, delay }) => (
  <motion.div 
    className="bg-surface-primary border border-border-default rounded-xl p-4 shadow-md flex flex-col gap-1"
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <div className="text-[10px] text-text-muted font-medium uppercase tracking-wider">{label}</div>
    <div className="flex items-end justify-between">
      <div className="text-xl font-bold text-text-heading">{value}</div>
      <div className="text-xs font-semibold text-green-500">{trend}</div>
    </div>
  </motion.div>
);