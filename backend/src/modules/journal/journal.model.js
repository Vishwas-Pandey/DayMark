import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  title: { type: String, trim: true, default: '' },
  content: { type: String, required: true },
  excerpt: { type: String, trim: true },
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  type: { 
    type: String, 
    enum: ['daily', 'gratitude', 'reflection', 'freeform', 'meeting', 'learning', 'custom'], 
    default: 'daily' 
  },
  
  mood: {
    score: { type: Number, min: 1, max: 10 },
    label: { type: String, trim: true }
  },
  
  energy: { type: String, enum: ['low', 'medium', 'high'] },
  productivity: { type: Number, min: 1, max: 10 },
  
  emotionTags: [{ type: String, trim: true }],
  tags: [{ type: String, trim: true }],
  
  attachments: [{
    fileId: String,
    url: String,
    name: String,
    mimeType: String
  }],
  
  weather: { type: mongoose.Schema.Types.Mixed },
  location: { type: mongoose.Schema.Types.Mixed },
  
  relationships: {
    taskIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    habitIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Habit' }],
    goalIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }],
    calendarEventIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CalendarEvent' }]
  },
  
  futureReady: {
    aiSummary: { type: String },
    aiInsights: [{ type: String }],
    aiEmbeddings: [{ type: Number }]
  },
  
  metadata: {
    wordCount: { type: Number, default: 0 },
    readingTime: { type: Number, default: 0 }, // in minutes
    lastEdited: { type: Date, default: Date.now }
  },
  
  favorite: { type: Boolean, default: false },
  pinned: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null }
}, {
  timestamps: true,
});

// Calculate metrics before save
journalSchema.pre('save', function() {
  if (this.isModified('content') && this.content) {
    const text = this.content.replace(/<[^>]*>?/gm, ''); // naive strip HTML
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    this.metadata.wordCount = words.length;
    this.metadata.readingTime = Math.ceil(words.length / 200); // 200 wpm

    if (!this.excerpt) {
      this.excerpt = text.substring(0, 150) + (text.length > 150 ? '...' : '');
    }
  }
});

journalSchema.index({ userId: 1, createdAt: -1 });
journalSchema.index({ userId: 1, type: 1 });
journalSchema.index({ userId: 1, favorite: 1 });
journalSchema.index({ userId: 1, pinned: 1 });
journalSchema.index({ userId: 1, tags: 1 });
journalSchema.index({ deletedAt: 1 });
journalSchema.index({ title: 'text', content: 'text', tags: 'text' });

export const JournalEntry = mongoose.model('JournalEntry', journalSchema);
