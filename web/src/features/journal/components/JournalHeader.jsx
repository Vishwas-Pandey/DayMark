import React from 'react';
import { Plus, BookOpen, Heart, Flame, PenTool } from 'lucide-react';
import { moodEmoji } from '../utils/mood';

const dayKey = (date) => new Date(date).toDateString();

export const JournalHeader = ({ entries, onOpenCreate }) => {
  const totalEntries = entries?.length || 0;

  const favorites = entries?.filter(e => e.favorite)?.length || 0;

  const totalWords = entries?.reduce((acc, e) => acc + (e.wordCount || 0), 0) || 0;

  const moodScores = (entries || []).map(e => e.mood?.score).filter((s) => typeof s === 'number');
  const avgMoodScore = moodScores.length ? moodScores.reduce((a, b) => a + b, 0) / moodScores.length : null;
  const moodLabel = avgMoodScore == null ? 'No entries yet'
    : avgMoodScore >= 8 ? 'Thriving'
    : avgMoodScore >= 6 ? 'Stable & Positive'
    : avgMoodScore >= 4 ? 'Mixed'
    : 'Rough Patch';

  const streakDays = (() => {
    const days = new Set((entries || []).map(e => dayKey(e.createdAt)));
    let streak = 0;
    const cursor = new Date();
    if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    while (days.has(dayKey(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  })();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-text-heading mb-4">Journal</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-secondary border border-border-default rounded-xl shadow-sm">
            <BookOpen size={16} className="text-blue-500" />
            <span className="text-sm font-semibold text-text-heading">{totalEntries} <span className="text-text-muted font-medium">Entries</span></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-secondary border border-border-default rounded-xl shadow-sm">
            <PenTool size={16} className="text-purple-500" />
            <span className="text-sm font-semibold text-text-heading">{totalWords} <span className="text-text-muted font-medium">Words Written</span></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-secondary border border-border-default rounded-xl shadow-sm">
            <Flame size={16} className="text-orange-500" />
            <span className="text-sm font-semibold text-text-heading">{streakDays} <span className="text-text-muted font-medium">Day Streak</span></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-50 border border-pink-200 rounded-xl shadow-sm">
            <Heart size={16} className="text-pink-500" />
            <span className="text-sm font-semibold text-pink-600">{favorites} <span className="text-pink-600/70 font-medium">Favorites</span></span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 bg-surface-primary p-4 rounded-2xl border border-border-default shadow-sm w-full md:w-[300px] shrink-0 justify-between">
        <div className="flex-1">
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Average Mood</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{moodEmoji({ score: avgMoodScore })}</span>
            <span className="text-sm font-bold text-text-heading">{moodLabel}</span>
          </div>
        </div>
        
        <div className="w-px h-10 bg-border-default shrink-0 hidden md:block" />
        
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
