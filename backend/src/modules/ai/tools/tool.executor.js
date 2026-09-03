import { logger } from '#common/logger/index.js';
import { toolRegistry } from './tool.registry.js';
import { toolPermissions } from './tool.permissions.js';
import { toolValidator } from './tool.validator.js';
import { toolMetrics } from './tool.metrics.js';

export const toolExecutor = {
  executeSingle: async (toolName, inputArgs, context) => {
    logger.info({ action: 'AI_TOOL_EXECUTED', toolName }, 'Executing agent tool');
    
    const startTime = Date.now();
    const tool = toolRegistry.get(toolName);
    
    if (!tool) throw new Error(`Tool ${toolName} not found`);
    if (!toolPermissions.validate(toolName, tool.permissions, context)) throw new Error('Permission denied');
    toolValidator.validateInput(tool, inputArgs);
    
    try {
      const result = await tool.handler(inputArgs, context);
      toolValidator.validateOutput(tool, result);
      toolMetrics.recordExecution(toolName, Date.now() - startTime, true);
      return result;
    } catch (err) {
      toolMetrics.recordExecution(toolName, Date.now() - startTime, false);
      logger.error({ action: 'AI_TOOL_FAILED', toolName, error: err.message }, 'Tool execution failed');
      throw err;
    }
  },
  
  executeParallel: async (toolCalls, context) => {
    return Promise.all(toolCalls.map(call => toolExecutor.executeSingle(call.name, call.args, context)));
  }
};
