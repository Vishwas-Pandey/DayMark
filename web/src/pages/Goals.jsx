import React, { useState } from 'react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { useGoals } from '../hooks/useGoals';
import { GoalHeader } from '../features/goals/components/GoalHeader';
import { GoalFilterBar } from '../features/goals/components/GoalFilterBar';
import { GoalGrid } from '../features/goals/components/GoalGrid';
import { GoalDetailDrawer } from '../features/goals/components/GoalDetailDrawer';
import { computeGoalHealth } from '../features/goals/utils/goalHealth';
import Modal from '../components/common/Modal';
import TaskForm from '../components/TaskForm';

export const Goals = () => {
  const { data: goals, isLoading, error, deleteGoal, updateGoalProgress, updateGoal, refetch } = useGoals();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredGoals = goals?.filter(goal => {
    if (searchQuery && !goal.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    if (filter === 'completed') return goal.status === 'completed';
    if (filter === 'in-progress') return goal.status === 'active';
    if (filter === 'paused') return goal.status === 'paused';
    if (filter === 'health-risk') return computeGoalHealth(goal) === 'at-risk' || computeGoalHealth(goal) === 'behind';

    return goal.status !== 'archived';
  }) || [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoal.mutate(id);
      setSelectedGoal(null);
    }
  };

  const handleUpdateProgress = (id, newValue) => {
    updateGoalProgress.mutate({ id, data: { currentValue: newValue } });
  };

  const handleMarkComplete = (id) => {
    updateGoal.mutate({ id, data: { status: 'completed' } });
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 min-h-full">
      <ErrorBoundary>
        <GoalHeader 
          goals={goals} 
          onOpenCreate={() => setIsCreateOpen(true)} 
        />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <GoalFilterBar 
          currentFilter={filter} 
          onFilterChange={setFilter} 
          onSearch={setSearchQuery} 
        />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <GoalGrid 
          goals={filteredGoals} 
          isLoading={isLoading} 
          error={error} 
          onClickGoal={setSelectedGoal}
        />
      </ErrorBoundary>

      <GoalDetailDrawer 
        goal={selectedGoal} 
        isOpen={!!selectedGoal} 
        onClose={() => setSelectedGoal(null)}
        onDelete={handleDelete}
        onUpdateProgress={handleUpdateProgress}
        onMarkComplete={handleMarkComplete}
      />

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Goal">
        <TaskForm onSuccess={() => { setIsCreateOpen(false); refetch(); }} onClose={() => setIsCreateOpen(false)} defaultType="goal" />
      </Modal>
    </div>
  );
};

export default Goals;
