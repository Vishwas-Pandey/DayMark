import React from 'react';
import { Sparkles, Trash2, BrainCircuit } from 'lucide-react';

export const WorkspaceHeader = ({ memoryStatus, onClearContext, onNewChat }) => {
  return (
    <div className="h-16 border-b border-border-default flex items-center justify-between px-6 shrink-0 bg-surface-primary/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-text-heading flex items-center gap-2">
          <Sparkles size={18} className="text-interactive-primary" />
          DayMark AI
        </h1>
        {memoryStatus && (
          <span className="hidden sm:flex px-2 py-1 bg-green-50 border border-green-200 rounded text-[10px] font-bold text-green-600 uppercase tracking-wider items-center gap-1">
            <BrainCircuit size={12} /> Context active
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onClearContext}
          className="p-2 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-secondary transition-colors focus-ring outline-none"
          title="Clear Context"
          aria-label="Clear context"
        >
          <Trash2 size={18} />
        </button>
        <div className="w-px h-4 bg-border-default mx-1" />
        <button
          onClick={onNewChat}
          className="px-3 py-1.5 bg-interactive-primary text-white font-semibold text-sm rounded-lg hover:bg-interactive-primary/90 transition-all shadow-sm focus-ring outline-none"
        >
          New Chat
        </button>
      </div>
    </div>
  );
};
