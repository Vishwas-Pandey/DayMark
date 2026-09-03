import React from 'react';
import { motion } from 'framer-motion';
import { Book, Plus } from 'lucide-react';
import { useJournal } from '../../../hooks/useJournal';
import { WidgetSkeleton } from '../../../components/common/Skeletons';
import { EmptyState } from '../../../components/common/EmptyStates';
import { moodEmoji } from '../../journal/utils/mood';

export const JournalWidget = () => {
  const { data: entries, isLoading, error } = useJournal();

  if (isLoading) return <WidgetSkeleton />;
  if (error) return <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 h-full">Failed to load journal.</div>;
  
  const latestEntry = entries?.[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-5 rounded-xl border border-border-default bg-surface-primary shadow-sm h-[320px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-text-heading flex items-center gap-2">
          Journal
        </h3>
        <button className="p-1.5 text-text-muted hover:text-text-heading hover:bg-surface-secondary rounded-md transition-colors">
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {!latestEntry ? (
          <EmptyState title="No entries yet" message="Capture your thoughts and reflections." />
        ) : (
          <div className="flex-1 flex flex-col p-4 rounded-xl bg-surface-secondary/50 border border-border-default hover:border-interactive-primary/30 transition-colors cursor-pointer overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                {new Date(latestEntry.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
              <span className="text-lg leading-none">{moodEmoji(latestEntry.mood)}</span>
            </div>
            <h4 className="text-sm font-bold text-text-heading mb-2 truncate">{latestEntry.title}</h4>
            <p className="text-xs text-text-muted line-clamp-4 leading-relaxed whitespace-pre-wrap">
              {latestEntry.content || 'Empty entry...'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
