import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  type: { type: String, enum: ['outcome', 'milestone', 'project'], default: 'outcome' },
  status: { type: String, enum: ['active', 'paused', 'completed', 'archived'], default: 'active' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  
  category: { 
    type: String, 
    enum: ['health', 'career', 'education', 'finance', 'personal', 'relationships', 'custom'], 
    default: 'personal' 
  },
  
  progress: {
    targetValue: { type: Number, default: 100, min: 0 },
    currentValue: { type: Number, default: 0, min: 0 },
    unit: { type: String, trim: true, default: '%' },
    progressPercentage: { type: Number, default: 0, min: 0, max: 100 }
  },
  
  timeline: {
    startDate: { type: Date, default: Date.now },
    targetDate: { type: Date },
    completedAt: { type: Date }
  },
  
  color: { type: String, trim: true },
  icon: { type: String, trim: true },
  tags: [{ type: String, trim: true }],
  notes: { type: String, trim: true },
  
  taskIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  habitIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Habit' }],
  
  futureReady: {
    aiInsights: [{ type: String }],
    milestones: [{ title: String, completed: Boolean }]
  },
  
  metadata: {
    lastUpdated: { type: Date, default: Date.now },
    completionRate: { type: Number, default: 0 }
  },
  
  archived: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null }
}, {
  timestamps: true,
});

// Calculate progress percentage before save
goalSchema.pre('save', function() {
  if (this.isModified('progress.targetValue') || this.isModified('progress.currentValue')) {
    if (this.progress.targetValue > 0) {
      const percentage = (this.progress.currentValue / this.progress.targetValue) * 100;
      this.progress.progressPercentage = Math.min(100, Math.max(0, Math.round(percentage)));
    } else {
      this.progress.progressPercentage = 0;
    }
  }
});

goalSchema.index({ userId: 1, status: 1 });
goalSchema.index({ userId: 1, priority: 1 });
goalSchema.index({ userId: 1, category: 1 });
goalSchema.index({ userId: 1, 'timeline.targetDate': 1 });
goalSchema.index({ deletedAt: 1 });
goalSchema.index({ createdAt: -1 });

export const Goal = mongoose.model('Goal', goalSchema);
