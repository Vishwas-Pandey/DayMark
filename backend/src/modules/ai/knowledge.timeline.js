import { logger } from '#common/logger/index.js';

export const knowledgeTimeline = {
  construct: (events) => {
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
};
