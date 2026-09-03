import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Flame, Plus } from 'lucide-react';
import { useHabits } from '../../../hooks/useHabits';
import { WidgetSkeleton } from '../../../components/common/Skeletons';
import { EmptyState } from '../../../components/common/EmptyStates';
import Modal from '../../../components/common/Modal';
import TaskForm from '../../../components/TaskForm';

export const HabitsWidget = () => {
  const { data: habits, isLoading, error, toggleHabit } = useHabits();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const isCompletedToday = (habit) =>
    habit.lastCompleted &&
    new Date(habit.lastCompleted).toDateString() === new Date().toDateString();

  const handleToggle = (habit) => {
    toggleHabit.mutate(habit.id);
  };

  if (isLoading) return <WidgetSkeleton />;
  if (error) return <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 h-full">Failed to load habits.</div>;

  const activeHabits = habits?.filter((h) => h.status !== 'paused' && h.status !== 'archived') || [];

  if (activeHabits.length === 0) return (
    <div className="p-4 rounded-xl border border-border-default bg-surface-primary h-full flex flex-col justify-center items-center gap-3">
      <EmptyState
        title={habits?.length ? 'All habits paused' : 'No Habits yet'}
        message={habits?.length ? 'Resume a habit to see it here.' : 'Start building good routines.'}
      />
      <button
        onClick={() => setIsCreateOpen(true)}
        className="px-3 py-1.5 rounded-lg bg-interactive-primary/10 text-interactive-primary text-xs font-semibold hover:bg-interactive-primary/20 transition-colors"
      >
        Add Habit
      </button>
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Habit">
        <TaskForm onSuccess={() => setIsCreateOpen(false)} onClose={() => setIsCreateOpen(false)} defaultType="habit" />
      </Modal>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-5 rounded-xl border border-border-default bg-surface-primary shadow-sm h-[320px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-text-heading">Daily Habits</h3>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="p-1.5 text-text-muted hover:text-text-heading hover:bg-surface-secondary rounded-md transition-colors"
          aria-label="Add habit"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 -mr-1">
        {activeHabits.map((habit) => {
          const isCompleted = isCompletedToday(habit);
          return (
            <div key={habit.id} className="flex items-center justify-between p-3 rounded-lg border border-border-default bg-surface-secondary/50">
              <div className="min-w-0 flex-1 pr-3">
                <p className={`text-sm font-semibold truncate ${isCompleted ? 'text-text-muted line-through' : 'text-text-heading'}`}>
                  {habit.title}
                </p>
                <div className="flex items-center gap-1 mt-1 text-xs font-medium text-orange-500">
                  <Flame size={12} /> {habit.currentStreak || 0} day streak
                </div>
              </div>
              <button 
                onClick={() => handleToggle(habit)}
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${isCompleted ? 'bg-green-500 text-white shadow-md' : 'bg-surface-primary border border-border-default text-text-muted hover:border-green-500 hover:text-green-500'}`}
              >
                <Check size={16} strokeWidth={isCompleted ? 3 : 2} />
              </button>
            </div>
          );
        })}
      </div>

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Habit">
        <TaskForm onSuccess={() => setIsCreateOpen(false)} onClose={() => setIsCreateOpen(false)} defaultType="habit" />
      </Modal>
    </motion.div>
  );
};
