import { Session } from './auth.model.js';

export const authRepository = {
  createSession: async (sessionData) => {
    return Session.create(sessionData);
  },
  findSessionByToken: async (refreshToken) => {
    return Session.findOne({ refreshToken, revokedAt: null });
  },
  revokeSession: async (id) => {
    return Session.findByIdAndUpdate(id, { revokedAt: new Date() }, { new: true });
  },
  revokeAllUserSessions: async (userId) => {
    return Session.updateMany({ user: userId, revokedAt: null }, { revokedAt: new Date() });
  }
};
