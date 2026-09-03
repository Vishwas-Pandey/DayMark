import { logger } from '#common/logger/index.js';
import { aiContext } from './ai.context.js';
import { insightAnalyzer } from './insight.analyzer.js';
import { insightDetector } from './insight.detector.js';
import { insightRules } from './insight.rules.js';
import { insightRecommendations } from './insight.recommendations.js';

export const insightEngine = {
  generateInsights: async (userId, filters = {}) => {
    logger.info({ userId, action: 'AI_INSIGHT_GENERATED' }, 'Executing AI Insight Pipeline');
    
    // 1. Collect Context
    const context = await aiContext.buildContext(userId, 'FULL_CONTEXT');
    
    // 2. Analyze
    const analysis = insightAnalyzer.analyze(context);
    
    // 3. Detect Patterns
    const patterns = insightDetector.detectPatterns(analysis);
    
    // 4. Evaluate Rules
    const triggers = insightRules.evaluate(patterns);
    
    // 5. Build Recommendations (and Explanations)
    const recommendations = insightRecommendations.build(triggers, analysis);
    
    const warnings = recommendations.filter(r => r.category === 'Productivity' || r.category === 'Focus');
    const opportunities = recommendations.filter(r => r.category === 'Wellbeing');
    
    return {
      userId,
      date: new Date(),
      summary: 'Insight generation complete.',
      recommendations,
      warnings,
      positiveSignals: ['Productivity trend is positive'],
      risks: patterns,
      opportunities,
      scores: { overallInsightHealth: 80 },
      metadata: { processedItems: triggers.length }
    };
  }
};
