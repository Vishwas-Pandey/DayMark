import React, { useState } from 'react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { useTasks } from '../hooks/useTasks';
import { TaskHeader } from '../features/tasks/components/TaskHeader';
import { TaskFilterBar } from '../features/tasks/components/TaskFilterBar';
import { TaskList } from '../features/tasks/components/TaskList';
import { TaskDetailDrawer } from '../features/tasks/components/TaskDetailDrawer';
import Modal from '../components/common/Modal';
import TaskForm from '../components/TaskForm';

export const AllTasks = () => {
  const { data: tasks, isLoading, error, updateTask, deleteTask, refetch, bulkCompleteTasks, bulkDeleteTasks } = useTasks();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // Filter logic
  const filteredTasks = tasks?.filter(task => {
    // Search
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Quick Filters
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'today') {
      const isToday = new Date(task.dueDate).toDateString() === new Date().toDateString();
      return isToday && task.status !== 'completed';
    }
    if (filter === 'overdue') {
      const isOverdue = new Date(task.dueDate) < new Date();
      return isOverdue && task.status !== 'completed';
    }
    return task.status !== 'archived'; // 'all' or fallback
  }) || [];

  const handleToggleTask = (task) => {
    updateTask.mutate({ 
      id: task.id, 
      data: { status: task.status === 'completed' ? 'todo' : 'completed' } 
    });
  };

  const handleSelectTaskCheckbox = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask.mutate(id);
      setSelectedTask(null);
    }
  };

  const handleSaveTask = (id, data) => {
    updateTask.mutate({ id, data });
  };

  const handleArchiveTask = (id) => {
    updateTask.mutate({ id, data: { status: 'archived', archived: true } });
  };

  const handleBulkComplete = () => {
    bulkCompleteTasks.mutate(selectedIds, { onSuccess: () => setSelectedIds([]) });
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedIds.length} selected task(s)?`)) {
      bulkDeleteTasks.mutate(selectedIds, { onSuccess: () => setSelectedIds([]) });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 relative min-h-full flex flex-col">
      <ErrorBoundary>
        <TaskHeader 
          tasks={tasks} 
          onOpenCreate={() => setIsCreateOpen(true)} 
          onSearch={setSearchQuery} 
        />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <TaskFilterBar currentFilter={filter} onFilterChange={setFilter} />
      </ErrorBoundary>
      
      <div className="flex-1">
        <ErrorBoundary>
          <TaskList 
            tasks={filteredTasks} 
            isLoading={isLoading} 
            error={error} 
            onToggle={handleToggleTask}
            onClickTask={setSelectedTask}
            selectedIds={selectedIds}
            onSelectTask={handleSelectTaskCheckbox}
          />
        </ErrorBoundary>
      </div>

      <TaskDetailDrawer
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onDelete={handleDelete}
        onSave={handleSaveTask}
        onArchive={handleArchiveTask}
      />

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Task">
        <TaskForm onSuccess={() => { setIsCreateOpen(false); refetch(); }} onClose={() => setIsCreateOpen(false)} defaultType="task" />
      </Modal>

      {/* Floating Action Bar for Bulk Selection could go here */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-text-heading text-surface-primary px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6 z-30 font-semibold animate-in slide-in-from-bottom-10">
          <span>{selectedIds.length} Selected</span>
          <div className="flex items-center gap-3">
            <button onClick={handleBulkComplete} className="px-3 py-1.5 rounded-lg bg-surface-primary/10 hover:bg-surface-primary/20 transition-colors">Complete</button>
            <button onClick={handleBulkDelete} className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
