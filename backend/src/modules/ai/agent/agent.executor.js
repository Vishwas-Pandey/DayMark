import { toolManager } from '../tools/tool.manager.js';
import { executionEngine } from '../execution/execution.engine.js';

export const agentExecutor = {
  executeTool: async (toolName, toolArgs, context) => {
    // Delegate to the real Execution Engine to safely route, preview, confirm, and execute
    const toolCalls = [{ name: toolName, args: toolArgs }];
    return executionEngine.execute(toolCalls, context);
  }
};
