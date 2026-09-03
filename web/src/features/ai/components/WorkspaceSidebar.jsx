import React from 'react';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';

export const WorkspaceSidebar = ({ conversations, isLoading, currentId, onSelect, onDelete, onNew }) => {
  return (
    <div className="w-[280px] h-full border-r border-border-default bg-surface-secondary flex flex-col hidden lg:flex">
      <div className="p-4 border-b border-border-default">
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-surface-primary border border-border-default text-sm font-semibold text-text-heading hover:border-interactive-primary/50 transition-colors focus-ring outline-none"
        >
          <Plus size={16} /> New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-2 mb-2">Conversations</h3>

        {isLoading && (
          <div className="space-y-2 px-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-9 rounded-lg bg-surface-primary/60 animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && (!conversations || conversations.length === 0) && (
          <p className="text-xs text-text-muted px-2 py-4">No conversations yet. Send a message to start one.</p>
        )}

        {!isLoading && conversations?.map((conv) => (
          <div
            key={conv.id}
            className={`group w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${currentId === conv.id ? 'bg-surface-primary border border-border-default shadow-sm text-text-heading' : 'text-text-muted hover:bg-surface-primary hover:text-text-heading'}`}
            onClick={() => onSelect(conv.id)}
          >
            <MessageSquare size={14} className={currentId === conv.id ? 'text-interactive-primary shrink-0' : 'opacity-60 shrink-0'} />
            <span className="truncate flex-1">{conv.title}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
              className="opacity-0 group-hover:opacity-100 p-1 text-text-muted hover:text-red-500 transition-opacity shrink-0 focus-ring outline-none"
              aria-label="Delete conversation"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
