import React, { useRef, useEffect } from 'react';
import { Sparkles, User } from 'lucide-react';

const MessageCard = ({ message, isStreaming }) => {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-[80%] bg-surface-primary border border-border-default rounded-2xl rounded-tr-sm p-4 shadow-sm relative">
          <div className="absolute -right-3 -top-3 w-8 h-8 rounded-full bg-interactive-primary/10 flex items-center justify-center border border-border-default/50 backdrop-blur-sm">
            <User size={14} className="text-interactive-primary" />
          </div>
          <p className="text-text-heading leading-relaxed text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-6 w-full">
      <div className="w-full flex gap-4 max-w-3xl">
        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100 shadow-sm">
          <Sparkles size={16} className="text-purple-500" />
        </div>
        <div className="flex-1 space-y-4">
          <div className={`prose prose-sm dark:prose-invert max-w-none leading-relaxed ${message.isError ? 'text-interactive-danger' : 'text-text-heading'}`}>
            {message.content}
            {isStreaming && <span className="inline-block w-1.5 h-4 ml-1 bg-interactive-primary animate-pulse align-middle" />}
          </div>
        </div>
      </div>
    </div>
  );
};

const STARTER_PROMPTS = [
  'Plan my day',
  'Reflect on my week',
  'Optimize my schedule',
  'Break down a project',
];

export const WorkspaceChat = ({ messages, isStreaming, isLoadingHistory, onSelectPrompt }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  if (isLoadingHistory) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface-secondary/30">
        <div className="w-6 h-6 border-2 border-interactive-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-surface-secondary/30">
        <div className="w-20 h-20 bg-interactive-primary/10 rounded-3xl flex items-center justify-center mb-6 border border-interactive-primary/20 shadow-inner">
          <Sparkles size={40} className="text-interactive-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text-heading mb-3">How can I help you today?</h2>
        <p className="text-text-muted max-w-md mb-8">DayMark AI can chat about your schedule, your habits, and how your week is going.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onSelectPrompt?.(prompt)}
              className="p-4 bg-surface-primary border border-border-default rounded-xl text-left hover:border-interactive-primary/50 hover:shadow-md transition-all group focus-ring outline-none"
            >
              <span className="font-semibold text-text-heading text-sm group-hover:text-interactive-primary transition-colors">{prompt} →</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-surface-secondary/30" ref={scrollRef}>
      <div className="max-w-4xl mx-auto">
        {messages.map((msg, i) => (
          <MessageCard
            key={i}
            message={msg}
            isStreaming={isStreaming && i === messages.length - 1 && msg.role === 'assistant'}
          />
        ))}
      </div>
    </div>
  );
};
