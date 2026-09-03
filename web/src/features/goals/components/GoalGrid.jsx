import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { GoalCard } from './GoalCard';
import { EmptyState } from '../../../components/common/EmptyStates';
import { DashboardSkeleton } from '../../../components/common/Skeletons';

export const GoalGrid = ({ goals, isLoading, error, onClickGoal }) => {
  if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><DashboardSkeleton /><DashboardSkeleton /><DashboardSkeleton /></div>;
  if (error) return <div className="p-8 rounded-2xl bg-red-50 border border-red-200 text-red-600">Failed to load goals. Please try again.</div>;
  if (!goals || goals.length === 0) return (
    <div className="py-16 bg-surface-primary rounded-2xl border border-border-default flex items-center justify-center shadow-sm">
      <EmptyState title="No goals found." message="Set a new goal to start tracking your progress." />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {goals.map(goal => (
          <GoalCard 
            key={goal.id} 
            goal={goal}
            onClick={() => onClickGoal(goal)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
