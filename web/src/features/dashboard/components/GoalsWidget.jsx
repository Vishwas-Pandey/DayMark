import React from 'react';
import { motion } from 'framer-motion';
import { Target, Plus } from 'lucide-react';
import { useGoals } from '../../../hooks/useGoals';
import { WidgetSkeleton } from '../../../components/common/Skeletons';
import { EmptyState } from '../../../components/common/EmptyStates';

export const GoalsWidget = () => {
  const { data: goals, isLoading, error } = useGoals();

  if (isLoading) return <WidgetSkeleton />;
  if (error) return <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 h-full">Failed to load goals.</div>;
  
  const activeGoals = goals?.filter(g => g.status === 'active') || [];

  if (activeGoals.length === 0) return (
    <div className="p-4 rounded-xl border border-border-default bg-surface-primary h-full flex flex-col justify-center">
      <EmptyState title="No active goals" message="Set a goal to track your progress." />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-5 rounded-xl border border-border-default bg-surface-primary shadow-sm h-[320px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-text-heading">Active Goals</h3>
        <button className="p-1.5 text-text-muted hover:text-text-heading hover:bg-surface-secondary rounded-md transition-colors">
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 -mr-1">
        {activeGoals.map((goal) => {
          const progress = Math.round(goal.progress?.progressPercentage ?? goal.progressPercentage ?? 0);
          const targetDate = goal.timeline?.targetDate ?? goal.targetDate;
          return (
            <div key={goal.id} className="p-3 rounded-lg border border-border-default hover:border-interactive-primary/30 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Target size={14} className="text-blue-500" />
                  <p className="text-sm font-semibold text-text-heading">{goal.title}</p>
                </div>
                <span className="text-xs font-bold text-interactive-primary">{progress}%</span>
              </div>
              
              <div className="h-1.5 w-full bg-surface-secondary rounded-full overflow-hidden mb-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-interactive-primary rounded-full"
                />
              </div>
              
              {targetDate && (
                <div className="flex justify-end items-center text-[11px] text-text-muted font-medium">
                  <span>{Math.max(0, Math.ceil((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24)))} days left</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
