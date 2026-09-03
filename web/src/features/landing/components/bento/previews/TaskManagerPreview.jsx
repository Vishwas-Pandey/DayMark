import React from 'react';
import { motion } from 'framer-motion';

export const TaskManagerPreview = ({ isHovered }) => {
  const tasks = [
    { text: "Draft architecture review", checked: true },
    { text: "Sync with design team", checked: isHovered },
    { text: "Publish release notes", checked: false }
  ];

  return (
    <div className="absolute inset-y-8 right-8 left-8 bg-surface-primary border border-border-default rounded-xl p-5 shadow-xl flex flex-col gap-3">
      {tasks.map((task, i) => (
        <motion.div 
          key={i}
          className="flex items-center gap-3 p-3 bg-surface-secondary/50 rounded-lg border border-border-subtle"
          animate={{ x: isHovered ? 0 : (i === 1 ? -10 : 0) }}
        >
          <motion.div 
            className="w-5 h-5 rounded border-2 flex items-center justify-center"
            animate={{
              borderColor: task.checked ? 'var(--color-interactive-primary)' : 'var(--color-border-default)',
              backgroundColor: task.checked ? 'var(--color-interactive-primary)' : 'transparent'
            }}
          >
            {task.checked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3"><path d="M20 6L9 17l-5-5"/></svg>}
          </motion.div>
          <motion.span 
            className="text-sm font-medium"
            animate={{
              color: task.checked ? 'var(--color-text-muted)' : 'var(--color-text-heading)',
              textDecoration: task.checked ? 'line-through' : 'none'
            }}
          >
            {task.text}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};