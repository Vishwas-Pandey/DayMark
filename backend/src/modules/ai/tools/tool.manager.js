import { toolRegistry } from './tool.registry.js';
import { toolExecutor } from './tool.executor.js';

export const toolManager = {
  registerTool: toolRegistry.register,
  getTool: toolRegistry.get,
  listTools: toolRegistry.list,
  executeTool: toolExecutor.executeSingle,
  executeParallel: toolExecutor.executeParallel
};
