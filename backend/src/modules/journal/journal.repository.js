import { JournalEntry } from './journal.model.js';

export const journalRepository = {
  create: async (entryData) => {
    return JournalEntry.create(entryData);
  },
  
  findById: async (id, userId) => {
    return JournalEntry.findOne({ _id: id, userId, deletedAt: null });
  },
  
  findAll: async (query, pagination = { skip: 0, limit: 50 }, sort = { pinned: -1, createdAt: -1 }) => {
    return JournalEntry.find({ ...query, deletedAt: null })
      .sort(sort)
      .skip(pagination.skip)
      .limit(pagination.limit);
  },
  
  update: async (id, userId, updateData) => {
    return JournalEntry.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $set: updateData },
      { new: true, runValidators: true }
    );
  },
  
  softDelete: async (id, userId) => {
    return JournalEntry.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
  },
  
  restore: async (id, userId) => {
    return JournalEntry.findOneAndUpdate(
      { _id: id, userId, deletedAt: { $ne: null } },
      { $set: { deletedAt: null } },
      { new: true }
    );
  },
  
  exists: async (query) => {
    return JournalEntry.exists({ ...query, deletedAt: null }).then(res => !!res);
  },

  count: async (query) => {
    return JournalEntry.countDocuments({ ...query, deletedAt: null });
  },
  
  toggleFavorite: async (id, userId) => {
    const entry = await JournalEntry.findOne({ _id: id, userId, deletedAt: null });
    if (!entry) return null;
    entry.favorite = !entry.favorite;
    entry.metadata.lastEdited = new Date();
    return entry.save();
  },
  
  togglePinned: async (id, userId) => {
    const entry = await JournalEntry.findOne({ _id: id, userId, deletedAt: null });
    if (!entry) return null;
    entry.pinned = !entry.pinned;
    entry.metadata.lastEdited = new Date();
    return entry.save();
  },

  search: async (userId, searchTerm, filters, pagination) => {
    const query = { userId, deletedAt: null, ...filters };
    if (searchTerm) {
      query.$text = { $search: searchTerm };
      return JournalEntry.find(query)
        .sort({ pinned: -1, score: { $meta: 'textScore' }, createdAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit);
    } else {
      return JournalEntry.find(query)
        .sort({ pinned: -1, createdAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit);
    }
  },

  findByMood: async (userId, minScore, maxScore, pagination) => {
    return JournalEntry.find({ 
      userId, 
      deletedAt: null,
      'mood.score': { $gte: minScore, $lte: maxScore } 
    })
    .sort({ createdAt: -1 })
    .skip(pagination.skip)
    .limit(pagination.limit);
  },

  findByTag: async (userId, tag, pagination) => {
    return JournalEntry.find({ userId, deletedAt: null, tags: tag })
      .sort({ createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit);
  },

  findByDateRange: async (userId, startDate, endDate) => {
    return JournalEntry.find({
      userId,
      deletedAt: null,
      createdAt: { $gte: startDate, $lte: endDate }
    }).sort({ createdAt: -1 });
  },
  
  getStatsAggregates: async (userId) => {
    return JournalEntry.aggregate([
      { $match: { userId: userId, deletedAt: null } },
      { 
        $group: {
          _id: null,
          totalEntries: { $sum: 1 },
          totalWords: { $sum: '$metadata.wordCount' },
          avgMood: { $avg: '$mood.score' },
          avgProductivity: { $avg: '$productivity' },
          favorites: { $sum: { $cond: ['$favorite', 1, 0] } },
          pinned: { $sum: { $cond: ['$pinned', 1, 0] } }
        }
      }
    ]);
  }
};
