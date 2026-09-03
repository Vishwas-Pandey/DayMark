import React from 'react';
import { Plus, Flame, Activity, CheckCircle } from 'lucide-react';
import { HabitProgressRing } from './HabitProgressRing';

const isCompletedToday = (habit) =>
  habit.lastCompleted &&
  new Date(habit.lastCompleted).toDateString() === new Date().toDateString();

export const HabitHeader = ({ habits, onOpenCreate }) => {
  const activeHabits = habits?.filter(h => h.status !== 'paused' && h.status !== 'archived') || [];

  const completedToday = activeHabits.filter(isCompletedToday).length;
  const completionPercentage = activeHabits.length ? (completedToday / activeHabits.length) * 100 : 0;

  const longestStreakGlobal = Math.max(0, ...(activeHabits.map(h => h.longestStreak || 0)));
  const totalStreaks = activeHabits.reduce((acc, h) => acc + (h.currentStreak || 0), 0);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-text-heading mb-4">Habits</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-secondary border border-border-default rounded-xl shadow-sm">
            <Flame size={16} className="text-orange-500" />
            <span className="text-sm font-semibold text-text-heading">{totalStreaks} <span className="text-text-muted font-medium">Total Streak</span></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-secondary border border-border-default rounded-xl shadow-sm">
            <Activity size={16} className="text-blue-500" />
            <span className="text-sm font-semibold text-text-heading">{longestStreakGlobal} <span className="text-text-muted font-medium">Best</span></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-secondary border border-border-default rounded-xl shadow-sm">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-sm font-semibold text-text-heading">{completedToday}/{activeHabits.length} <span className="text-text-muted font-medium">Done</span></span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-surface-primary p-4 rounded-2xl border border-border-default shadow-sm shrink-0 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-4">
          <HabitProgressRing percentage={completionPercentage} size={56} strokeWidth={5} />
          <div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Today's Progress</p>
            <p className="text-lg font-bold text-text-heading">{Math.round(completionPercentage)}% Consistent</p>
          </div>
        </div>
        
        <div className="hidden md:block w-px h-10 bg-border-default mx-2" />
        
        <button 
          onClick={onOpenCreate}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-interactive-primary text-white shadow-sm hover:shadow-md hover:bg-interactive-primary/90 transition-all shrink-0"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};
