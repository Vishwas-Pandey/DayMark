export const conversationMessages = {
  formatUserMessage: (text) => ({ role: 'user', content: text }),
  formatAssistantMessage: (text) => ({ role: 'assistant', content: text }),
  formatSystemMessage: (text) => ({ role: 'system', content: text })
};
