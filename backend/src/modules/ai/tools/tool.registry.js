import { logger } from '#common/logger/index.js';

export const toolRegistry = {
  tools: new Map(),
  
  register: (toolDef, handler) => {
    toolRegistry.tools.set(toolDef.name, { ...toolDef, handler });
  },
  
  get: (name) => toolRegistry.tools.get(name),
  
  list: () => Array.from(toolRegistry.tools.values()).map(t => {
    const { handler, ...rest } = t;
    return rest;
  })
};
