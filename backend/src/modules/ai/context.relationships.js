import { logger } from '#common/logger/index.js';

export const contextRelationships = {
  build: (compressedData) => {
    logger.debug({ action: 'AI_RELATIONSHIPS_GENERATED' }, 'Building context relationship graph');
    
    return {
      nodes: [
        { id: 'g1', type: 'goal' },
        { id: 't1', type: 'task' }
      ],
      edges: [
        { source: 't1', target: 'g1', relation: 'BELONGS_TO' }
      ]
    };
  }
};
