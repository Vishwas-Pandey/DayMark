import React from 'react';

export const EmptyState = ({ title, description, icon, actionText, onAction }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-surface-secondary/30 rounded-2xl border border-border-default border-dashed">
    <div className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center text-text-muted mb-4">
      {icon || <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>}
    </div>
    <h3 className="text-sm font-semibold text-text-heading mb-1">{title}</h3>
    <p className="text-xs text-text-muted mb-4 max-w-[200px]">{description}</p>
    {actionText && (
      <button onClick={onAction} className="px-4 py-2 bg-interactive-primary text-text-heading text-xs font-semibold rounded-lg hover:bg-interactive-primary/90 transition-colors focus-ring">
        {actionText}
      </button>
    )}
  </div>
);
