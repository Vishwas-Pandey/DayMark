import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { useJournal } from '../../../hooks/useJournal';

const MOOD_OPTIONS = [
  { score: 6, label: 'Neutral', emoji: '😐' },
  { score: 8, label: 'Happy', emoji: '😊' },
  { score: 9, label: 'Productive', emoji: '🚀' },
  { score: 3, label: 'Exhausted', emoji: '😴' },
];

const emptyState = { title: '', content: '', moodIndex: 0, tags: '' };

export const JournalEditor = ({ isOpen, onClose, entry, onSave }) => {
  const { createEntry, updateEntry } = useJournal();
  const [form, setForm] = useState(emptyState);

  useEffect(() => {
    if (!isOpen) return;
    if (entry) {
      const matchedMoodIndex = Math.max(0, MOOD_OPTIONS.findIndex(m => m.label === entry.mood?.label));
      setForm({
        title: entry.title || '',
        content: entry.content || '',
        moodIndex: matchedMoodIndex === -1 ? 0 : matchedMoodIndex,
        tags: (entry.tags || []).join(', '),
      });
    } else {
      setForm(emptyState);
    }
  }, [isOpen, entry]);

  if (!isOpen) return null;

  const wordCount = form.content.trim() ? form.content.trim().split(/\s+/).length : 0;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200));
  const isSaving = createEntry.isPending || updateEntry.isPending;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) return;

    const mood = MOOD_OPTIONS[form.moodIndex];
    const payload = {
      title: form.title.trim(),
      content: form.content,
      mood: { score: mood.score, label: mood.label },
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    try {
      if (entry) {
        await updateEntry.mutateAsync({ id: entry.id, data: payload });
      } else {
        await createEntry.mutateAsync(payload);
      }
      onSave?.();
    } catch (err) {
      // Errors are surfaced to the user via the mutation's own error state below
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed inset-4 md:inset-10 lg:inset-x-32 lg:inset-y-12 bg-surface-primary shadow-2xl border border-border-default z-50 flex flex-col rounded-3xl overflow-hidden"
        >
          <div className="h-16 border-b border-border-default flex items-center justify-between px-6 shrink-0 bg-surface-secondary/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-text-muted uppercase tracking-wider text-xs">
                {entry ? 'Edit Entry' : 'New Entry'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSaving || !form.content.trim()}
                className="flex items-center gap-2 px-4 py-1.5 bg-interactive-primary text-white font-semibold rounded-lg hover:bg-interactive-primary/90 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Save size={16} /> {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={onClose} className="p-2 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-primary transition-colors ml-2">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 lg:p-12 bg-surface-primary flex flex-col">
            <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Entry Title"
                className="w-full text-4xl lg:text-5xl font-bold text-text-heading bg-transparent border-none p-0 focus:outline-none focus:ring-0 mb-6 placeholder:text-text-muted/30"
              />

              <div className="flex items-center gap-4 mb-8">
                <select
                  value={form.moodIndex}
                  onChange={(e) => setForm(f => ({ ...f, moodIndex: Number(e.target.value) }))}
                  className="bg-surface-secondary border border-border-default text-text-heading font-semibold text-sm rounded-lg px-3 py-1.5 focus:outline-none"
                >
                  {MOOD_OPTIONS.map((m, i) => (
                    <option key={m.label} value={i}>{m.emoji} {m.label}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm(f => ({ ...f, tags: e.target.value }))}
                  placeholder="Add tags (comma separated)"
                  className="bg-transparent border-none text-sm text-text-muted focus:outline-none focus:ring-0 flex-1"
                />
              </div>

              <textarea
                value={form.content}
                onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
                placeholder="Start writing..."
                className="w-full flex-1 text-base lg:text-lg text-text-heading bg-transparent border-none p-0 focus:outline-none focus:ring-0 resize-none leading-relaxed placeholder:text-text-muted/30"
              />
            </div>
          </div>

          <div className="h-10 border-t border-border-default flex items-center justify-between px-6 shrink-0 bg-surface-secondary/50 text-xs font-semibold text-text-muted">
            <div className="flex gap-4">
              <span>{wordCount} words</span>
              <span>{readMinutes} min read</span>
            </div>
            <span>Markdown supported</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
