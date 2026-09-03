import { AIMemory } from './ai.model.js';

export const aiRepository = {
  saveMemory: async (memoryData) => {
    return AIMemory.create(memoryData);
  },
  
  loadMemory: async (userId, type) => {
    return AIMemory.find({ userId, type, deletedAt: null }).sort({ createdAt: -1 }).limit(10);
  },
  
  deleteMemory: async (id, userId) => {
    return AIMemory.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
  },
  
  saveSnapshot: async (userId, snapshot) => {
    // Placeholder
    return { userId, snapshot, saved: true };
  },
  
  loadSnapshot: async (userId) => {
    // Placeholder
    return { userId, snapshot: {}, loaded: true };
  }
};
