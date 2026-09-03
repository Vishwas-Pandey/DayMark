import React from 'react';
import { motion, useTransform } from 'framer-motion';

const navItems = [
  { id: 0, icon: '🏠', label: 'Dashboard' },
  { id: 1, icon: '⚡', label: 'Habits' },
  { id: 2, icon: '📓', label: 'Journal' },
  { id: 3, icon: '🎯', label: 'Goals' },
  { id: 4, icon: '✨', label: 'Insights' },
  { id: 5, icon: '📊', label: 'Analytics' },
];

export const PreviewSidebar = ({ activeStepRaw }) => {
  return (
    <div className="w-48 border-r border-border-subtle bg-surface-secondary/30 hidden md:flex flex-col p-4 gap-2">
      <div className="text-sm font-bold text-text-heading mb-6 px-2 flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-interactive-primary/20 flex items-center justify-center text-interactive-primary">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12 2L2 22h20L12 2zm0 4.5l7.5 14h-15L12 6.5z"/>
          </svg>
        </div>
        DayMark
      </div>
      
      {navItems.map(item => (
        <SidebarItem key={item.id} item={item} activeStepRaw={activeStepRaw} />
      ))}
    </div>
  );
};

const SidebarItem = ({ item, activeStepRaw }) => {
  // Determine if this item is currently active based on the scroll step
  const isActive = useTransform(activeStepRaw, 
    [item.id - 0.5, item.id, item.id + 0.5], 
    [0, 1, 0]
  );

  return (
    <motion.div 
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium relative"
      style={{
        color: useTransform(isActive, v => v > 0.5 ? 'var(--color-text-heading)' : 'var(--color-text-muted)'),
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-surface-secondary rounded-lg -z-10"
        style={{ opacity: isActive }}
      />
      <span>{item.icon}</span>
      {item.label}
    </motion.div>
  );
};