import React from 'react';
import { Plus, BookOpen, Heart, Flame, PenTool } from 'lucide-react';

export const JournalHeader = ({ entries, onOpenCreate }) => {
  const totalEntries = entries?.length || 0;
  
  // Calculate stats based on mocked/real backend data
  const favorites = entries?.filter(e => e.tags?.includes('favorite'))?.length || 0;
  
  // Calculate approximate words and reading time from content
  const totalWords = entries?.reduce((acc, e) => {
    return acc + (e.content ? e.content.split(/\s+/).length : 0);
  }, 0) || 0;

  const getMoodEmoji = () => {
    if (!entries || entries.length === 0) return '😐';
    const moods = entries.map(e => e.mood).filter(Boolean);
    if (moods.length === 0) return '😐';
    
    // Simplistic average mood logic for UI scaffolding
    const goodMoods = ['Great', 'Good', 'Happy', 'Excited', 'Focused', '😊', '🚀', '🌟'];
    const countGood = moods.filter(m => goodMoods.includes(m)).length;
    return (countGood / moods.length) > 0.5 ? '😊' : '😐';
  };

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
            <span className="text-sm font-semibold text-text-heading">3 <span className="text-text-muted font-medium">Day Streak</span></span>
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
            <span className="text-3xl">{getMoodEmoji()}</span>
            <span className="text-sm font-bold text-text-heading">Stable & Positive</span>
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
