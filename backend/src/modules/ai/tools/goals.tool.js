import { toolManager } from './tool.manager.js';

export const goalsTool = {
  name: 'goals_manager',
  description: 'Manage goals data natively.',
  inputSchema: {},
  outputSchema: {},
  permissions: ['read', 'write'],
  version: '1.0.0'
};

const goalsHandler = async (args, context) => {
  return { success: true, tool: 'goals_manager', data: `Executed goals operation` };
};

// Auto-register
toolManager.registerTool(goalsTool, goalsHandler);
