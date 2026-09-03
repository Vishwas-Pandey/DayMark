import { CalendarEvent } from './calendar.model.js';

export const calendarRepository = {
  create: async (eventData) => {
    return CalendarEvent.create(eventData);
  },
  
  findById: async (id, userId) => {
    return CalendarEvent.findOne({ _id: id, userId, deletedAt: null });
  },
  
  findAll: async (query, pagination = { skip: 0, limit: 50 }, sort = { 'time.start': 1 }) => {
    return CalendarEvent.find({ ...query, deletedAt: null })
      .sort(sort)
      .skip(pagination.skip)
      .limit(pagination.limit);
  },
  
  update: async (id, userId, updateData) => {
    return CalendarEvent.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $set: updateData },
      { new: true, runValidators: true }
    );
  },
  
  softDelete: async (id, userId) => {
    return CalendarEvent.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $set: { deletedAt: new Date(), status: 'cancelled' } },
      { new: true }
    );
  },
  
  restore: async (id, userId) => {
    return CalendarEvent.findOneAndUpdate(
      { _id: id, userId, deletedAt: { $ne: null } },
      { $set: { deletedAt: null, status: 'scheduled' } },
      { new: true }
    );
  },
  
  exists: async (query) => {
    return CalendarEvent.exists({ ...query, deletedAt: null }).then(res => !!res);
  },

  count: async (query) => {
    return CalendarEvent.countDocuments({ ...query, deletedAt: null });
  },

  findBetweenDates: async (userId, start, end) => {
    return CalendarEvent.find({
      userId,
      deletedAt: null,
      $or: [
        { 'time.start': { $gte: start, $lte: end } },
        { 'time.end': { $gte: start, $lte: end } },
        { 'time.start': { $lte: start }, 'time.end': { $gte: end } }
      ]
    }).sort({ 'time.start': 1 });
  },

  findConflicts: async (userId, start, end, excludeEventId = null) => {
    const query = {
      userId,
      deletedAt: null,
      status: { $nin: ['cancelled'] },
      'time.allDay': false, // typically don't conflict with all day events rigidly
      $and: [
        { 'time.start': { $lt: end } },
        { 'time.end': { $gt: start } }
      ]
    };
    if (excludeEventId) {
      query._id = { $ne: excludeEventId };
    }
    return CalendarEvent.find(query).sort({ 'time.start': 1 });
  }
};
