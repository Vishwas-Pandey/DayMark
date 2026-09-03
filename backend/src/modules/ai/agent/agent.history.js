export const agentHistory = {
  store: [],
  record: (agentState) => {
    agentHistory.store.push(agentState);
  },
  get: (agentId) => {
    return agentHistory.store.filter(s => s.agentId === agentId);
  }
};
