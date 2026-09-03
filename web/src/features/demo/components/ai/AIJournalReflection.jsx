import React from 'react';

export const AIJournalReflection = () => {
  return (
    <div className="p-6 rounded-2xl bg-surface-primary border border-border-default relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-interactive-primary/10 rounded-full blur-2xl pointer-events-none" />
      <h3 className="text-sm font-bold text-text-heading mb-4">Sentiment Analysis</h3>
      <div className="space-y-4">
        <div>
          <span className="text-xs text-text-muted block mb-1">Recent Themes</span>
          <div className="flex flex-wrap gap-2">
            {["High Focus", "Anxiety", "Ship Faster"].map(t => (
              <span key={t} className="px-2 py-1 rounded-md bg-surface-secondary text-xs font-medium text-text-heading border border-border-subtle">{t}</span>
            ))}
          </div>
        </div>
        <p className="text-sm text-text-muted border-l-2 border-interactive-primary pl-3 italic">
          "Feeling highly motivated but stretched thin."
        </p>
      </div>
    </div>
  );
};