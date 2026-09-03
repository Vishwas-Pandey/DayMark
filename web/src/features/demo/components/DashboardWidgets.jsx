import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../store/useDemoStore';
import confetti from 'canvas-confetti';
import { EmptyState } from '../../../components/common/EmptyStates';

const Card = ({ children, className = "", delay = 0 }) => (
  <motion.div 
    className={`bg-surface-primary border border-border-default rounded-2xl p-6 shadow-xl relative overflow-hidden ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export const TaskWidget = () => {
  const { tasks, toggleTask } = useDemoStore();
  const sortedTasks = [...tasks].sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));

  return (
    <div className="bg-surface-secondary/50 backdrop-blur-md rounded-2xl p-6 border border-border-default h-[320px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-text-heading">Action Items</h3>
        <span className="text-xs font-medium text-text-muted bg-surface-primary px-2 py-1 rounded-md">
          {tasks.filter(t => t.completed).length}/{tasks.length}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {tasks.length === 0 ? (
          <EmptyState 
            title="No Tasks Found" 
            description="You've completed all your tasks for today. Great job!" 
          />
        ) : (
          sortedTasks.map(task => (
            <motion.div 
              layout
              key={task.id}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${
                task.completed ? 'bg-surface-primary/30 border-transparent opacity-60' : 'bg-surface-primary border-border-default hover:border-interactive-primary/50 hover:shadow-[0_0_15px_rgba(var(--color-interactive-primary-rgb),0.1)]'
              }`}
              onClick={() => toggleTask(task.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors shrink-0 ${
                task.completed ? 'bg-interactive-primary border-interactive-primary' : 'border-border-muted group-hover:border-interactive-primary'
              }`}>
                {task.completed && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </div>
              <div>
                <p className={`text-sm font-medium transition-colors ${task.completed ? 'text-text-muted line-through' : 'text-text-heading'}`}>
                  {task.title}
                </p>
                <p className="text-xs text-text-muted mt-1 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-400' : task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`} />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export const HabitWidget = () => {
  const { habits, fillHabit } = useDemoStore();

  return (
    <div className="bg-surface-secondary/50 backdrop-blur-md rounded-2xl p-6 border border-border-default h-[320px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-text-heading">Daily Habits</h3>
        <button className="text-interactive-primary hover:text-interactive-primary/80 transition-colors p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {habits.length === 0 ? (
          <EmptyState 
            title="No Habits Tracked" 
            description="Start building consistency by adding your first daily habit." 
          />
        ) : (
          habits.map(habit => (
            <div key={habit.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-text-heading">{habit.title}</span>
                <span className="text-text-muted">{habit.progress}%</span>
              </div>
              <div className="h-3 w-full bg-surface-primary rounded-full overflow-hidden border border-border-default relative group cursor-pointer" onClick={() => fillHabit(habit.id)}>
                <motion.div 
                  className="h-full bg-gradient-to-r from-interactive-primary to-purple-500 relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${habit.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-surface-primary/20 w-full animate-[shimmer_2s_infinite] -translate-x-full" />
                </motion.div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-interactive-primary/10 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold text-interactive-primary uppercase tracking-wider">Fill</span>
                </div>
              </div>
              <p className="text-[10px] text-text-muted flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                {habit.streak} day streak
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const JournalWidget = () => {
  const { journalEntry, updateJournal } = useDemoStore();
  
  return (
    <Card delay={0.3} className="flex flex-col">
      <h2 className="text-lg font-bold text-text-heading mb-4">Journal Entry</h2>
      <textarea 
        className="flex-1 w-full bg-surface-secondary/50 border border-border-default rounded-xl p-4 text-sm text-text-heading resize-none focus:outline-none focus:border-interactive-primary/50 focus:ring-1 focus:ring-interactive-primary/50 transition-all min-h-[120px]"
        value={journalEntry}
        onChange={(e) => updateJournal(e.target.value)}
        placeholder="How are you feeling today?"
      />
      <div className="flex justify-between items-center mt-3 text-xs text-text-muted">
        <span>Markdown supported</span>
        <span>Autosaved</span>
      </div>
    </Card>
  );
};

export const ScoreWidget = () => {
  const { score } = useDemoStore();
  
  return (
    <Card delay={0.4} className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-sm font-bold tracking-widest text-text-muted uppercase mb-4">Productivity Score</div>
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-border-default)" strokeWidth="8" opacity="0.3" />
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="var(--color-interactive-primary)" 
            strokeWidth="8" 
            strokeLinecap="round"
            strokeDasharray="283"
            animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
            transition={{ duration: 1, type: "spring", bounce: 0 }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <motion.span className="text-4xl font-bold text-text-heading">
            {score}
          </motion.span>
        </div>
      </div>
      <p className="text-xs text-green-500 font-medium mt-4 bg-green-500/10 px-3 py-1 rounded-full">+4 pts since yesterday</p>
    </Card>
  );
};

export const AICoachWidget = () => {
  return (
    <Card delay={0.5} className="flex-1 flex flex-col justify-center bg-gradient-to-br from-surface-primary to-interactive-primary/5">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-lg">✨</div>
        <div className="text-sm font-bold text-interactive-primary">DayMark AI Insight</div>
      </div>
      <p className="text-text-heading text-sm leading-relaxed mb-4">
        You've completed your toughest tasks early today! Consider spending 30 minutes reading this afternoon to maintain momentum without burning out.
      </p>
      <button className="w-full py-2.5 rounded-lg bg-surface-secondary border border-border-default text-xs font-semibold text-text-heading hover:bg-interactive-primary hover:text-text-heading hover:border-transparent transition-all">
        Add 30m Reading to Calendar
      </button>
    </Card>
  );
};