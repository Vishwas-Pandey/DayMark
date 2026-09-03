import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  refreshToken: { type: String, required: true },
  deviceId: { type: String },
  ip: { type: String },
  userAgent: { type: String },
  expiresAt: { type: Date, required: true },
  revokedAt: { type: Date, default: null }
}, { timestamps: true });

sessionSchema.index({ user: 1 });
sessionSchema.index({ refreshToken: 1 });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-cleanup

export const Session = mongoose.model('Session', sessionSchema);
