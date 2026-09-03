import { logger } from '#common/logger/index.js';
import { llmGateway } from '../llm/llm.gateway.js';
import { toolManager } from '../tools/tool.manager.js';

export const agentPlanner = {
  planNextStep: async (state, request, context) => {
    logger.debug({ action: 'AI_AGENT_PLANNING', step: state.step }, 'LLM deciding next action');
    
    // In a real implementation, this calls llmGateway.chat() with tools bound.
    // For now, we mock a deterministic tool choice.
    
    if (state.step === 0) {
      return {
        toolName: 'tasks_manager',
        toolArgs: { action: 'list' },
        reasoning: 'Need to check tasks to fulfill request.',
        stop: false
      };
    } else {
      return {
        toolName: null,
        toolArgs: null,
        reasoning: 'I have finished the request.',
        stop: true,
        finalResult: 'Task management sequence complete.'
      };
    }
  }
};
