import api from './axios';
import { authApi } from './auth';
import { usersApi } from './users';
import { tasksApi } from './tasks';
import { habitsApi } from './habits';
import { goalsApi } from './goals';
import { calendarApi } from './calendar';
import { journalApi } from './journal';
import { analyticsApi } from './analytics';
import { aiApi } from './ai';

export const apiClient = {
  auth: authApi,
  users: usersApi,
  tasks: tasksApi,
  habits: habitsApi,
  goals: goalsApi,
  calendar: calendarApi,
  journal: journalApi,
  analytics: analyticsApi,
  ai: aiApi
};

export default api;
