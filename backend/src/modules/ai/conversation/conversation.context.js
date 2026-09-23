import { conversationMemory } from './conversation.memory.js';
import { conversationWindow } from './conversation.window.js';

export const conversationContext = {
  build: async (userId, convId) => {
    const window = conversationWindow.getRollingWindow(convId);
    const memory = await conversationMemory.fetchRelevantContext(userId);
    return { window, memory };
  }
};
