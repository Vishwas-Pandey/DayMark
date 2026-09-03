import { Router } from 'express';
import { aiController } from './ai.controller.js';
import { contextModeSchema, memoryQuerySchema, planningConfigSchema, insightFilterSchema, automationExecutionSchema, automationTestSchema, providerTestSchema, memoryIndexSchema, memorySearchSchema, agentRunSchema, agentActionSchema, chatRequestSchema } from './ai.validator.js';
import { validate } from '#common/middlewares/validate.middleware.js';
import { authenticate } from '#modules/auth/auth.middleware.js';

const router = Router();

// Apply auth to all AI routes
router.use(authenticate);

// System Status
router.get('/status', aiController.getStatus);

// Specialized Context Endpoints
router.get('/context/full', aiController.getContextFull);
router.get('/context/dashboard', aiController.getContextDashboard);
router.get('/context/planning', aiController.getContextPlanning);
router.get('/context/reflection', aiController.getContextReflection);
router.get('/context/focus', aiController.getContextFocus);
router.get('/context/journal', aiController.getContextJournal);
router.get('/context/timeline', aiController.getContextTimeline);
router.get('/context/relationships', aiController.getContextRelationships);

// Original Infrastructure Endpoints
router.get('/context', validate(contextModeSchema), aiController.getContext);
router.get('/memory', validate(memoryQuerySchema), aiController.getMemory);
router.get('/pipeline', aiController.getPipeline);
router.get('/events', aiController.getEvents);
router.get('/jobs', aiController.getJobs);


// Planning Endpoints
router.post('/planning/generate', validate(planningConfigSchema), aiController.generatePlan);


// Insight Endpoints
router.get('/insights', validate(insightFilterSchema), aiController.generateInsights);
router.get('/insights/today', validate(insightFilterSchema), aiController.generateInsights);
router.get('/insights/recommendations', validate(insightFilterSchema), aiController.getRecommendations);
router.get('/insights/warnings', validate(insightFilterSchema), aiController.getWarnings);
router.get('/insights/opportunities', validate(insightFilterSchema), aiController.getOpportunities);
router.get('/insights/explanations', validate(insightFilterSchema), aiController.getExplanations);


// Automation Endpoints
router.get('/automation', aiController.getTriggers); // Mock alias
router.get('/automation/triggers', aiController.getTriggers);
router.get('/automation/actions', aiController.getActions);
router.post('/automation/execute', validate(automationExecutionSchema), aiController.executeAutomation);
router.post('/automation/test', validate(automationTestSchema), aiController.testWorkflow);


// Provider Gateway Endpoints
router.get('/providers', aiController.getProvidersHealth); // mock alias
router.get('/providers/health', aiController.getProvidersHealth);
router.post('/providers/test', validate(providerTestSchema), aiController.testProviderGateway);
router.get('/providers/metrics', aiController.getProviderMetrics);


// Memory & Knowledge Endpoints
router.post('/memory/index', validate(memoryIndexSchema), aiController.indexMemory);
router.get('/memory/search', validate(memorySearchSchema), aiController.searchMemory);
router.get('/memory/recent', validate(memorySearchSchema), aiController.getRecentMemory);
router.get('/memory/related', aiController.getRelatedMemory);
router.get('/memory/graph', aiController.getMemoryGraph);
router.get('/memory/knowledge', validate(memorySearchSchema), aiController.getKnowledge);


// Agent Orchestrator Endpoints
router.post('/agent/run', validate(agentRunSchema), aiController.runAgent);
router.post('/agent/pause', validate(agentActionSchema), aiController.pauseAgent);
router.post('/agent/resume', validate(agentActionSchema), aiController.resumeAgent);
router.post('/agent/cancel', validate(agentActionSchema), aiController.cancelAgent);
router.get('/agent/history', aiController.getAgentHistory);
router.get('/agent/checkpoints', aiController.getAgentCheckpoints);
router.get('/agent/tools', aiController.getAgentTools);
router.get('/agent/state', aiController.getAgentState);


// Conversation Engine Endpoints
router.post('/chat', validate(chatRequestSchema), aiController.chat);
router.post('/chat/stream', validate(chatRequestSchema), aiController.streamChat);
router.get('/conversations', aiController.listConversations);
router.get('/conversations/:id', aiController.getConversation);
router.delete('/conversations/:id', aiController.deleteConversation);
router.patch('/conversations/:id/archive', aiController.archiveConversation);

export default router;
