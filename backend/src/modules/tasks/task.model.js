import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  status: { type: String, enum: ['todo', 'in_progress', 'completed', 'archived'], default: 'todo' },
  archived: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  energy: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  
  estimatedMinutes: { type: Number, min: 0 },
  actualMinutes: { type: Number, min: 0, default: 0 },
  
  startDate: { type: Date },
  dueDate: { type: Date },
  completedAt: { type: Date },
  reminderAt: { type: Date },
  
  labels: [{ type: String, trim: true }],
  tags: [{ type: String, trim: true }],
  notes: { type: String, trim: true },
  
  parentTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
  subTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  
  position: { type: Number, default: 0 },
  
  repeat: {
    enabled: { type: Boolean, default: false },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'] },
    interval: { type: Number, min: 1, default: 1 },
    endsAt: { type: Date }
  },
  
  attachments: [{
    fileId: String,
    url: String,
    name: String,
    size: Number,
    mimeType: String,
    uploadedAt: Date
  }],
  
  metadata: {
    lastViewed: { type: Date },
    lastEdited: { type: Date }
  }
}, {
  timestamps: true,
});

// Indexes
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, dueDate: 1 });
taskSchema.index({ userId: 1, priority: 1 });
taskSchema.index({ deletedAt: 1 });
taskSchema.index({ completedAt: -1 });
taskSchema.index({ createdAt: -1 });
taskSchema.index({ title: 'text', description: 'text' });

export const Task = mongoose.model('Task', taskSchema);
