import React from 'react';
import { motion } from 'framer-motion';
import { useDemoStore } from '../store/useDemoStore';

const View = ({ title, subtitle, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex flex-col gap-6 pb-32"
  >
    <div>
      <h2 className="text-2xl font-bold text-text-heading">{title}</h2>
      {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
    </div>
    {children}
  </motion.div>
);

const Panel = ({ children, className = '' }) => (
  <div className={`bg-surface-secondary/50 border border-border-default rounded-2xl p-5 ${className}`}>{children}</div>
);

const priorityStyle = {
  high: 'text-red-400 bg-red-500/10',
  medium: 'text-amber-400 bg-amber-500/10',
  low: 'text-emerald-400 bg-emerald-500/10',
};

export const TasksView = () => {
  const { tasks, toggleTask } = useDemoStore();
  return (
    <View title="Tasks" subtitle="Click a task to mark it done. Your productivity score updates live.">
      <Panel className="space-y-3">
        {tasks.map((t) => (
          <button
            key={t.id}
            onClick={() => toggleTask(t.id)}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-border-default bg-surface-primary text-left hover:border-interactive-primary/50 transition-colors focus-ring outline-none"
          >
            <span className={`w-5 h-5 rounded-md border-2 shrink-0 ${t.completed ? 'bg-interactive-primary border-interactive-primary' : 'border-border-muted'}`} />
            <span className={`flex-1 text-sm ${t.completed ? 'line-through text-text-muted' : 'text-text-heading'}`}>{t.title}</span>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md capitalize ${priorityStyle[t.priority]}`}>{t.priority}</span>
          </button>
        ))}
      </Panel>
    </View>
  );
};

export const HabitsView = () => {
  const { habits, fillHabit } = useDemoStore();
  return (
    <View title="Habits" subtitle="Build streaks one day at a time.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {habits.map((h) => (
          <Panel key={h.id}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-heading text-sm">{h.title}</h3>
              <span className="text-xs text-text-muted">{h.streak} day streak</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-surface-primary overflow-hidden">
              <div className="h-full bg-interactive-primary transition-all duration-500" style={{ width: `${h.progress}%` }} />
            </div>
            <button
              onClick={() => fillHabit(h.id)}
              disabled={h.progress >= 100}
              className="mt-4 w-full rounded-lg bg-interactive-primary py-2 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed focus-ring outline-none"
            >
              {h.progress >= 100 ? 'Done for today' : 'Mark complete'}
            </button>
          </Panel>
        ))}
      </div>
    </View>
  );
};

const EVENTS = [
  { time: '10:00', title: 'Team standup', tag: 'Meeting' },
  { time: '14:00', title: 'Product sync', tag: 'Meeting' },
  { time: '15:30', title: 'Deep work (90m)', tag: 'Focus' },
  { time: '17:00', title: 'Gym session', tag: 'Health' },
];

export const CalendarView = () => (
  <View title="Calendar" subtitle="Today at a glance.">
    <Panel className="divide-y divide-border-default">
      {EVENTS.map((e) => (
        <div key={e.time} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
          <span className="w-14 text-sm font-mono text-text-muted">{e.time}</span>
          <span className="flex-1 text-sm text-text-heading">{e.title}</span>
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-surface-primary text-text-muted">{e.tag}</span>
        </div>
      ))}
    </Panel>
  </View>
);

export const JournalView = () => {
  const { journalEntry, updateJournal } = useDemoStore();
  return (
    <View title="Journal" subtitle="Write a few lines. Your entry stays in this demo only.">
      <Panel>
        <label htmlFor="demo-journal" className="sr-only">Journal entry</label>
        <textarea
          id="demo-journal"
          value={journalEntry}
          onChange={(e) => updateJournal(e.target.value)}
          placeholder="How did today go?"
          rows={8}
          className="w-full resize-none rounded-lg bg-surface-primary border border-border-default p-3 text-sm text-text-heading placeholder:text-text-muted focus-ring outline-none"
        />
        <p className="mt-2 text-xs text-text-muted">{journalEntry.length} characters</p>
      </Panel>
    </View>
  );
};

const GOALS = [
  { title: 'Ship MVP', progress: 80 },
  { title: 'Read 12 books this year', progress: 58 },
  { title: 'Run a 10k', progress: 35 },
];

export const GoalsView = () => (
  <View title="Goals" subtitle="Big outcomes, tracked simply.">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {GOALS.map((g) => (
        <Panel key={g.title}>
          <h3 className="font-semibold text-text-heading text-sm">{g.title}</h3>
          <div className="mt-4 h-2 rounded-full bg-surface-primary overflow-hidden">
            <div className="h-full bg-interactive-primary" style={{ width: `${g.progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-text-muted">{g.progress}% complete</p>
        </Panel>
      ))}
    </div>
  </View>
);

const WEEK = [62, 70, 66, 78, 81, 80, 84];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const AnalyticsView = () => {
  const score = useDemoStore((s) => s.score);
  return (
    <View title="Analytics" subtitle="Your productivity score over the last 7 days.">
      <Panel>
        <div className="flex items-end gap-3 h-40">
          {WEEK.map((v, i) => (
            <div key={DAYS[i]} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full rounded-t-md bg-interactive-primary/80" style={{ height: `${v}%` }} title={`${DAYS[i]}: ${v}`} />
              <span className="text-[11px] text-text-muted">{DAYS[i]}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-text-muted">Current score: <span className="text-text-heading font-semibold">{score}</span></p>
      </Panel>
    </View>
  );
};

export const SettingsView = () => (
  <View title="Settings" subtitle="This is a demo workspace, so settings are read-only here.">
    <Panel className="space-y-3 text-sm">
      <div className="flex justify-between"><span className="text-text-muted">Name</span><span className="text-text-heading">Alex M.</span></div>
      <div className="flex justify-between"><span className="text-text-muted">Plan</span><span className="text-text-heading">Pro (demo)</span></div>
      <div className="flex justify-between"><span className="text-text-muted">Theme</span><span className="text-text-heading">Follows your device</span></div>
      <p className="pt-2 text-xs text-text-muted">Create a free account to change your profile, theme and notifications.</p>
    </Panel>
  </View>
);
