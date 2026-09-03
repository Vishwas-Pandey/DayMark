import { executionEngine } from './execution/execution.engine.js';
import { conversationEngine } from './conversation/conversation.engine.js';
import './tools/tasks.tool.js';
import './tools/calendar.tool.js';
import './tools/habits.tool.js';
import './tools/goals.tool.js';
import './tools/journal.tool.js';
import './tools/analytics.tool.js';
import './tools/planning.tool.js';
import './tools/insights.tool.js';
import './tools/memory.tool.js';
import './tools/automation.tool.js';
import { agentEngine } from './agent/agent.engine.js';
import { toolManager } from './tools/tool.manager.js';
import { memoryIndexer } from './memory.indexer.js';
import { memoryRetriever } from './memory.retriever.js';
import { memoryGraph } from './memory.graph.js';
import { knowledgeEngine } from './knowledge.engine.js';
import { llmGateway } from './llm/llm.gateway.js';
import { providerManager } from './providers/provider.manager.js';
import { llmMetrics } from './llm/llm.metrics.js';
import { automationEngine } from './automation.engine.js';
import { insightEngine } from './insight.engine.js';
import { plannerEngine } from './planner.engine.js';
import { aiContext } from './ai.context.js';
import { aiMemory } from './ai.memory.js';
import { aiPipeline } from './ai.pipeline.js';
import { aiEvents } from './ai.events.js';
import { aiJobs } from './ai.jobs.js';

export const aiService = {
  getStatus: () => {
    return {
      status: 'online',
      version: '1.1.0',
      modules: ['context', 'memory', 'pipeline', 'events', 'jobs']
    };
  },
  
  // Updated to pass mode and config
  buildContext: async (userId, mode = 'FULL_CONTEXT', config = {}) => {
    return aiContext.buildContext(userId, mode, config);
  },
  
  buildMemory: async (userId, type, contextSnapshot) => {
    return aiMemory.create(userId, type, contextSnapshot);
  },
  
  getMemory: async (userId, type) => {
    return aiMemory.load(userId, type);
  },
  
  preparePipeline: (config) => {
    return aiPipeline.prepare(config);
  },
  
  runPipeline: async (config, initialContext) => {
    const pipeline = aiPipeline.prepare(config);
    return aiPipeline.run(pipeline.id, initialContext);
  },
  
  getEventsRegistry: () => {
    return aiEvents.getRegistryStatus();
  },
  
  getJobsRegistry: () => {
    return aiJobs.getRegistryStatus();
  },
  
  generatePlan: async (userId, constraints) => {
    return plannerEngine.buildPlan(userId, constraints);
  },
  
  generateInsights: async (userId, filters) => {
    return insightEngine.generateInsights(userId, filters);
  },
  
  executeAutomation: async (userId, payload) => {
    // Normally driven by pub/sub, exposed for REST testing
    return automationEngine.triggerEvent(userId, payload.eventName || 'MANUAL', payload);
  },
  
  testWorkflow: async (userId, payload) => {
    return automationEngine.testWorkflow(userId, payload.workflow, payload.mockData);
  },
  
  getTriggers: () => automationEngine.getAvailableTriggers(),
  getActions: () => automationEngine.getAvailableActions(),
  
  getProvidersHealth: async () => providerManager.healthCheck(),
  testProviderGateway: async (userId, prompt) => llmGateway.generate(userId, prompt),
  getProviderMetrics: () => llmMetrics.getStats(),
  
  indexMemory: async (userId, payload) => memoryIndexer.index(userId, payload.content, payload.metadata, payload.type),
  searchMemory: async (userId, query, options) => memoryRetriever.retrieveRelevantMemory(userId, query, options),
  getRecentMemory: async (userId, options) => memoryRetriever.retrieveRecentMemory(userId, options),
  getRelatedMemory: async (userId, entityId, options) => memoryRetriever.retrieveRelatedObjects(userId, entityId, options),
  getMemoryGraph: async (userId) => memoryGraph.buildRelationships([]),
  getKnowledge: async (userId, query, options) => knowledgeEngine.generateKnowledgePackage(userId, query, options),
  
  runAgent: async (userId, request, convId) => agentEngine.run(userId, request, convId),
  pauseAgent: (agentId) => agentEngine.pause(agentId),
  resumeAgent: (agentId) => agentEngine.resume(agentId),
  cancelAgent: (agentId) => agentEngine.cancel(agentId),
  getAgentHistory: (agentId) => agentEngine.getHistory(agentId),
  getAgentCheckpoints: (agentId) => agentEngine.getCheckpoints(agentId),
  getTools: () => toolManager.listTools(),
  getAgentState: (agentId) => agentEngine.getHistory(agentId).pop(),
  
  chat: async (userId, request, convId, template) => conversationEngine.chat(userId, request, convId, template),
  listConversations: (userId) => conversationEngine.listConversations(userId),
  getConversation: (convId, userId) => conversationEngine.getHistory(convId, userId),
  deleteConversation: (convId, userId) => conversationEngine.deleteConversation(convId, userId),
  archiveConversation: (convId, userId) => conversationEngine.archiveConversation(convId, userId),
  
  executeAction: async (userId, toolCalls, context) => executionEngine.execute(toolCalls, context),
  previewAction: (userId, executionPlan) => executionEngine.preview(executionPlan),
  confirmAction: async (userId, executionPlan, context) => executionEngine.confirm(executionPlan, context),
  getExecutionMetrics: () => executionEngine.getMetrics()
};
