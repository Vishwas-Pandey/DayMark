import mongoose from 'mongoose';

const analyticsSnapshotSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  
  daily: { type: Boolean, default: false },
  weekly: { type: Boolean, default: false },
  monthly: { type: Boolean, default: false },
  yearly: { type: Boolean, default: false },
  
  productivityScore: { type: Number, default: 0 },
  focusScore: { type: Number, default: 0 },
  consistencyScore: { type: Number, default: 0 },
  completionScore: { type: Number, default: 0 },
  wellbeingScore: { type: Number, default: 0 },
  
  taskMetrics: { type: mongoose.Schema.Types.Mixed, default: {} },
  habitMetrics: { type: mongoose.Schema.Types.Mixed, default: {} },
  goalMetrics: { type: mongoose.Schema.Types.Mixed, default: {} },
  journalMetrics: { type: mongoose.Schema.Types.Mixed, default: {} },
  calendarMetrics: { type: mongoose.Schema.Types.Mixed, default: {} },
  
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
}, {
  timestamps: true,
});

analyticsSnapshotSchema.index({ userId: 1, date: -1 });
analyticsSnapshotSchema.index({ userId: 1, daily: 1, date: -1 });
analyticsSnapshotSchema.index({ userId: 1, weekly: 1, date: -1 });
analyticsSnapshotSchema.index({ userId: 1, monthly: 1, date: -1 });

export const AnalyticsSnapshot = mongoose.model('AnalyticsSnapshot', analyticsSnapshotSchema);
