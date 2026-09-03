import React from 'react';

export const AIHabitCoach = () => {
  return (
    <div className="p-6 rounded-2xl bg-surface-primary border border-border-default">
      <h3 className="text-sm font-bold text-text-heading mb-4">Habit Coach</h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center border border-orange-500/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5S19.5 9 17 9c-1 0-2 .4-2.8 1L12 3 7.8 10C7 9.4 6 9 5 9c-2.5 0-4.5 2-4.5 4.5S2.5 18 5 18"></path></svg>
          </div>
          <div>
            <div className="text-sm font-medium text-text-heading">Workout Consistency Risk</div>
            <div className="text-xs text-text-muted mt-0.5">Missed 2 days. Suggested 15m recovery stretch.</div>
          </div>
        </div>
      </div>
    </div>
  );
};