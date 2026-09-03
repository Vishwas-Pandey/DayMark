export const agentContext = {
  build: (userId, request) => {
    return {
      userId,
      request,
      permissions: ['read', 'write'], // derived from actual user session
      timestamp: new Date()
    };
  }
};
