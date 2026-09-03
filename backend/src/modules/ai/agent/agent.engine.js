import { agentRuntime } from './agent.runtime.js';
import { agentCheckpoints } from './agent.checkpoints.js';
import { agentHistory } from './agent.history.js';

export const agentEngine = {
  run: agentRuntime.run,
  pause: agentRuntime.pause,
  resume: agentRuntime.resume,
  cancel: agentRuntime.cancel,
  checkpoint: agentRuntime.checkpoint,
  restore: agentRuntime.restore,
  getHistory: agentHistory.get,
  getCheckpoints: agentCheckpoints.list
};
