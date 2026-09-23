import { conversationManager } from './conversation.manager.js';

export const conversationEngine = {
  chat: conversationManager.chat,
  createConversation: conversationManager.createConversation,
  archiveConversation: conversationManager.archiveConversation,
  deleteConversation: conversationManager.deleteConversation,
  getHistory: conversationManager.getHistory,
  listConversations: conversationManager.listConversations
};
