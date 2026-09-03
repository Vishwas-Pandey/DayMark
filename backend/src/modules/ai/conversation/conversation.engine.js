import { conversationManager } from './conversation.manager.js';
import { conversationStreaming } from './conversation.streaming.js';

export const conversationEngine = {
  chat: conversationManager.chat,
  streamChat: conversationStreaming.handleStream, // Assuming direct mapping for brevity in mock
  createConversation: conversationManager.createConversation,
  archiveConversation: conversationManager.archiveConversation,
  deleteConversation: conversationManager.deleteConversation,
  getHistory: conversationManager.getHistory,
  listConversations: conversationManager.listConversations
};
