import { logger } from '#common/logger/index.js';

export const conversationSession = {
  sessions: new Map(),
  
  create: (userId) => {
    const convId = `conv_${Date.now()}`;
    conversationSession.sessions.set(convId, { userId, status: 'active', createdAt: new Date() });
    logger.info({ action: 'AI_CHAT_STARTED', convId, userId }, 'New conversation session created');
    return convId;
  },
  
  get: (convId) => conversationSession.sessions.get(convId),

  list: (userId) => Array.from(conversationSession.sessions.entries())
    .filter(([, s]) => String(s.userId) === String(userId) && s.status !== 'archived')
    .map(([id, s]) => ({ id, ...s }))
    .sort((a, b) => b.createdAt - a.createdAt),

  archive: (convId) => {
    const session = conversationSession.sessions.get(convId);
    if (session) {
      session.status = 'archived';
      logger.info({ action: 'AI_CHAT_ARCHIVED', convId }, 'Conversation session archived');
    }
  }
};
