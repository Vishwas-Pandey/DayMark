import { userRepository } from './user.repository.js';
import { NotFoundError, AppError } from '#common/errors/AppError.js';
import { logger } from '#common/logger/index.js';

export const userService = {
  createUser: async (data) => {
    const exists = await userRepository.findByEmail(data.email);
    if (exists) {
      throw new AppError('Email already in use', 409);
    }
    const user = await userRepository.create(data);
    logger.info({ userId: user._id, action: 'USER_CREATED' }, 'User created successfully');
    return user;
  },

  getUserById: async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  },
  
  getUsers: async (filters, pagination) => {
    const users = await userRepository.findAll(filters, pagination);
    return users;
  },

  updateUser: async (id, data) => {
    if (data.email) {
      const existing = await userRepository.findByEmail(data.email);
      if (existing && existing._id.toString() !== id) {
        throw new AppError('Email already in use', 409);
      }
    }

    const updatedUser = await userRepository.update(id, data);
    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }
    logger.info({ userId: id, action: 'USER_UPDATED' }, 'User updated successfully');
    return updatedUser;
  },

  softDeleteUser: async (id) => {
    const deletedUser = await userRepository.softDelete(id);
    if (!deletedUser) {
      throw new NotFoundError('User not found or already deleted');
    }
    logger.info({ userId: id, action: 'USER_DELETED' }, 'User soft deleted');
    return true;
  },

  restoreUser: async (id) => {
    const restoredUser = await userRepository.restore(id);
    if (!restoredUser) {
      throw new NotFoundError('User not found or not deleted');
    }
    logger.info({ userId: id, action: 'USER_RESTORED' }, 'User restored');
    return restoredUser;
  }
};
