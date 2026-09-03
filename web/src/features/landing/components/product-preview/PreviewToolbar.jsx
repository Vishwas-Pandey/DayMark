import React from 'react';

export const PreviewToolbar = () => (
  <div className="h-14 border-b border-border-subtle flex items-center justify-between px-6 bg-surface-primary/80 backdrop-blur">
    <div className="flex items-center gap-4 text-text-muted">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <span className="text-sm">Search anywhere... (⌘K)</span>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-full bg-interactive-primary/20 flex items-center justify-center">
        <span className="text-xs font-bold text-interactive-primary">JD</span>
      </div>
    </div>
  </div>
);