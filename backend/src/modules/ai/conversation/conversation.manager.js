import { logger } from '#common/logger/index.js';
import { conversationSession } from './conversation.session.js';
import { conversationHistory } from './conversation.history.js';
import { conversationContext } from './conversation.context.js';
import { conversationPrompts } from './conversation.prompts.js';
import { conversationResponse } from './conversation.response.js';
import { llmGateway } from '../llm/llm.gateway.js';
import { conversationMessages } from './conversation.messages.js';

// Mongoose ObjectIds from different requests are different object instances
// even when they represent the same user — always compare by string value.
const sameUser = (a, b) => String(a) === String(b);

export const conversationManager = {
  chat: async (userId, request, convId, templateType = 'General Assistant') => {
    if (!convId) {
      convId = conversationSession.create(userId);
    }

    // Validate session
    const session = conversationSession.get(convId);
    if (!session || !sameUser(session.userId, userId)) throw new Error('Invalid conversation session');
    
    // Save user message
    conversationHistory.saveMessage(convId, conversationMessages.formatUserMessage(request));
    
    // Build Context & Prompt
    const context = await conversationContext.build(userId, convId, request);
    const assembledPrompt = conversationPrompts.assemble(context, request, templateType);
    
    // Generate Response (Mocked Gateway Call)
    const rawResponse = await llmGateway.generate(assembledPrompt);
    
    const finalResponse = conversationResponse.buildNormalized(rawResponse, convId);
    
    // Save assistant message
    conversationHistory.saveMessage(convId, conversationMessages.formatAssistantMessage(finalResponse.content));
    
    return finalResponse;
  },
  
  createConversation: conversationSession.create,
  closeConversation: conversationSession.archive, // Close is effectively archive

  archiveConversation: (convId, userId) => {
    const session = conversationSession.get(convId);
    if (!session || !sameUser(session.userId, userId)) return false;
    conversationSession.archive(convId);
    return true;
  },

  deleteConversation: (convId, userId) => {
    const session = conversationSession.get(convId);
    if (!session || !sameUser(session.userId, userId)) return false;
    conversationSession.sessions.delete(convId);
    conversationHistory.deleteConversation(convId);
    return true;
  },

  getHistory: (convId, userId) => {
    const session = conversationSession.get(convId);
    if (!session || !sameUser(session.userId, userId)) return null;
    return conversationHistory.getMessages(convId);
  },

  listConversations: (userId) => {
    return conversationSession.list(userId).map((session) => {
      const messages = conversationHistory.getMessages(session.id);
      const firstUserMessage = messages.find((m) => m.role === 'user');
      const title = firstUserMessage
        ? firstUserMessage.content.slice(0, 48) + (firstUserMessage.content.length > 48 ? '...' : '')
        : 'New conversation';
      return { ...session, title, messageCount: messages.length };
    });
  }
};
