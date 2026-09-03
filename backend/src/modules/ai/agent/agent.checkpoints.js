import { logger } from '#common/logger/index.js';

export const agentCheckpoints = {
  store: new Map(),
  
  create: (state, label) => {
    logger.debug({ action: 'AI_CHECKPOINT_CREATED', label }, 'Creating agent state checkpoint');
    const checkpointId = `cp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    agentCheckpoints.store.set(checkpointId, JSON.parse(JSON.stringify(state)));
    return checkpointId;
  },
  
  restore: (checkpointId) => {
    const cp = agentCheckpoints.store.get(checkpointId);
    if (!cp) throw new Error('Checkpoint not found');
    return JSON.parse(JSON.stringify(cp));
  },
  
  list: (agentId) => {
    // In a real app this would query DB
    return Array.from(agentCheckpoints.store.keys());
  }
};
