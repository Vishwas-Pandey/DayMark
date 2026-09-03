export const toAIStatusDTO = (data) => data;

export const toContextDTO = (data) => {
  return data; // Trust the contextBuilder output structure
};

export const toTimelineDTO = (data) => data;
export const toRelationshipDTO = (data) => data;

export const toMemoryDTO = (memory) => {
  if (!memory) return null;
  const obj = typeof memory.toObject === 'function' ? memory.toObject() : memory;
  return {
    id: obj._id,
    type: obj.type,
    contextSnapshot: obj.contextSnapshot,
    version: obj.version,
    createdAt: obj.createdAt
  };
};

export const toPipelineDTO = (data) => {
  return {
    pipelineId: data.pipelineId,
    status: data.status,
    finalContext: data.finalContext
  };
};

export const toRegistryDTO = (data) => data;

export const toPlanningDTO = (data) => data;
export const toScheduleDTO = (data) => data;
export const toOptimizationDTO = (data) => data;
export const toPlanningScoreDTO = (data) => data;
export const toConstraintDTO = (data) => data;

export const toInsightDTO = (data) => data;
export const toRecommendationDTO = (data) => data;
export const toWarningDTO = (data) => data;
export const toOpportunityDTO = (data) => data;
export const toExplanationDTO = (data) => data;

export const toAutomationDTO = (data) => data;
export const toWorkflowDTO = (data) => data;
export const toTriggerDTO = (data) => data;
export const toActionDTO = (data) => data;
export const toExecutionDTO = (data) => data;

export const toProviderDTO = (data) => data;
export const toGatewayDTO = (data) => data;
export const toMetricsDTO = (data) => data;
export const toHealthDTO = (data) => data;

export const toKnowledgeDTO = (data) => data;
export const toGraphDTO = (data) => data;
export const toSearchResultDTO = (data) => data;
export const toEmbeddingDTO = (data) => data;

export const toAgentDTO = (data) => data;
export const toToolDTO = (data) => data;
export const toToolExecutionDTO = (data) => data;
export const toCheckpointDTO = (data) => data;
export const toRuntimeDTO = (data) => data;

export const toConversationDTO = (data) => data;
export const toMessageDTO = (data) => data;
export const toChatResponseDTO = (data) => data;
export const toUsageDTO = (data) => data;

export const toExecutionPlanDTO = (data) => data;
export const toExecutionResultDTO = (data) => data;
export const toExecutionPreviewDTO = (data) => data;
export const toExecutionAuditDTO = (data) => data;
export const toExecutionMetricsDTO = (data) => data;
