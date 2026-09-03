import React from 'react';
import { CheckSquare, Activity, Target, Clock, CalendarDays, BookOpen, Smile, Flame } from 'lucide-react';
import { moodEmoji } from '../../journal/utils/mood';

export const AnalyticsOverviewCards = ({ data }) => {
  const cards = [
    { title: 'Tasks Completed', value: data?.tasks?.completed || 0, icon: CheckSquare, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { title: 'Habit Completions', value: data?.habits?.totalCompletions || 0, icon: Activity, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' },
    { title: 'Goal Progress', value: `${Math.round(data?.goals?.avgProgress || 0)}%`, icon: Target, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
    { title: 'Focus Hours', value: Math.round((data?.calendar?.focusTime || 0) / 60), icon: Clock, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
    { title: 'Meeting Hours', value: Math.round((data?.calendar?.meetingTime || 0) / 60), icon: CalendarDays, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { title: 'Journal Entries', value: data?.journal?.entries || 0, icon: BookOpen, color: 'text-teal-500', bg: 'bg-teal-50', border: 'border-teal-200' },
    { title: 'Average Mood', value: moodEmoji({ score: data?.journal?.avgMood }), icon: Smile, color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-200' },
    { title: 'Longest Streak', value: `${data?.habits?.maxStreak || 0}d`, icon: Flame, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((card, i) => (
        <div key={i} className="bg-surface-primary p-4 rounded-2xl border border-border-default shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex justify-between items-start mb-2 relative z-10">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{card.title}</p>
            <div className={`p-1.5 rounded-lg ${card.bg} ${card.color}`}>
              <card.icon size={16} />
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-text-heading">{card.value}</h3>
          </div>
          {/* Subtle gradient effect on hover */}
          <div className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all ${card.bg}`} />
        </div>
      ))}
    </div>
  );
};
