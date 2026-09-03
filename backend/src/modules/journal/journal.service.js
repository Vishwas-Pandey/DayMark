import { journalRepository } from './journal.repository.js';
import { AppError, NotFoundError } from '#common/errors/AppError.js';
import { logger } from '#common/logger/index.js';

export const journalService = {
  createEntry: async (userId, data) => {
    const entry = await journalRepository.create({
      ...data,
      userId,
      createdBy: userId,
      updatedBy: userId
    });
    
    logger.info({ userId, entryId: entry._id, action: 'JOURNAL_CREATED' }, 'Journal entry created');
    return entry;
  },

  getEntryById: async (id, userId) => {
    const entry = await journalRepository.findById(id, userId);
    if (!entry) throw new NotFoundError('Journal entry not found');
    return entry;
  },
  
  getEntries: async (userId, filters, pagination) => {
    const query = { userId };
    
    if (filters.type) query.type = filters.type;
    if (filters.favorite === 'true') query.favorite = true;
    if (filters.pinned === 'true') query.pinned = true;
    if (filters.tags) query.tags = { $in: filters.tags.split(',') };
    
    const entries = await journalRepository.findAll(query, pagination);
    const total = await journalRepository.count(query);
    
    return { entries, total };
  },

  getRecent: async (userId, limit = 10) => {
    const entries = await journalRepository.findAll({ userId }, { skip: 0, limit });
    return entries;
  },

  searchEntries: async (userId, searchTerm, queryFilters, pagination) => {
    const filters = {};
    if (queryFilters.type) filters.type = queryFilters.type;
    if (queryFilters.favorite === 'true') filters.favorite = true;
    if (queryFilters.pinned === 'true') filters.pinned = true;
    
    if (queryFilters.startDate && queryFilters.endDate) {
      filters.createdAt = {
        $gte: new Date(queryFilters.startDate),
        $lte: new Date(queryFilters.endDate)
      };
    }
    
    const entries = await journalRepository.search(userId, searchTerm, filters, pagination);
    
    // Quick count approximation for text searches
    const total = searchTerm ? entries.length : await journalRepository.count({ userId, ...filters });
    
    logger.info({ userId, action: 'JOURNAL_SEARCHED' }, 'Journal search executed');
    return { entries, total };
  },

  updateEntry: async (id, userId, data) => {
    const entry = await journalRepository.findById(id, userId);
    if (!entry) throw new NotFoundError('Journal entry not found');
    
    data.updatedBy = userId;
    data['metadata.lastEdited'] = new Date();
    
    // Manual trigger for pre-save hooks not running in findOneAndUpdate.
    // Instead of raw update, we use find + save to ensure hooks run (wordCount, excerpt)
    Object.assign(entry, data);
    const updated = await entry.save();
    
    logger.info({ userId, entryId: id, action: 'JOURNAL_UPDATED' }, 'Journal entry updated');
    return updated;
  },

  softDeleteEntry: async (id, userId) => {
    const entry = await journalRepository.softDelete(id, userId);
    if (!entry) throw new NotFoundError('Journal entry not found or already deleted');
    logger.info({ userId, entryId: id, action: 'JOURNAL_DELETED' }, 'Journal entry deleted');
    return true;
  },

  restoreEntry: async (id, userId) => {
    const entry = await journalRepository.restore(id, userId);
    if (!entry) throw new NotFoundError('Journal entry not found in trash');
    logger.info({ userId, entryId: id, action: 'JOURNAL_RESTORED' }, 'Journal entry restored');
    return entry;
  },
  
  toggleFavorite: async (id, userId) => {
    const entry = await journalRepository.toggleFavorite(id, userId);
    if (!entry) throw new NotFoundError('Journal entry not found');
    logger.info({ userId, entryId: id, action: entry.favorite ? 'JOURNAL_FAVORITED' : 'JOURNAL_UNFAVORITED' }, 'Journal favorite toggled');
    return entry;
  },
  
  togglePin: async (id, userId) => {
    const entry = await journalRepository.togglePinned(id, userId);
    if (!entry) throw new NotFoundError('Journal entry not found');
    logger.info({ userId, entryId: id, action: entry.pinned ? 'JOURNAL_PINNED' : 'JOURNAL_UNPINNED' }, 'Journal pin toggled');
    return entry;
  },

  getStats: async (userId) => {
    const statsResult = await journalRepository.getStatsAggregates(userId);
    const aggs = statsResult[0] || { 
      totalEntries: 0, totalWords: 0, avgMood: 0, avgProductivity: 0, favorites: 0, pinned: 0 
    };
    
    // Mock streak logic (Would properly query distinct dates in reality)
    const writingStreak = aggs.totalEntries > 0 ? 1 : 0; 
    
    return {
      totalEntries: aggs.totalEntries,
      writingStreak,
      wordsWritten: aggs.totalWords,
      averageMood: aggs.avgMood ? Number(aggs.avgMood.toFixed(1)) : 0,
      averageProductivity: aggs.avgProductivity ? Number(aggs.avgProductivity.toFixed(1)) : 0,
      favoriteCount: aggs.favorites,
      pinnedCount: aggs.pinned
    };
  }
};
