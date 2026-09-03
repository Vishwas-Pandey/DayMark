import { conversationHistory } from './conversation.history.js';
import { conversationSummarizer } from './conversation.summarizer.js';

export const conversationWindow = {
  getRollingWindow: (convId, maxTokens = 4000) => {
    // In a real app, calculates tokens and trims history or summarizes
    const messages = conversationHistory.getMessages(convId);
    // Return last 10 messages as a mock rolling window
    return messages.slice(-10);
  }
};
