import React from 'react';
import { Heart, Pin, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { moodEmoji } from '../utils/mood';

export const JournalCard = ({ entry, onClick }) => {
  const isFavorite = entry.favorite ?? entry.tags?.includes('favorite');
  const isPinned = entry.pinned ?? entry.tags?.includes('pinned');

  const wordCount = entry.wordCount ?? (entry.content ? entry.content.split(/\s+/).length : 0);
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={onClick}
      className="flex flex-col p-5 rounded-2xl border transition-all cursor-pointer bg-surface-primary shadow-sm hover:shadow-lg border-border-default hover:border-interactive-primary/40 relative overflow-hidden"
    >
      {/* Decorative gradient based on mood */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-interactive-primary/5 blur-3xl rounded-full pointer-events-none" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="text-3xl bg-surface-secondary/50 w-12 h-12 rounded-xl flex items-center justify-center border border-border-default">
            {moodEmoji(entry.mood)}
          </div>
          <div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">
              {new Date(entry.createdAt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric'})}
            </p>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-text-heading line-clamp-1">{entry.title || 'Untitled Entry'}</h3>
              {isPinned && <Pin size={14} className="text-interactive-primary fill-interactive-primary shrink-0" />}
            </div>
          </div>
        </div>
        
        <button 
          className={`p-1.5 rounded-full transition-colors ${isFavorite ? 'text-pink-500 bg-pink-50' : 'text-text-muted hover:bg-surface-secondary'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Heart size={18} className={isFavorite ? 'fill-pink-500' : ''} />
        </button>
      </div>

      <div className="mb-6 flex-1 relative z-10">
        <p className="text-sm text-text-muted line-clamp-3 leading-relaxed">
          {entry.excerpt || entry.content || 'Start reflecting on your day...'}
        </p>
      </div>

      <div className="mt-auto flex justify-between items-center text-xs font-medium text-text-muted relative z-10 border-t border-border-default pt-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <BookOpen size={14} /> {wordCount} words
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {readTime} min read
          </span>
        </div>
        
        {entry.tags && entry.tags.length > 0 && (
          <div className="flex gap-1.5">
            {entry.tags.filter(t => t !== 'favorite' && t !== 'pinned').slice(0, 2).map((tag, i) => (
              <span key={i} className="px-2 py-1 rounded-md bg-surface-secondary border border-border-default text-[10px] uppercase tracking-wider font-bold">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
