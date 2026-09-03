import React, { useState } from 'react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { useHabits } from '../hooks/useHabits';
import { HabitHeader } from '../features/habits/components/HabitHeader';
import { HabitFilterBar } from '../features/habits/components/HabitFilterBar';
import { HabitList } from '../features/habits/components/HabitList';
import { HabitDetailDrawer } from '../features/habits/components/HabitDetailDrawer';
import Modal from '../components/common/Modal';
import TaskForm from '../components/TaskForm';

export const Habits = () => {
  const { data: habits, isLoading, error, toggleHabit, deleteHabit, refetch } = useHabits();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const isCompletedToday = (habit) =>
    habit.lastCompleted &&
    new Date(habit.lastCompleted).toDateString() === new Date().toDateString();

  const filteredHabits = habits?.filter(habit => {
    if (searchQuery && !habit.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    if (filter === 'completed') return isCompletedToday(habit);
    if (filter === 'incomplete') return !isCompletedToday(habit);
    if (filter === 'build') return habit.type === 'build';
    if (filter === 'quit') return habit.type === 'quit';
    if (filter === 'daily') return habit.frequency === 'daily';
    if (filter === 'paused') return habit.status === 'paused';
    
    return habit.status !== 'archived'; 
  }) || [];

  const handleToggle = (habit) => {
    toggleHabit.mutate(habit.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this habit and all its history?")) {
      deleteHabit.mutate(id);
      setSelectedHabit(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 min-h-full">
      <ErrorBoundary>
        <HabitHeader 
          habits={habits} 
          onOpenCreate={() => setIsCreateOpen(true)} 
        />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <HabitFilterBar 
          currentFilter={filter} 
          onFilterChange={setFilter} 
          onSearch={setSearchQuery} 
        />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <HabitList 
          habits={filteredHabits} 
          isLoading={isLoading} 
          error={error} 
          onToggle={handleToggle}
          onClickHabit={setSelectedHabit}
        />
      </ErrorBoundary>

      <HabitDetailDrawer 
        habit={selectedHabit} 
        isOpen={!!selectedHabit} 
        onClose={() => setSelectedHabit(null)}
        onDelete={handleDelete}
      />

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Habit">
        <TaskForm onSuccess={() => { setIsCreateOpen(false); refetch(); }} onClose={() => setIsCreateOpen(false)} defaultType="habit" />
      </Modal>
    </div>
  );
};

export default Habits;
