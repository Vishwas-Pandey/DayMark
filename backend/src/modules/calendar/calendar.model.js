import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  type: { 
    type: String, 
    enum: ['task', 'habit', 'meeting', 'focus', 'reminder', 'event', 'break', 'custom'], 
    default: 'event' 
  },
  
  status: { 
    type: String, 
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled'], 
    default: 'scheduled' 
  },
  
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  
  time: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    timezone: { type: String, default: 'UTC' },
    allDay: { type: Boolean, default: false },
    durationMinutes: { type: Number, min: 0 }
  },
  
  location: {
    location: { type: String, trim: true },
    meetingUrl: { type: String, trim: true }
  },
  
  relationships: {
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit' },
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }
  },
  
  visual: {
    color: { type: String, trim: true },
    icon: { type: String, trim: true }
  },
  
  metadata: {
    notes: { type: String, trim: true },
    tags: [{ type: String, trim: true }]
  },
  
  futureReady: {
    recurrence: { type: mongoose.Schema.Types.Mixed },
    participants: [{ type: String }],
    aiSuggestions: { type: mongoose.Schema.Types.Mixed }
  },
  
  deletedAt: { type: Date, default: null }
}, {
  timestamps: true,
});

// Calculate durationMinutes before save if not explicitly provided
eventSchema.pre('save', function() {
  if (this.isModified('time.start') || this.isModified('time.end')) {
    if (this.time.start && this.time.end) {
      const diffMs = this.time.end.getTime() - this.time.start.getTime();
      this.time.durationMinutes = Math.max(0, Math.floor(diffMs / 60000));
    }
  }
});

eventSchema.index({ userId: 1, 'time.start': 1, 'time.end': 1 });
eventSchema.index({ userId: 1, type: 1 });
eventSchema.index({ userId: 1, status: 1 });
eventSchema.index({ deletedAt: 1 });

export const CalendarEvent = mongoose.model('CalendarEvent', eventSchema);
