import React from 'react';
import { Target, Clock, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoalProgressBar } from './GoalProgressBar';
import { computeGoalHealth } from '../utils/goalHealth';

export const GoalCard = ({ goal, onClick }) => {
  const isCompleted = goal.status === 'completed';
  const targetValue = goal.progress?.targetValue;
  const currentValue = goal.progress?.currentValue;
  const progress = goal.progress?.progressPercentage ?? goal.progressPercentage ?? 0;

  const getHealthDisplay = (health) => {
    switch(health) {
      case 'on-track': return { icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200', text: 'On Track' };
      case 'at-risk': return { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', text: 'At Risk' };
      case 'behind': return { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', text: 'Behind' };
      default: return { icon: Target, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', text: 'Active' };
    }
  };

  const health = isCompleted ? { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200', text: 'Completed' } : getHealthDisplay(computeGoalHealth(goal));
  const HealthIcon = health.icon;

  const deadline = goal.timeline?.targetDate ?? goal.targetDate;
  const remainingDays = deadline ? Math.max(0, Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))) : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={onClick}
      className={`flex flex-col p-5 rounded-2xl border transition-all cursor-pointer bg-surface-primary shadow-sm hover:shadow-lg ${isCompleted ? 'border-border-default/50 opacity-80' : 'border-border-default hover:border-interactive-primary/40'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${health.bg} ${health.color} ${health.border}`}>
          <HealthIcon size={12} /> {health.text}
        </div>
        {remainingDays !== null && !isCompleted && (
          <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md border ${remainingDays < 7 ? 'text-red-600 bg-red-50 border-red-200' : 'text-text-muted bg-surface-secondary border-border-default'}`}>
            <Clock size={12} /> {remainingDays}d left
          </div>
        )}
      </div>

      <div className="mb-4 flex-1">
        <h3 className="font-bold text-lg text-text-heading mb-1 line-clamp-2">{goal.title}</h3>
        {goal.description && <p className="text-sm text-text-muted line-clamp-2">{goal.description}</p>}
      </div>

      <div className="mt-auto space-y-3">
        <div>
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Progress</span>
            <span className="text-sm font-bold text-text-heading">{Math.round(progress)}%</span>
          </div>
          <GoalProgressBar percentage={progress} colorClass={isCompleted ? 'bg-green-500' : 'bg-interactive-primary'} />
        </div>
        
        {(targetValue !== undefined || goal.taskIds?.length > 0) && (
          <div className="flex justify-between items-center text-xs font-medium text-text-muted bg-surface-secondary/50 p-2 rounded-lg border border-border-default">
            <span>{targetValue !== undefined ? <>{currentValue || 0} / {targetValue} <span className="uppercase text-[10px]">{goal.progress?.unit}</span></> : <>&nbsp;</>}</span>
            <div className="flex items-center gap-3">
              {goal.taskIds?.length > 0 && <span className="flex items-center gap-1"><CheckCircle2 size={12} /> {goal.taskIds.length}</span>}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
