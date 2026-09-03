import { User } from './user.model.js';

export const userRepository = {
  create: async (userData) => {
    return User.create(userData);
  },
  
  findById: async (id, includeDeleted = false) => {
    const query = { _id: id };
    if (!includeDeleted) query.deletedAt = null;
    return User.findOne(query);
  },
  
  findByEmail: async (email, includeDeleted = false) => {
    const query = { email: email.toLowerCase() };
    if (!includeDeleted) query.deletedAt = null;
    return User.findOne(query);
  },

  findByEmailWithPassword: async (email, includeDeleted = false) => {
    const query = { email: email.toLowerCase() };
    if (!includeDeleted) query.deletedAt = null;
    return User.findOne(query).select('+password');
  },
  
  findAll: async (filters = {}, pagination = { skip: 0, limit: 20 }) => {
    const query = { deletedAt: null, ...filters };
    return User.find(query).skip(pagination.skip).limit(pagination.limit).sort({ createdAt: -1 });
  },

  update: async (id, updateData) => {
    return User.findOneAndUpdate({ _id: id, deletedAt: null }, { $set: updateData }, { new: true });
  },
  
  softDelete: async (id) => {
    return User.findOneAndUpdate({ _id: id, deletedAt: null }, { $set: { deletedAt: new Date() } }, { new: true });
  },
  
  restore: async (id) => {
    return User.findOneAndUpdate({ _id: id, deletedAt: { $ne: null } }, { $set: { deletedAt: null } }, { new: true });
  },
  
  exists: async (query) => {
    return User.exists({ ...query, deletedAt: null }).then(res => !!res);
  }
};
