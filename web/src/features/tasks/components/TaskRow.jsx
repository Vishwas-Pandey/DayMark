import React from 'react';
import { CheckCircle2, Circle, Clock, GripVertical, AlertCircle, Battery, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const TaskRow = ({ task, onToggle, onClick, isSelected, onSelect }) => {
  const isCompleted = task.status === 'completed';
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'Low': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-text-muted bg-surface-secondary border-border-default';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.005 }}
      className={`group flex flex-col sm:flex-row sm:items-center gap-3 p-3 md:p-4 rounded-xl border transition-all cursor-pointer ${
        isCompleted 
          ? 'bg-surface-secondary/30 border-border-default/50 opacity-70' 
          : 'bg-surface-primary border-border-default hover:border-interactive-primary/40 hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button className="text-text-muted/30 hover:text-text-muted cursor-grab hidden md:block">
            <GripVertical size={16} />
          </button>
          <input 
            type="checkbox" 
            checked={isSelected} 
            onChange={onSelect}
            className="w-4 h-4 rounded border-border-default text-interactive-primary focus:ring-interactive-primary accent-interactive-primary cursor-pointer"
          />
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onToggle(task); }}
          className={`shrink-0 transition-colors ${isCompleted ? 'text-green-500' : 'text-text-muted hover:text-interactive-primary'}`}
        >
          {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>

        <div className="flex-1 min-w-0 pr-2">
          <h3 className={`font-semibold text-base truncate transition-colors ${isCompleted ? 'line-through text-text-muted' : 'text-text-heading group-hover:text-interactive-primary'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-text-muted truncate mt-0.5 max-w-md hidden md:block">
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-12 sm:ml-auto overflow-x-auto scrollbar-hide pb-1 sm:pb-0 shrink-0">
        {task.priority && (
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        )}
        
        {task.energy && (
          <span className="flex items-center gap-1 text-[11px] font-medium text-text-muted bg-surface-secondary px-2 py-1 rounded-md border border-border-default shrink-0">
            <Zap size={12} className="text-yellow-500" /> {task.energy}
          </span>
        )}

        {task.dueDate && (
          <span className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md border shrink-0 ${
            new Date(task.dueDate) < new Date() && !isCompleted
              ? 'text-red-600 bg-red-50 border-red-200' 
              : 'text-text-muted bg-surface-secondary border-border-default'
          }`}>
            <Clock size={12} />
            {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        )}
        
        {task.estimatedTime && (
          <span className="flex items-center gap-1 text-[11px] font-medium text-text-muted bg-surface-secondary px-2 py-1 rounded-md border border-border-default shrink-0">
            <Clock size={12} /> {task.estimatedTime}m
          </span>
        )}
      </div>
    </motion.div>
  );
};
