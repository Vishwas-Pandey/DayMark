import { toolManager } from './tool.manager.js';

export const habitsTool = {
  name: 'habits_manager',
  description: 'Manage habits data natively.',
  inputSchema: {},
  outputSchema: {},
  permissions: ['read', 'write'],
  version: '1.0.0'
};

const habitsHandler = async (args, context) => {
  return { success: true, tool: 'habits_manager', data: `Executed habits operation` };
};

// Auto-register
toolManager.registerTool(habitsTool, habitsHandler);
