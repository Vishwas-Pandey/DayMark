import { contextCollector } from './context.collector.js';
import { contextRanker } from './context.ranker.js';
import { contextCompressor } from './context.compressor.js';
import { contextRelationships } from './context.relationships.js';
import { contextTimeline } from './context.timeline.js';
import { contextSelector } from './context.selector.js';
import { logger } from '#common/logger/index.js';

export const contextBuilder = {
  buildContext: async (userId, mode = 'FULL_CONTEXT', config = {}) => {
    logger.info({ userId, mode, action: 'AI_CONTEXT_BUILT' }, 'Building AI context');
    
    // Stage 1: Collect
    const rawData = await contextCollector.collect(userId);
    
    // Stage 2 & 3: Rank
    const rankedData = contextRanker.rank(rawData);
    
    // Stage 4: Compress
    const { data: compressedData, stats: compressionStats } = contextCompressor.compress(rankedData, config.compressionLevel);
    
    // Stage 5: Relationships
    const relationships = contextRelationships.build(compressedData);
    
    // Stage 6: Timeline
    const timeline = contextTimeline.build(compressedData);
    
    // Stage 7: Final Package Assembly
    const fullContext = {
      user: compressedData.user,
      timestamp: new Date(),
      tasks: compressedData.tasks,
      habits: compressedData.habits,
      goals: compressedData.goals,
      calendar: compressedData.calendar,
      journal: compressedData.journal,
      analytics: compressedData.analytics,
      memory: compressedData.memory,
      relationships,
      timeline,
      compressionStats
    };
    
    // Stage 8: Select specific mode subset
    return contextSelector.select(fullContext, mode);
  },

  buildTimeline: async (userId) => {
    const rawData = await contextCollector.collect(userId);
    const rankedData = contextRanker.rank(rawData);
    const { data } = contextCompressor.compress(rankedData);
    return contextTimeline.build(data);
  },

  buildRelationships: async (userId) => {
    const rawData = await contextCollector.collect(userId);
    return contextRelationships.build(rawData);
  }
};
