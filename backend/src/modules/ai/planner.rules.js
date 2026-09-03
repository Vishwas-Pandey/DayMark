export const plannerRules = {
  // Collection of deterministic boolean rules for the scheduler
  canScheduleDuring: (timeSlot, constraints) => true,
  isOverlapping: (eventA, eventB) => false,
  requiresBreakAfter: (blockDuration, maxDeepWorkBlock) => blockDuration >= maxDeepWorkBlock
};
