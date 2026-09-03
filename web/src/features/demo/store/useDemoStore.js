import { create } from 'zustand';

export const useDemoStore = create((set) => ({
  score: 84,
  tasks: [
    { id: 1, title: 'Draft Q3 Roadmap', completed: false, priority: 'high' },
    { id: 2, title: 'Review PRs', completed: false, priority: 'medium' },
    { id: 3, title: 'Update Design System', completed: true, priority: 'low' }
  ],
  habits: [
    { id: 1, title: 'Read 20 pages', progress: 40, streak: 12 },
    { id: 2, title: 'Workout', progress: 0, streak: 3 },
    { id: 3, title: 'Meditation', progress: 100, streak: 45 }
  ],
  journalEntry: '',
  isTransitioning: true,
  showWelcome: false,
  activeTab: 'Dashboard',
  
  toggleTask: (id) => set((state) => {
    const tasks = state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    const task = state.tasks.find(t => t.id === id);
    const scoreDelta = !task.completed ? 10 : -10;
    return { tasks, score: Math.min(100, Math.max(0, state.score + scoreDelta)) };
  }),
  fillHabit: (id) => set((state) => {
    const habits = state.habits.map(h => h.id === id ? { ...h, progress: 100 } : h);
    return { habits, score: Math.min(100, state.score + 5) };
  }),
  updateJournal: (text) => set({ journalEntry: text }),
  endTransition: () => set({ isTransitioning: false, showWelcome: true }),
  closeWelcome: () => set({ showWelcome: false }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  resetDemo: () => set({
    score: 84,
    tasks: [
      { id: 1, title: 'Draft Q3 Roadmap', completed: false, priority: 'high' },
      { id: 2, title: 'Review PRs', completed: false, priority: 'medium' },
      { id: 3, title: 'Update Design System', completed: true, priority: 'low' }
    ],
    habits: [
      { id: 1, title: 'Read 20 pages', progress: 40, streak: 12 },
      { id: 2, title: 'Workout', progress: 0, streak: 3 },
      { id: 3, title: 'Meditation', progress: 100, streak: 45 }
    ],
    journalEntry: '',
    isTransitioning: true,
    showWelcome: false,
    activeTab: 'Dashboard'
  })
}));