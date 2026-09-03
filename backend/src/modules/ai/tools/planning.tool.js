import { toolManager } from './tool.manager.js';

export const planningTool = {
  name: 'planning_manager',
  description: 'Manage planning data natively.',
  inputSchema: {},
  outputSchema: {},
  permissions: ['read', 'write'],
  version: '1.0.0'
};

const planningHandler = async (args, context) => {
  return { success: true, tool: 'planning_manager', data: `Executed planning operation` };
};

// Auto-register
toolManager.registerTool(planningTool, planningHandler);
