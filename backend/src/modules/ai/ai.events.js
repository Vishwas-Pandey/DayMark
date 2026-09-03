import { AI_EVENTS } from './ai.constants.js';
import { logger } from '#common/logger/index.js';

const registry = new Map();

export const aiEvents = {
  register: (eventName, handler) => {
    if (!Object.values(AI_EVENTS).includes(eventName)) {
      throw new Error(`Invalid event name: ${eventName}`);
    }
    
    if (!registry.has(eventName)) {
      registry.set(eventName, []);
    }
    
    registry.get(eventName).push(handler);
    logger.info({ eventName, action: 'AI_EVENT_REGISTERED' }, 'AI Event Handler Registered');
  },
  
  emit: async (eventName, payload) => {
    if (registry.has(eventName)) {
      const handlers = registry.get(eventName);
      for (const handler of handlers) {
        await handler(payload).catch(err => {
          logger.error({ eventName, err }, 'Error executing AI event handler');
        });
      }
    }
  },
  
  getRegistryStatus: () => {
    const status = {};
    for (const [key, val] of registry.entries()) {
      status[key] = val.length;
    }
    return status;
  }
};

// Initialize placeholders
Object.values(AI_EVENTS).forEach(event => {
  aiEvents.register(event, async (payload) => {
    logger.debug({ event, payload }, 'Placeholder event handler triggered');
  });
});
