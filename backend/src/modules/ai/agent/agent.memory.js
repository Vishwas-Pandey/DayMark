import { logger } from '#common/logger/index.js';

export const agentMemory = {
  // Short-term episodic memory specifically for the Agent Runtime loop
  contextLines: [],
  addObservation: (observation) => {
    agentMemory.contextLines.push(observation);
  },
  getWorkingContext: () => agentMemory.contextLines
};
