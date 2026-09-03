import { logger } from '#common/logger/index.js';

export const conversationHistory = {
  store: new Map(), // Mock persistence
  
  saveMessage: (convId, message) => {
    if (!conversationHistory.store.has(convId)) {
      conversationHistory.store.set(convId, []);
    }
    conversationHistory.store.get(convId).push(message);
    logger.debug({ action: 'AI_MESSAGE_SAVED', convId }, 'Message saved to history');
  },
  
  getMessages: (convId) => {
    return conversationHistory.store.get(convId) || [];
  },
  
  deleteConversation: (convId) => {
    return conversationHistory.store.delete(convId);
  }
};
