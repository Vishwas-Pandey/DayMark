export const executionResult = {
  build: (planId, status, output, durationMs, error = null) => ({
    planId,
    status,
    output,
    durationMs,
    error,
    timestamp: new Date()
  })
};
