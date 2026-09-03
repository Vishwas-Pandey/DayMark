import { logger } from '#common/logger/index.js';
import { conversationTemplates } from './conversation.templates.js';
import { conversationGuardrails } from './conversation.guardrails.js';

export const conversationPrompts = {
  assemble: (context, currentMessage, templateType) => {
    logger.info({ action: 'AI_PROMPT_GENERATED' }, 'Assembling final prompt');
    
    const safeMessage = conversationGuardrails.sanitizePrompt(currentMessage);
    const systemPrompt = conversationTemplates.getSystemPrompt(templateType);
    
    const assembledPrompt = `${systemPrompt}\n\nContext:\n${context.memory}\n\nHistory:\n${JSON.stringify(context.window)}\n\nUser: ${safeMessage}`;
    
    return assembledPrompt;
  }
};
