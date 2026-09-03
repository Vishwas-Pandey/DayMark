import React, { useState } from 'react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { useAI } from '../hooks/useAI';
import { aiApi } from '../api/ai';
import { WorkspaceHeader } from '../features/ai/components/WorkspaceHeader';
import { WorkspaceSidebar } from '../features/ai/components/WorkspaceSidebar';
import { WorkspaceChat } from '../features/ai/components/WorkspaceChat';
import { WorkspaceComposer } from '../features/ai/components/WorkspaceComposer';

export const AI = () => {
  const { sendMessage, isGenerating, conversations, isLoadingConversations, deleteConversation } = useAI();

  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const handleSendMessage = (content) => {
    const userMsg = { role: 'user', content };
    setMessages(prev => [...prev, userMsg]);

    const assistantStub = { role: 'assistant', content: 'Thinking...', isStreaming: true };
    setMessages(prev => [...prev, assistantStub]);

    const payload = conversationId ? { message: content, conversationId } : { message: content };
    sendMessage.mutate(payload, {
      onSuccess: (res) => {
        const reply = res?.data;
        if (reply?.conversationId) setConversationId(reply.conversationId);
        setMessages(prev => {
          const newArr = [...prev];
          newArr[newArr.length - 1] = { role: 'assistant', content: reply?.content || "Sorry, I couldn't generate a response." };
          return newArr;
        });
      },
      onError: (err) => {
        setMessages(prev => {
          const newArr = [...prev];
          newArr[newArr.length - 1] = { role: 'assistant', content: err?.message || 'Something went wrong reaching the AI service.', isError: true };
          return newArr;
        });
      }
    });
  };

  const handleNewChat = () => {
    setMessages([]);
    setConversationId(null);
  };

  const handleClear = () => {
    if (window.confirm('Clear active context?')) handleNewChat();
  };

  const handleSelectConversation = async (id) => {
    if (id === conversationId) return;
    setConversationId(id);
    setIsLoadingHistory(true);
    try {
      const res = await aiApi.getConversation(id);
      const history = (res.data || []).map(m => ({ role: m.role, content: m.content }));
      setMessages(history);
    } catch (err) {
      setMessages([{ role: 'assistant', content: 'Could not load that conversation.', isError: true }]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleDeleteConversation = (id) => {
    deleteConversation.mutate(id, {
      onSuccess: () => {
        if (id === conversationId) handleNewChat();
      }
    });
  };

  return (
    <div className="w-full h-[calc(100vh-theme(spacing.16))] sm:h-screen flex overflow-hidden bg-surface-primary">
      <ErrorBoundary>
        <WorkspaceSidebar
          conversations={conversations}
          isLoading={isLoadingConversations}
          currentId={conversationId}
          onSelect={handleSelectConversation}
          onDelete={handleDeleteConversation}
          onNew={handleNewChat}
        />
      </ErrorBoundary>

      <div className="flex-1 flex flex-col min-w-0">
        <ErrorBoundary>
          <WorkspaceHeader
            onClearContext={handleClear}
            onNewChat={handleNewChat}
            memoryStatus={messages.length > 0}
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <WorkspaceChat
            messages={messages}
            isStreaming={isGenerating}
            isLoadingHistory={isLoadingHistory}
            onSelectPrompt={handleSendMessage}
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <WorkspaceComposer
            onSendMessage={handleSendMessage}
            isStreaming={isGenerating}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default AI;
