import mongoose from 'mongoose';

// Placeholder for future Memory schema
const aiMemorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  type: { 
    type: String, 
    enum: ['recent', 'working', 'session', 'long_term'], 
    default: 'recent' 
  },
  
  contextSnapshot: { type: mongoose.Schema.Types.Mixed, default: {} },
  
  version: { type: Number, default: 1 },
  ttl: { type: Date }, // Time-to-live for ephemeral memories
  
  deletedAt: { type: Date, default: null }
}, {
  timestamps: true,
});

aiMemorySchema.index({ userId: 1, type: 1 });
aiMemorySchema.index({ ttl: 1 }, { expireAfterSeconds: 0 }); // MongoDB TTL index

export const AIMemory = mongoose.model('AIMemory', aiMemorySchema);
