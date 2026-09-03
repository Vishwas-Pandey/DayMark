import { logger } from '#common/logger/index.js';
import { conversationMemory } from './conversation.memory.js';
import { conversationWindow } from './conversation.window.js';

export const conversationContext = {
  build: async (userId, convId, currentMessage) => {
    logger.debug({ action: 'AI_CONTEXT_BUILT', convId }, 'Building rich context for prompt');
    const window = conversationWindow.getRollingWindow(convId);
    const memory = await conversationMemory.fetchRelevantContext(userId, currentMessage);
    
    return {
      window,
      memory,
      graph: 'Graph Context Mock',
      userProfile: 'User Profile Mock'
    };
  }
};
