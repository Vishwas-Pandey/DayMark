import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  displayName: { type: String, trim: true },
  password: { type: String, select: false },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  avatar: { type: String, default: null },
  timezone: { type: String, default: 'UTC' },
  locale: { type: String, default: 'en-US' },
  onboardingCompleted: { type: Boolean, default: false },
  onboardingStep: { type: Number, default: 0 },
  
  preferences: {
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
    weekStartsOn: { type: Number, enum: [0, 1, 6], default: 1 },
    reducedMotion: { type: Boolean, default: false },
    defaultView: { type: String, default: 'dashboard' },
    reminderDefaults: { type: Object, default: {} }
  },
  
  settings: {
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      digest: { type: Boolean, default: false }
    },
    privacy: {
      shareActivity: { type: Boolean, default: false },
      publicProfile: { type: Boolean, default: false }
    },
    productivity: {
      strictMode: { type: Boolean, default: false }
    },
    ai: {
      enabled: { type: Boolean, default: true },
      dataSharing: { type: Boolean, default: false }
    }
  },
  
  metadata: {
    lastSeen: { type: Date },
    lastLogin: { type: Date },
    lastActive: { type: Date },
    accountCreatedFrom: { type: String, default: 'web' }
  },
  
  deletedAt: { type: Date, default: null }
}, {
  timestamps: true,
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ deletedAt: 1 });
userSchema.index({ createdAt: -1 });

export const User = mongoose.model('User', userSchema);
