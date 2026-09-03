import React from 'react';
import { Check, Flame, Repeat, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export const HabitCard = ({ habit, isCompleted, onToggle, onClick }) => {
  const isPaused = habit.status === 'paused';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`relative p-5 rounded-2xl border transition-all cursor-pointer overflow-hidden ${
        isCompleted 
          ? 'bg-surface-secondary/50 border-border-default opacity-80' 
          : 'bg-surface-primary border-border-default hover:border-interactive-primary/40 hover:shadow-md'
      }`}
    >
      {/* Background visual indicator for quit habits */}
      {habit.type === 'quit' && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 blur-2xl rounded-full" />
      )}
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${
            habit.type === 'quit' ? 'bg-red-50 text-red-500 border-red-200' : 'bg-surface-secondary text-text-heading border-border-default'
          }`}>
            {habit.icon || <Target size={20} />}
          </div>
          <div>
            <h3 className={`font-bold text-base transition-colors ${isCompleted ? 'text-text-muted' : 'text-text-heading'}`}>
              {habit.title}
            </h3>
            {habit.description && (
              <p className="text-xs text-text-muted truncate max-w-[150px]">{habit.description}</p>
            )}
          </div>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onToggle(habit); }}
          disabled={isPaused}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
            isCompleted 
              ? 'bg-green-500 text-white shadow-md' 
              : 'bg-surface-primary border-2 border-border-default text-transparent hover:border-green-500 hover:text-green-500'
          } ${isPaused && 'opacity-50 cursor-not-allowed'}`}
        >
          <Check size={20} strokeWidth={isCompleted ? 3 : 2} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-auto relative z-10">
        <div className="flex flex-col p-2.5 rounded-xl bg-surface-secondary/50 border border-border-default">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1 flex items-center gap-1">
            <Flame size={10} className="text-orange-500" /> Streak
          </span>
          <div className="flex items-end gap-1">
            <span className="text-lg font-bold text-text-heading leading-none">{habit.currentStreak || 0}</span>
            <span className="text-[10px] text-text-muted font-medium pb-0.5">days</span>
          </div>
        </div>
        
        <div className="flex flex-col p-2.5 rounded-xl bg-surface-secondary/50 border border-border-default">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1 flex items-center gap-1">
            <Repeat size={10} /> Frequency
          </span>
          <div className="flex items-end gap-1">
            <span className="text-sm font-bold text-text-heading leading-none truncate capitalize">
              {habit.frequency || 'Daily'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
