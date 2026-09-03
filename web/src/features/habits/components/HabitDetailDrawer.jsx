import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Target, Activity, BarChart2, Edit3, Trash2, PauseCircle } from 'lucide-react';
import { HabitProgressRing } from './HabitProgressRing';
import { habitsApi } from '../../../api/habits';

const DAYS_SHOWN = 119; // ~17 weeks

export const HabitDetailDrawer = ({ habit: habitSummary, isOpen, onClose, onDelete }) => {
  const { data: history } = useQuery({
    queryKey: ['habits', habitSummary?.id, 'history'],
    queryFn: () => habitsApi.getHistory(habitSummary.id).then(res => res.data),
    enabled: Boolean(isOpen && habitSummary?.id)
  });

  // The list view only has the slim summary shape — fetch the full record
  // (description, goal, tracking, metadata) once the drawer is opened.
  const { data: fullHabit } = useQuery({
    queryKey: ['habits', habitSummary?.id],
    queryFn: () => habitsApi.get(habitSummary.id).then(res => res.data),
    enabled: Boolean(isOpen && habitSummary?.id)
  });

  const habit = fullHabit || habitSummary;
  if (!habit) return null;

  const currentStreak = habit.tracking?.currentStreak ?? habit.currentStreak ?? 0;
  const longestStreak = habit.tracking?.longestStreak ?? habit.longestStreak ?? 0;
  const completionRate = longestStreak ? Math.min(100, Math.round((currentStreak / longestStreak) * 100)) : 0;

  const completedDaySet = new Set((history || []).map(c => new Date(c.completedAt).toDateString()));
  const dayCells = [...Array(DAYS_SHOWN)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (DAYS_SHOWN - 1 - i));
    return { date, isDone: completedDaySet.has(date.toDateString()) };
  });

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
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] md:w-[560px] bg-surface-primary shadow-2xl border-l border-border-default z-50 flex flex-col"
          >
            <div className="h-16 border-b border-border-default flex items-center justify-between px-6 shrink-0 bg-surface-secondary/50 backdrop-blur-md">
              <span className="font-semibold text-text-muted uppercase tracking-wider text-xs">Habit Overview</span>
              <div className="flex items-center gap-2">
                <button className="p-2 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-primary transition-colors">
                  <PauseCircle size={18} />
                </button>
                <button className="p-2 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-primary transition-colors">
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => onDelete(habit.id)}
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
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-surface-secondary border border-border-default flex items-center justify-center shrink-0 text-text-heading">
                  {habit.icon || <Target size={28} />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-heading mb-1">{habit.title}</h2>
                  <p className="text-sm text-text-muted">{habit.description || 'No description provided.'}</p>
                  
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-1 bg-surface-secondary border border-border-default rounded-md text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      {habit.type || 'build'}
                    </span>
                    <span className="px-2 py-1 bg-surface-secondary border border-border-default rounded-md text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      {habit.frequency || 'Daily'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex flex-col items-center text-center justify-center">
                  <Flame size={20} className="text-orange-500 mb-1" />
                  <span className="text-2xl font-bold text-text-heading">{currentStreak}</span>
                  <span className="text-xs font-semibold text-text-muted uppercase">Current</span>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col items-center text-center justify-center">
                  <Activity size={20} className="text-blue-500 mb-1" />
                  <span className="text-2xl font-bold text-text-heading">{longestStreak}</span>
                  <span className="text-xs font-semibold text-text-muted uppercase">Best</span>
                </div>
                <div className="col-span-2 p-4 rounded-2xl bg-surface-secondary border border-border-default flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-text-heading mb-1">Consistency</p>
                    <p className="text-xs text-text-muted max-w-[120px]">Current vs. best streak</p>
                  </div>
                  <HabitProgressRing percentage={completionRate} size={56} strokeWidth={6} />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-text-heading text-lg flex items-center gap-2">
                  <BarChart2 size={18} /> Contribution History
                </h3>
                <div className="p-4 rounded-2xl bg-surface-secondary border border-border-default overflow-x-auto">
                  <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
                    {dayCells.map(({ date, isDone }, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-sm ${isDone ? (habit.type === 'quit' ? 'bg-red-500' : 'bg-green-500') : 'bg-border-default/50'}`}
                        title={date.toLocaleDateString()}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-3 text-xs text-text-muted font-medium">
                    <span>17 Weeks Ago</span>
                    <div className="flex items-center gap-2">
                      <span>Less</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-sm bg-border-default/50" />
                        <div className="w-2 h-2 rounded-sm bg-green-500/40" />
                        <div className="w-2 h-2 rounded-sm bg-green-500/70" />
                        <div className="w-2 h-2 rounded-sm bg-green-500" />
                      </div>
                      <span>More</span>
                    </div>
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
