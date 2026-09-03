import { logger } from '#common/logger/index.js';
import { agentPlanner } from './agent.planner.js';
import { agentExecutor } from './agent.executor.js';
import { agentCheckpoints } from './agent.checkpoints.js';

export const agentOrchestrator = {
  runLoop: async (state, request, context) => {
    logger.info({ action: 'AI_AGENT_STARTED', agentId: state.agentId }, 'Agent loop started');
    state.executionStatus = 'running';
    
    while (state.executionStatus === 'running' && state.step < 10) {
      // Checkpoint BEFORE LLM
      agentCheckpoints.create(state, 'before_llm');
      
      const plan = await agentPlanner.planNextStep(state, request, context);
      state.reasoningMetadata.push(plan.reasoning);
      
      if (plan.stop) {
        state.executionStatus = 'completed';
        state.finalResult = plan.finalResult;
        logger.info({ action: 'AI_AGENT_COMPLETED', agentId: state.agentId }, 'Agent completed task');
        break;
      }
      
      logger.info({ action: 'AI_TOOL_SELECTED', tool: plan.toolName }, 'Agent selected tool');
      
      // Checkpoint BEFORE Tool
      agentCheckpoints.create(state, 'before_tool');
      
      const observation = await agentExecutor.executeTool(plan.toolName, plan.toolArgs, context);
      
      state.toolCalls.push({ name: plan.toolName, args: plan.toolArgs });
      state.observations.push(observation);
      
      // Checkpoint AFTER Tool
      agentCheckpoints.create(state, 'after_tool');
      
      state.step++;
    }
    
    return state;
  }
};
