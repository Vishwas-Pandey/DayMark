import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Flag, Tag, Activity, Archive, Trash2 } from 'lucide-react';

export const TaskDetailDrawer = ({ task, isOpen, onClose, onDelete }) => {
  if (!task) return null;

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
                <button className="p-2 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-primary transition-colors">
                  <Archive size={18} />
                </button>
                <button 
                  onClick={() => onDelete(task.id)}
                  className="p-2 text-text-muted hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
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
                  defaultValue={task.title}
                  className="w-full text-2xl font-bold text-text-heading bg-transparent border-none p-0 focus:outline-none focus:ring-0 resize-none"
                  placeholder="Task title..."
                />
                <textarea 
                  defaultValue={task.description}
                  className="w-full text-sm text-text-muted bg-transparent border-none p-0 mt-3 focus:outline-none focus:ring-0 resize-none min-h-[100px]"
                  placeholder="Add a description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border-default bg-surface-secondary/30 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Flag size={16} className="text-text-muted shrink-0" />
                    <select className="bg-transparent font-semibold focus:outline-none w-full cursor-pointer text-text-heading" defaultValue={task.priority}>
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                      <option value="None">No Priority</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={16} className="text-text-muted shrink-0" />
                    <input type="date" defaultValue={task.dueDate?.split('T')[0]} className="bg-transparent font-medium focus:outline-none w-full text-text-heading cursor-pointer" />
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border-default bg-surface-secondary/30 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={16} className="text-text-muted shrink-0" />
                    <div className="flex items-center gap-1 w-full">
                      <input type="number" defaultValue={task.estimatedTime || 30} className="bg-transparent font-semibold focus:outline-none w-10 text-text-heading" />
                      <span className="text-text-muted font-medium">mins</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Activity size={16} className="text-text-muted shrink-0" />
                    <select className="bg-transparent font-semibold focus:outline-none w-full cursor-pointer text-text-heading" defaultValue={task.energy || 'Medium'}>
                      <option value="High">High Energy</option>
                      <option value="Medium">Medium Energy</option>
                      <option value="Low">Low Energy</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-text-heading text-sm">Tags & Labels</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-surface-secondary border border-border-default text-xs font-semibold text-text-muted flex items-center gap-1 cursor-pointer hover:bg-surface-primary">
                    <Tag size={12} /> Add Tag
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-border-default bg-surface-primary shrink-0">
              <button 
                onClick={onClose}
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
