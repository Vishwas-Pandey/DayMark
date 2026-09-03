import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Edit3, Trash2, Heart } from 'lucide-react';
import { moodEmoji } from '../utils/mood';
import { journalApi } from '../../../api/journal';

export const JournalDetailDrawer = ({ entry: entrySummary, isOpen, onClose, onDelete, onEdit, onToggleFavorite }) => {
  // The list view only has the slim summary shape (excerpt, no content/mood) —
  // fetch the full entry once the drawer is opened.
  const { data: fullEntry } = useQuery({
    queryKey: ['journal', entrySummary?.id],
    queryFn: () => journalApi.get(entrySummary.id).then(res => res.data),
    enabled: Boolean(isOpen && entrySummary?.id)
  });

  const entry = fullEntry || entrySummary;
  if (!entry) return null;
  const isFavorite = entry.favorite ?? entry.tags?.includes('favorite');

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
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[500px] md:w-[700px] bg-surface-primary shadow-2xl border-l border-border-default z-50 flex flex-col"
          >
            <div className="h-16 border-b border-border-default flex items-center justify-between px-6 shrink-0 bg-surface-secondary/50 backdrop-blur-md">
              <span className="font-semibold text-text-muted uppercase tracking-wider text-xs">Reading Mode</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleFavorite(entry.id, !isFavorite)}
                  className={`p-2 rounded-lg transition-colors ${isFavorite ? 'text-pink-500 hover:bg-pink-50' : 'text-text-muted hover:bg-surface-primary hover:text-text-heading'}`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart size={18} className={isFavorite ? 'fill-pink-500' : ''} />
                </button>
                <button
                  onClick={() => onEdit(entry)}
                  className="p-2 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-primary transition-colors"
                >
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => onDelete(entry.id)}
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
            
            <div className="flex-1 overflow-y-auto p-8 lg:p-12">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center gap-4 text-sm font-semibold text-text-muted uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(entry.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</span>
                  <span>•</span>
                  <span>{new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                
                <h1 className="text-4xl font-bold text-text-heading leading-tight">{entry.title || 'Untitled Entry'}</h1>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <div className="px-3 py-1.5 bg-surface-secondary border border-border-default rounded-lg text-sm font-semibold text-text-heading flex items-center gap-2 shadow-sm">
                    {moodEmoji(entry.mood)} <span className="text-text-muted">Mood</span>
                  </div>
                  {entry.tags?.filter(t => t !== 'favorite' && t !== 'pinned').map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 bg-surface-secondary border border-border-default rounded-lg text-sm font-semibold text-text-muted shadow-sm">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none pt-8 pb-12 whitespace-pre-wrap text-text-heading leading-loose">
                  {entry.content}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
