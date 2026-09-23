import { conversationEngine } from './conversation/conversation.engine.js';
import { insightEngine } from './insight.engine.js';

export const aiService = {
  getStatus: () => ({
    status: 'online',
    version: '1.1.0',
    modules: ['chat', 'insights']
  }),

  generateInsights: async (userId, filters) => insightEngine.generateInsights(userId, filters),

  chat: async (userId, request, convId, template) => conversationEngine.chat(userId, request, convId, template),
  listConversations: (userId) => conversationEngine.listConversations(userId),
  getConversation: (convId, userId) => conversationEngine.getHistory(convId, userId),
  deleteConversation: (convId, userId) => conversationEngine.deleteConversation(convId, userId)
};
