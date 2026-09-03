import { aiService } from './ai.service.js';
import { ApiResponse } from '#common/responses/ApiResponse.js';
import { 
  toAIStatusDTO, 
  toContextDTO, 
  toMemoryDTO, 
  toPipelineDTO, 
  toRegistryDTO,
  toTimelineDTO,
  toRelationshipDTO,
  toPlanningDTO,
  toInsightDTO,
  toRecommendationDTO,
  toWarningDTO,
  toOpportunityDTO,
  toExplanationDTO,
  toAutomationDTO,
  toExecutionDTO,
  toTriggerDTO,
  toActionDTO,
  toProviderDTO,
  toHealthDTO,
  toGatewayDTO,
  toMetricsDTO,
  toKnowledgeDTO,
  toGraphDTO,
  toSearchResultDTO,
  toChatResponseDTO,
  toConversationDTO,
  toMessageDTO,
  toAgentDTO,
  toToolDTO,
  toCheckpointDTO,
  toExecutionResultDTO,
  toExecutionPreviewDTO,
  toExecutionMetricsDTO
} from './ai.dto.js';
import { asyncHandler } from '#common/utils/asyncHandler.js';
import { aiContext } from './ai.context.js'; // Importing contextBuilder directly for specialized endpoints
import { NotFoundError } from '#common/errors/AppError.js';

export const aiController = {
  getStatus: asyncHandler(async (req, res) => {
    const status = aiService.getStatus();
    res.status(200).json(new ApiResponse(200, toAIStatusDTO(status), 'AI Infrastructure Status'));
  }),

  // Updated Generic Context
  getContext: asyncHandler(async (req, res) => {
    const mode = req.query.mode || 'FULL_CONTEXT';
    const context = await aiService.buildContext(req.user._id, mode);
    res.status(200).json(new ApiResponse(200, toContextDTO(context), 'AI Context assembled'));
  }),

  // Specialized Context Modes
  getContextFull: asyncHandler(async (req, res) => {
    const context = await aiService.buildContext(req.user._id, 'FULL_CONTEXT');
    res.status(200).json(new ApiResponse(200, toContextDTO(context), 'Full Context assembled'));
  }),

  getContextDashboard: asyncHandler(async (req, res) => {
    const context = await aiService.buildContext(req.user._id, 'DASHBOARD_CONTEXT');
    res.status(200).json(new ApiResponse(200, toContextDTO(context), 'Dashboard Context assembled'));
  }),

  getContextPlanning: asyncHandler(async (req, res) => {
    const context = await aiService.buildContext(req.user._id, 'PLANNING_CONTEXT');
    res.status(200).json(new ApiResponse(200, toContextDTO(context), 'Planning Context assembled'));
  }),

  getContextReflection: asyncHandler(async (req, res) => {
    const context = await aiService.buildContext(req.user._id, 'REFLECTION_CONTEXT');
    res.status(200).json(new ApiResponse(200, toContextDTO(context), 'Reflection Context assembled'));
  }),

  getContextFocus: asyncHandler(async (req, res) => {
    const context = await aiService.buildContext(req.user._id, 'FOCUS_CONTEXT');
    res.status(200).json(new ApiResponse(200, toContextDTO(context), 'Focus Context assembled'));
  }),

  getContextJournal: asyncHandler(async (req, res) => {
    const context = await aiService.buildContext(req.user._id, 'JOURNAL_CONTEXT');
    res.status(200).json(new ApiResponse(200, toContextDTO(context), 'Journal Context assembled'));
  }),

  getContextTimeline: asyncHandler(async (req, res) => {
    const timeline = await aiContext.buildTimeline(req.user._id);
    res.status(200).json(new ApiResponse(200, toTimelineDTO(timeline), 'Timeline assembled'));
  }),

  getContextRelationships: asyncHandler(async (req, res) => {
    const relationships = await aiContext.buildRelationships(req.user._id);
    res.status(200).json(new ApiResponse(200, toRelationshipDTO(relationships), 'Relationships assembled'));
  }),
  
  getMemory: asyncHandler(async (req, res) => {
    const type = req.query.type || 'recent';
    const memory = await aiService.getMemory(req.user._id, type);
    res.status(200).json(new ApiResponse(200, memory.map(toMemoryDTO), 'AI Memory retrieved'));
  }),
  
  getPipeline: asyncHandler(async (req, res) => {
    const pipeline = aiService.preparePipeline({});
    res.status(200).json(new ApiResponse(200, pipeline, 'AI Pipeline prepared'));
  }),
  
  getEvents: asyncHandler(async (req, res) => {
    const events = aiService.getEventsRegistry();
    res.status(200).json(new ApiResponse(200, toRegistryDTO(events), 'AI Events Registry'));
  }),
  
  getJobs: asyncHandler(async (req, res) => {
    const jobs = aiService.getJobsRegistry();
    res.status(200).json(new ApiResponse(200, toRegistryDTO(jobs), 'AI Jobs Registry'));
  }),
  
  generatePlan: asyncHandler(async (req, res) => {
    const plan = await aiService.generatePlan(req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, toPlanningDTO(plan), 'AI Plan Generated'));
  }),
  
  generateInsights: asyncHandler(async (req, res) => {
    const insights = await aiService.generateInsights(req.user._id, req.query);
    res.status(200).json(new ApiResponse(200, toInsightDTO(insights), 'AI Insights Generated'));
  }),
  
  getRecommendations: asyncHandler(async (req, res) => {
    const insights = await aiService.generateInsights(req.user._id, req.query);
    res.status(200).json(new ApiResponse(200, insights.recommendations.map(toRecommendationDTO), 'AI Recommendations'));
  }),
  
  getWarnings: asyncHandler(async (req, res) => {
    const insights = await aiService.generateInsights(req.user._id, req.query);
    res.status(200).json(new ApiResponse(200, insights.warnings.map(toWarningDTO), 'AI Warnings'));
  }),
  
  getOpportunities: asyncHandler(async (req, res) => {
    const insights = await aiService.generateInsights(req.user._id, req.query);
    res.status(200).json(new ApiResponse(200, insights.opportunities.map(toOpportunityDTO), 'AI Opportunities'));
  }),
  
  getExplanations: asyncHandler(async (req, res) => {
    const insights = await aiService.generateInsights(req.user._id, req.query);
    const explanations = insights.recommendations.map(r => r.explanation);
    res.status(200).json(new ApiResponse(200, explanations.map(toExplanationDTO), 'AI Explanations'));
  }),
  
  executeAutomation: asyncHandler(async (req, res) => {
    const results = await aiService.executeAutomation(req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, results.map(toExecutionDTO), 'Automations executed'));
  }),
  
  testWorkflow: asyncHandler(async (req, res) => {
    const result = await aiService.testWorkflow(req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, toExecutionDTO(result), 'Workflow test executed'));
  }),
  
  getTriggers: asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, aiService.getTriggers().map(toTriggerDTO), 'Supported Triggers'));
  }),
  
  getActions: asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, aiService.getActions().map(toActionDTO), 'Supported Actions'));
  }),
  
  getProvidersHealth: asyncHandler(async (req, res) => {
    const health = await aiService.getProvidersHealth();
    res.status(200).json(new ApiResponse(200, toHealthDTO(health), 'Provider Health'));
  }),
  
  testProviderGateway: asyncHandler(async (req, res) => {
    const result = await aiService.testProviderGateway(req.user._id, req.body.prompt || 'Hello');
    res.status(200).json(new ApiResponse(200, toGatewayDTO(result), 'Gateway Test Response'));
  }),
  
  getProviderMetrics: asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, toMetricsDTO(aiService.getProviderMetrics()), 'Provider Metrics'));
  }),
  
  indexMemory: asyncHandler(async (req, res) => {
    const result = await aiService.indexMemory(req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Memory indexed'));
  }),
  
  searchMemory: asyncHandler(async (req, res) => {
    const results = await aiService.searchMemory(req.user._id, req.query.q, req.query);
    res.status(200).json(new ApiResponse(200, results.map(toSearchResultDTO), 'Semantic Search Results'));
  }),
  
  getRecentMemory: asyncHandler(async (req, res) => {
    const results = await aiService.getRecentMemory(req.user._id, req.query);
    res.status(200).json(new ApiResponse(200, results.map(toSearchResultDTO), 'Recent Memory Results'));
  }),
  
  getRelatedMemory: asyncHandler(async (req, res) => {
    const results = await aiService.getRelatedMemory(req.user._id, req.query.entityId, req.query);
    res.status(200).json(new ApiResponse(200, results.map(toSearchResultDTO), 'Related Memory Results'));
  }),
  
  getMemoryGraph: asyncHandler(async (req, res) => {
    const graph = await aiService.getMemoryGraph(req.user._id);
    res.status(200).json(new ApiResponse(200, toGraphDTO(graph), 'Memory Graph'));
  }),
  
  getKnowledge: asyncHandler(async (req, res) => {
    const knowledge = await aiService.getKnowledge(req.user._id, req.query.q, req.query);
    res.status(200).json(new ApiResponse(200, toKnowledgeDTO(knowledge), 'Knowledge Package'));
  }),
  
  runAgent: asyncHandler(async (req, res) => {
    const state = await aiService.runAgent(req.user._id, req.body.request, req.body.conversationId);
    res.status(200).json(new ApiResponse(200, toAgentDTO(state), 'Agent Execution Complete'));
  }),
  
  pauseAgent: asyncHandler(async (req, res) => {
    const state = aiService.pauseAgent(req.body.agentId);
    res.status(200).json(new ApiResponse(200, toAgentDTO(state), 'Agent Paused'));
  }),
  
  resumeAgent: asyncHandler(async (req, res) => {
    const state = await aiService.resumeAgent(req.body.agentId);
    res.status(200).json(new ApiResponse(200, toAgentDTO(state), 'Agent Resumed'));
  }),
  
  cancelAgent: asyncHandler(async (req, res) => {
    const state = aiService.cancelAgent(req.body.agentId);
    res.status(200).json(new ApiResponse(200, toAgentDTO(state), 'Agent Cancelled'));
  }),
  
  getAgentHistory: asyncHandler(async (req, res) => {
    const history = aiService.getAgentHistory(req.query.agentId);
    res.status(200).json(new ApiResponse(200, history.map(toAgentDTO), 'Agent History'));
  }),
  
  getAgentCheckpoints: asyncHandler(async (req, res) => {
    const checkpoints = aiService.getAgentCheckpoints(req.query.agentId);
    res.status(200).json(new ApiResponse(200, checkpoints.map(toCheckpointDTO), 'Agent Checkpoints'));
  }),
  
  getAgentTools: asyncHandler(async (req, res) => {
    const tools = aiService.getTools();
    res.status(200).json(new ApiResponse(200, tools.map(toToolDTO), 'Available Agent Tools'));
  }),
  
  getAgentState: asyncHandler(async (req, res) => {
    const state = aiService.getAgentState(req.query.agentId);
    res.status(200).json(new ApiResponse(200, toAgentDTO(state), 'Agent State'));
  }),

  chat: asyncHandler(async (req, res) => {
    const response = await aiService.chat(req.user._id, req.body.message, req.body.conversationId, req.body.template);
    res.status(200).json(new ApiResponse(200, toChatResponseDTO(response), 'Chat Response'));
  }),

  streamChat: (req, res) => {
    // Needs different setup than asyncHandler for streaming
    import('./conversation/conversation.engine.js').then(engine => engine.conversationEngine.streamChat(res, req.body));
  },

  listConversations: asyncHandler(async (req, res) => {
    const convs = aiService.listConversations(req.user._id);
    res.status(200).json(new ApiResponse(200, convs.map(toConversationDTO), 'Conversations List'));
  }),

  getConversation: asyncHandler(async (req, res) => {
    const history = aiService.getConversation(req.params.id, req.user._id);
    if (!history) throw new NotFoundError('Conversation not found');
    res.status(200).json(new ApiResponse(200, history.map(toMessageDTO), 'Conversation History'));
  }),

  deleteConversation: asyncHandler(async (req, res) => {
    const ok = aiService.deleteConversation(req.params.id, req.user._id);
    if (!ok) throw new NotFoundError('Conversation not found');
    res.status(200).json(new ApiResponse(200, null, 'Conversation Deleted'));
  }),

  archiveConversation: asyncHandler(async (req, res) => {
    const ok = aiService.archiveConversation(req.params.id, req.user._id);
    if (!ok) throw new NotFoundError('Conversation not found');
    res.status(200).json(new ApiResponse(200, null, 'Conversation Archived'));
  }),

  executeAction: asyncHandler(async (req, res) => {
    const context = req.body.context || { userId: req.user._id };
    const result = await aiService.executeAction(req.user._id, req.body.toolCalls, context);
    if (result.status === 'PENDING_CONFIRMATION') {
      res.status(200).json(new ApiResponse(200, result, 'Execution Requires Confirmation'));
    } else {
      res.status(200).json(new ApiResponse(200, toExecutionResultDTO(result), 'Execution Completed'));
    }
  }),

  previewAction: asyncHandler(async (req, res) => {
    const preview = aiService.previewAction(req.user._id, req.body.plan);
    res.status(200).json(new ApiResponse(200, toExecutionPreviewDTO(preview), 'Execution Preview'));
  }),

  confirmAction: asyncHandler(async (req, res) => {
    const context = { userId: req.user._id };
    const result = await aiService.confirmAction(req.user._id, req.body.plan, context);
    res.status(200).json(new ApiResponse(200, toExecutionResultDTO(result), 'Execution Confirmed'));
  }),

  getExecutionMetrics: asyncHandler(async (req, res) => {
    const metrics = aiService.getExecutionMetrics();
    res.status(200).json(new ApiResponse(200, toExecutionMetricsDTO(metrics), 'Execution Metrics'));
  })
};
