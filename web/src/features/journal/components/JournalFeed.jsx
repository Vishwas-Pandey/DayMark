import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { JournalCard } from './JournalCard';
import { EmptyState } from '../../../components/common/EmptyStates';
import { DashboardSkeleton } from '../../../components/common/Skeletons';

export const JournalFeed = ({ entries, isLoading, error, onClickEntry }) => {
  if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><DashboardSkeleton /><DashboardSkeleton /></div>;
  if (error) return <div className="p-8 rounded-2xl bg-red-50 border border-red-200 text-red-600">Failed to load journal entries. Please try again.</div>;
  if (!entries || entries.length === 0) return (
    <div className="py-20 bg-surface-primary rounded-2xl border border-border-default flex items-center justify-center shadow-sm">
      <EmptyState title="No entries yet." message="Write your first journal entry to start reflecting." />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AnimatePresence>
        {entries.map(entry => (
          <JournalCard 
            key={entry.id} 
            entry={entry}
            onClick={() => onClickEntry(entry)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
