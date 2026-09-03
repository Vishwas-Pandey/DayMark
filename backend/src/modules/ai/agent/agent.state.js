export const agentState = {
  create: (agentId, conversationId) => ({
    agentId,
    conversationId,
    step: 0,
    toolCalls: [],
    observations: [],
    reasoningMetadata: [],
    executionStatus: 'initialized', // initialized, running, paused, completed, cancelled, failed
    duration: 0,
    tokenUsage: 0,
    provider: null
  })
};
