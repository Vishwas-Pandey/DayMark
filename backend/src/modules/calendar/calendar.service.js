import { calendarRepository } from './calendar.repository.js';
import { AppError, NotFoundError } from '#common/errors/AppError.js';
import { logger } from '#common/logger/index.js';

const getStartOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getEndOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const getStartOfWeek = (date = new Date()) => {
  const d = getStartOfDay(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  return new Date(d.setDate(diff));
};

const getEndOfWeek = (date = new Date()) => {
  const start = getStartOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

const getStartOfMonth = (date = new Date()) => {
  const d = getStartOfDay(date);
  d.setDate(1);
  return d;
};

const getEndOfMonth = (date = new Date()) => {
  const d = getStartOfMonth(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const calendarService = {
  createEvent: async (userId, data) => {
    if (new Date(data.time.start) >= new Date(data.time.end)) {
      throw new AppError('End time must be after start time', 400);
    }
    
    const event = await calendarRepository.create({
      ...data,
      userId,
      createdBy: userId,
      updatedBy: userId
    });
    
    logger.info({ userId, eventId: event._id, action: 'EVENT_CREATED' }, 'Event created');
    return event;
  },

  getEventById: async (id, userId) => {
    const event = await calendarRepository.findById(id, userId);
    if (!event) throw new NotFoundError('Event not found');
    return event;
  },
  
  getEvents: async (userId, filters, pagination) => {
    const query = { userId };
    if (filters.status) query.status = filters.status;
    if (filters.type) query.type = filters.type;
    if (filters.priority) query.priority = filters.priority;
    
    const events = await calendarRepository.findAll(query, pagination);
    const total = await calendarRepository.count(query);
    return { events, total };
  },

  updateEvent: async (id, userId, data) => {
    const event = await calendarRepository.findById(id, userId);
    if (!event) throw new NotFoundError('Event not found');
    
    if (data.time) {
      const start = data.time.start || event.time.start;
      const end = data.time.end || event.time.end;
      if (new Date(start) >= new Date(end)) {
        throw new AppError('End time must be after start time', 400);
      }
    }
    
    data.updatedBy = userId;
    const updated = await calendarRepository.update(id, userId, data);
    logger.info({ userId, eventId: id, action: 'EVENT_UPDATED' }, 'Event updated');
    return updated;
  },

  softDeleteEvent: async (id, userId) => {
    const event = await calendarRepository.softDelete(id, userId);
    if (!event) throw new NotFoundError('Event not found or already deleted');
    logger.info({ userId, eventId: id, action: 'EVENT_DELETED' }, 'Event deleted');
    return true;
  },

  restoreEvent: async (id, userId) => {
    const event = await calendarRepository.restore(id, userId);
    if (!event) throw new NotFoundError('Event not found in trash');
    logger.info({ userId, eventId: id, action: 'EVENT_RESTORED' }, 'Event restored');
    return event;
  },
  
  completeEvent: async (id, userId) => {
    const event = await calendarRepository.findById(id, userId);
    if (!event) throw new NotFoundError('Event not found');
    if (event.status === 'completed') throw new AppError('Event already completed', 400);
    
    const updated = await calendarRepository.update(id, userId, { status: 'completed', updatedBy: userId });
    logger.info({ userId, eventId: id, action: 'EVENT_COMPLETED' }, 'Event completed');
    return updated;
  },
  
  cancelEvent: async (id, userId) => {
    const event = await calendarRepository.findById(id, userId);
    if (!event) throw new NotFoundError('Event not found');
    if (event.status === 'cancelled') throw new AppError('Event already cancelled', 400);
    
    const updated = await calendarRepository.update(id, userId, { status: 'cancelled', updatedBy: userId });
    logger.info({ userId, eventId: id, action: 'EVENT_CANCELLED' }, 'Event cancelled');
    return updated;
  },
  
  moveEvent: async (id, userId, newStart, newEnd) => {
    const event = await calendarRepository.findById(id, userId);
    if (!event) throw new NotFoundError('Event not found');
    if (new Date(newStart) >= new Date(newEnd)) throw new AppError('End time must be after start time', 400);
    
    const updated = await calendarRepository.update(id, userId, { 
      'time.start': new Date(newStart),
      'time.end': new Date(newEnd),
      updatedBy: userId 
    });
    
    logger.info({ userId, eventId: id, action: 'EVENT_MOVED' }, 'Event moved');
    return updated;
  },

  resizeEvent: async (id, userId, newStart, newEnd) => {
    // Conceptually identical to moveEvent in the backend, but exposes explicit semantic intent
    const event = await calendarRepository.findById(id, userId);
    if (!event) throw new NotFoundError('Event not found');
    if (new Date(newStart) >= new Date(newEnd)) throw new AppError('End time must be after start time', 400);
    
    const updated = await calendarRepository.update(id, userId, { 
      'time.start': new Date(newStart),
      'time.end': new Date(newEnd),
      updatedBy: userId 
    });
    
    logger.info({ userId, eventId: id, action: 'EVENT_RESIZED' }, 'Event resized');
    return updated;
  },

  detectConflicts: async (userId, start, end, excludeEventId) => {
    const conflicts = await calendarRepository.findConflicts(userId, new Date(start), new Date(end), excludeEventId);
    if (conflicts.length > 0) {
      logger.info({ userId, conflicts: conflicts.length, action: 'CONFLICT_DETECTED' }, 'Scheduling conflict detected');
    }
    return conflicts;
  },
  
  getToday: async (userId) => {
    return calendarRepository.findBetweenDates(userId, getStartOfDay(), getEndOfDay());
  },
  
  getWeek: async (userId, date = new Date()) => {
    return calendarRepository.findBetweenDates(userId, getStartOfWeek(date), getEndOfWeek(date));
  },
  
  getMonth: async (userId, date = new Date()) => {
    return calendarRepository.findBetweenDates(userId, getStartOfMonth(date), getEndOfMonth(date));
  },
  
  getAgenda: async (userId, startDate, endDate) => {
    return calendarRepository.findBetweenDates(userId, new Date(startDate), new Date(endDate));
  },
  
  getUpcoming: async (userId, limit = 10) => {
    return calendarRepository.findAll(
      { userId, 'time.start': { $gte: new Date() }, status: { $in: ['scheduled', 'in_progress'] } },
      { skip: 0, limit }
    );
  },
  
  getStats: async (userId, date = new Date()) => {
    const todayEvents = await calendarRepository.findBetweenDates(userId, getStartOfDay(date), getEndOfDay(date));
    
    const completed = todayEvents.filter(e => e.status === 'completed');
    const overdue = todayEvents.filter(e => e.status === 'scheduled' && new Date(e.time.end) < new Date());
    const upcoming = todayEvents.filter(e => e.status === 'scheduled' && new Date(e.time.start) > new Date());
    
    let focusMinutes = 0;
    let meetingMinutes = 0;
    
    todayEvents.forEach(e => {
      const dur = e.time.durationMinutes || 0;
      if (e.type === 'focus') focusMinutes += dur;
      if (e.type === 'meeting') meetingMinutes += dur;
    });
    
    const completionRate = todayEvents.length > 0 ? Math.round((completed.length / todayEvents.length) * 100) : 0;
    const workingMinutes = 8 * 60; // assumption: 8 hr day
    const busyMinutes = todayEvents.reduce((acc, e) => acc + (e.time.durationMinutes || 0), 0);
    const freeTime = Math.max(0, workingMinutes - busyMinutes);

    return {
      totalToday: todayEvents.length,
      completedToday: completed.length,
      upcomingCount: upcoming.length,
      overdueCount: overdue.length,
      focusMinutes,
      meetingMinutes,
      freeTimeMinutes: freeTime,
      completionRate
    };
  }
};
