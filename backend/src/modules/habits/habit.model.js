import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  type: { type: String, enum: ['build', 'quit'], default: 'build' },
  status: { type: String, enum: ['active', 'paused', 'completed', 'archived'], default: 'active' },
  
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'custom'], default: 'daily' },
  schedule: {
    daysOfWeek: [{ type: Number, min: 0, max: 6 }], // 0=Sun, 6=Sat
    daysOfMonth: [{ type: Number, min: 1, max: 31 }],
    startDate: { type: Date },
    endDate: { type: Date }
  },
  
  goal: {
    targetCount: { type: Number, default: 1, min: 1 },
    targetUnit: { type: String, trim: true, default: 'times' }
  },
  
  tracking: {
    currentStreak: { type: Number, default: 0, min: 0 },
    longestStreak: { type: Number, default: 0, min: 0 },
    totalCompletions: { type: Number, default: 0, min: 0 }
  },
  
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  energy: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  
  color: { type: String, trim: true },
  icon: { type: String, trim: true },
  notes: { type: String, trim: true },
  tags: [{ type: String, trim: true }],
  
  archived: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  
  metadata: {
    lastCompleted: { type: Date },
    lastSkipped: { type: Date },
    completionRate: { type: Number, default: 0, min: 0, max: 100 }
  }
}, {
  timestamps: true,
});

habitSchema.index({ userId: 1, status: 1 });
habitSchema.index({ userId: 1, frequency: 1 });
habitSchema.index({ userId: 1, priority: 1 });
habitSchema.index({ deletedAt: 1 });
habitSchema.index({ 'metadata.lastCompleted': -1 });
habitSchema.index({ createdAt: -1 });

export const Habit = mongoose.model('Habit', habitSchema);

const habitCompletionSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  completedAt: { type: Date, required: true },
  value: { type: Number, default: 1 },
  notes: { type: String, trim: true }
}, {
  timestamps: true,
});

habitCompletionSchema.index({ habitId: 1, completedAt: -1 });
habitCompletionSchema.index({ userId: 1, completedAt: -1 });

export const HabitCompletion = mongoose.model('HabitCompletion', habitCompletionSchema);
