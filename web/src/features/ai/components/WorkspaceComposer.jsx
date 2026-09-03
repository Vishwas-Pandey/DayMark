import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const WorkspaceComposer = ({ onSendMessage, isStreaming }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="p-4 bg-surface-primary border-t border-border-default">
      <div className="max-w-4xl mx-auto relative">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-surface-secondary border border-border-default rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-interactive-primary focus-within:border-transparent transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Message DayMark AI... (Shift+Enter for new line)"
            className="flex-1 bg-transparent border-none text-text-heading resize-none max-h-[200px] min-h-[44px] py-3 px-2 focus:outline-none focus:ring-0 placeholder:text-text-muted text-sm leading-relaxed"
            rows={1}
            style={{ minHeight: '44px' }}
            disabled={isStreaming}
          />

          <div className="p-2 shrink-0">
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="w-10 h-10 rounded-xl bg-interactive-primary text-white shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-interactive-primary/90 transition-all focus-ring outline-none"
              title="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
        <div className="text-center mt-2">
          <span className="text-[10px] font-medium text-text-muted">AI can make mistakes. Consider verifying important information.</span>
        </div>
      </div>
    </div>
  );
};
