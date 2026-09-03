import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Edit3, Trash2, CheckCircle2, TrendingUp, Plus } from 'lucide-react';
import { GoalProgressBar } from './GoalProgressBar';
import { computeGoalHealth } from '../utils/goalHealth';
import { goalsApi } from '../../../api/goals';

const HEALTH_LABEL = { 'on-track': 'On Track', 'at-risk': 'At Risk', behind: 'Behind' };

export const GoalDetailDrawer = ({ goal: goalSummary, isOpen, onClose, onDelete, onUpdateProgress }) => {
  // The list view only has the slim summary shape — fetch the full record
  // (progress.targetValue/currentValue/unit, description, timeline) once opened.
  const { data: fullGoal } = useQuery({
    queryKey: ['goals', goalSummary?.id],
    queryFn: () => goalsApi.get(goalSummary.id).then(res => res.data),
    enabled: Boolean(isOpen && goalSummary?.id)
  });

  const goal = fullGoal || goalSummary;
  if (!goal) return null;

  const targetValue = goal.progress?.targetValue || 0;
  const currentValue = goal.progress?.currentValue || 0;
  const progress = goal.progress?.progressPercentage ?? goal.progressPercentage ?? (targetValue ? (currentValue / targetValue) * 100 : 0);
  const health = computeGoalHealth(goal);

  const handleProgressAdd = () => {
    const newValue = Math.min(targetValue, currentValue + Math.max(1, targetValue * 0.1));
    onUpdateProgress(goal.id, newValue);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-text-heading/20 backdrop-blur-sm z-40"
          />
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[500px] md:w-[600px] bg-surface-primary shadow-2xl border-l border-border-default z-50 flex flex-col"
          >
            <div className="h-16 border-b border-border-default flex items-center justify-between px-6 shrink-0 bg-surface-secondary/50 backdrop-blur-md">
              <span className="font-semibold text-text-muted uppercase tracking-wider text-xs">Goal Details</span>
              <div className="flex items-center gap-2">
                <button className="p-2 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-primary transition-colors">
                  <CheckCircle2 size={18} />
                </button>
                <button className="p-2 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-primary transition-colors">
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => onDelete(goal.id)}
                  className="p-2 text-text-muted hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <div className="w-px h-4 bg-border-default mx-1" />
                <button onClick={onClose} className="p-2 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-primary transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded border border-border-default bg-surface-secondary text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    {goal.category || 'General'}
                  </span>
                  {health !== 'on-track' && goal.status !== 'completed' && (
                    <span className="px-2 py-1 rounded border border-orange-200 bg-orange-50 text-[10px] font-bold uppercase tracking-wider text-orange-600">
                      {HEALTH_LABEL[health]}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-text-heading mb-2">{goal.title}</h2>
                <p className="text-sm text-text-muted leading-relaxed">{goal.description || 'No description provided.'}</p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-secondary/50 border border-border-default space-y-5">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-text-heading mb-1">Current Progress</p>
                    <p className="text-xs text-text-muted">{currentValue} / {targetValue} {goal.progress?.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-interactive-primary leading-none">{Math.round(progress)}%</p>
                  </div>
                </div>
                <GoalProgressBar percentage={progress} heightClass="h-3" />
                
                <button 
                  onClick={handleProgressAdd}
                  className="w-full py-2.5 rounded-xl bg-interactive-primary/10 text-interactive-primary font-bold text-sm hover:bg-interactive-primary/20 transition-colors flex items-center justify-center gap-2 border border-interactive-primary/20"
                >
                  <Plus size={16} /> Update Progress
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border-default flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><Calendar size={18} /></div>
                  <div>
                    <p className="text-xs font-semibold text-text-muted uppercase">Deadline</p>
                    <p className="font-bold text-text-heading text-sm">{(goal.timeline?.targetDate ?? goal.targetDate) ? new Date(goal.timeline?.targetDate ?? goal.targetDate).toLocaleDateString() : 'None'}</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border-default flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-500 rounded-lg"><TrendingUp size={18} /></div>
                  <div>
                    <p className="text-xs font-semibold text-text-muted uppercase">Velocity</p>
                    <p className="font-bold text-text-heading text-sm">{HEALTH_LABEL[health]}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
