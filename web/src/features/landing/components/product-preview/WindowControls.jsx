import React from 'react';

export const WindowControls = () => (
  <div className="h-10 bg-surface-secondary/50 border-b border-border-subtle flex items-center px-4 justify-between select-none">
    <div className="flex gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500/80" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
      <div className="w-3 h-3 rounded-full bg-green-500/80" />
    </div>
    <div className="text-xs font-medium text-text-muted">app.daymark.ai</div>
    <div className="w-12" /> {/* Spacer for centering */}
  </div>
);