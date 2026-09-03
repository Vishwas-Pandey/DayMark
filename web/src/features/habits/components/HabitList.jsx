import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { HabitCard } from './HabitCard';
import { EmptyState } from '../../../components/common/EmptyStates';
import { DashboardSkeleton } from '../../../components/common/Skeletons';

export const HabitList = ({ habits, isLoading, error, onToggle, onClickHabit }) => {
  if (isLoading) return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><DashboardSkeleton /><DashboardSkeleton /><DashboardSkeleton /></div>;
  if (error) return <div className="p-8 rounded-2xl bg-red-50 border border-red-200 text-red-600">Failed to load habits. Please try again.</div>;
  if (!habits || habits.length === 0) return (
    <div className="py-16 bg-surface-primary rounded-2xl border border-border-default flex items-center justify-center shadow-sm">
      <EmptyState title="No habits found." message="Create a habit to start building consistency." />
    </div>
  );

  const isCompletedToday = (habit) =>
    habit.lastCompleted &&
    new Date(habit.lastCompleted).toDateString() === new Date().toDateString();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence>
        {habits.map(habit => (
          <HabitCard
            key={habit.id}
            habit={habit}
            isCompleted={isCompletedToday(habit)}
            onToggle={onToggle}
            onClick={() => onClickHabit(habit)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
