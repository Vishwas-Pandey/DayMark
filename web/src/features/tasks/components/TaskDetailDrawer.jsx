import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Flag, Tag, Activity, Archive, Trash2 } from 'lucide-react';
import { tasksApi } from '../../../api/tasks';

const EMPTY_FORM = { title: '', description: '', priority: 'medium', dueDate: '', estimatedMinutes: 30, energy: 'medium' };

export const TaskDetailDrawer = ({ task: taskSummary, isOpen, onClose, onDelete, onSave, onArchive }) => {
  // The list view only has the slim summary shape (id/title/status/priority/dueDate/labels/tags) —
  // fetch the full record once opened so description/energy/estimatedMinutes are real, not blank.
  const { data: fullTask } = useQuery({
    queryKey: ['tasks', taskSummary?.id],
    queryFn: () => tasksApi.get(taskSummary.id).then((res) => res.data),
    enabled: Boolean(isOpen && taskSummary?.id)
  });

  const task = fullTask || taskSummary;
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!task) return;
    setForm({
      title: task.title || '',
      description: task.description || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      estimatedMinutes: task.estimatedMinutes ?? 30,
      energy: task.energy || 'medium'
    });
  }, [task?.id, fullTask]);

  if (!taskSummary) return null;

  const handleSave = () => {
    onSave(task.id, {
      title: form.title,
      description: form.description,
      priority: form.priority,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
      estimatedMinutes: Number(form.estimatedMinutes) || 0,
      energy: form.energy
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-text-heading/20 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] md:w-[480px] bg-surface-primary shadow-2xl border-l border-border-default z-50 flex flex-col"
          >
            <div className="h-16 border-b border-border-default flex items-center justify-between px-6 shrink-0 bg-surface-secondary/50 backdrop-blur-md">
              <span className="font-semibold text-text-muted uppercase tracking-wider text-xs">Task Details</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { onArchive(task.id); onClose(); }}
                  className="p-2 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-primary transition-colors"
                  aria-label="Archive task"
                >
                  <Archive size={18} />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-2 text-text-muted hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  aria-label="Delete task"
                >
                  <Trash2 size={18} />
                </button>
                <div className="w-px h-4 bg-border-default mx-1" />
                <button onClick={onClose} className="p-2 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-primary transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full text-2xl font-bold text-text-heading bg-transparent border-none p-0 focus:outline-none focus:ring-0 resize-none"
                  placeholder="Task title..."
                />
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full text-sm text-text-muted bg-transparent border-none p-0 mt-3 focus:outline-none focus:ring-0 resize-none min-h-[100px]"
                  placeholder="Add a description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border-default bg-surface-secondary/30 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Flag size={16} className="text-text-muted shrink-0" />
                    <select
                      value={form.priority}
                      onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
                      className="bg-transparent font-semibold focus:outline-none w-full cursor-pointer text-text-heading"
                    >
                      <option value="urgent">Urgent Priority</option>
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={16} className="text-text-muted shrink-0" />
                    <input
                      type="date"
                      value={form.dueDate}
                      onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                      className="bg-transparent font-medium focus:outline-none w-full text-text-heading cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border-default bg-surface-secondary/30 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={16} className="text-text-muted shrink-0" />
                    <div className="flex items-center gap-1 w-full">
                      <input
                        type="number"
                        min="0"
                        value={form.estimatedMinutes}
                        onChange={(e) => setForm((f) => ({ ...f, estimatedMinutes: e.target.value }))}
                        className="bg-transparent font-semibold focus:outline-none w-10 text-text-heading"
                      />
                      <span className="text-text-muted font-medium">mins</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Activity size={16} className="text-text-muted shrink-0" />
                    <select
                      value={form.energy}
                      onChange={(e) => setForm((f) => ({ ...f, energy: e.target.value }))}
                      className="bg-transparent font-semibold focus:outline-none w-full cursor-pointer text-text-heading"
                    >
                      <option value="high">High Energy</option>
                      <option value="medium">Medium Energy</option>
                      <option value="low">Low Energy</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-text-heading text-sm">Tags & Labels</h4>
                <div className="flex flex-wrap gap-2">
                  {(task.tags || []).map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-surface-secondary border border-border-default text-xs font-semibold text-text-muted flex items-center gap-1">
                      <Tag size={12} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border-default bg-surface-primary shrink-0">
              <button
                onClick={handleSave}
                className="w-full py-3 rounded-xl bg-text-heading text-surface-primary font-bold shadow-sm hover:shadow-md transition-all"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
