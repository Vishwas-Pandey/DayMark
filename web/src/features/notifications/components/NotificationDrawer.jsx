import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Zap, Target, Bell } from 'lucide-react';

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const notifications = [
    { id: 1, type: 'task', title: 'Task Overdue', message: 'Update Q3 Presentation is overdue.', time: '10m ago', icon: CheckCircle2, color: 'text-blue-500', unread: true },
    { id: 2, type: 'ai', title: 'AI Insight Available', message: 'Your weekly reflection is ready to review.', time: '1h ago', icon: Zap, color: 'text-purple-500', unread: true },
    { id: 3, type: 'goal', title: 'Goal Milestone', message: 'You reached 50% on "Learn React".', time: 'Yesterday', icon: Target, color: 'text-orange-500', unread: false }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-text-heading/10 backdrop-blur-[2px] z-40"
          />
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-surface-primary shadow-2xl border-l border-border-default z-50 flex flex-col"
          >
            <div className="h-16 border-b border-border-default flex items-center justify-between px-6 shrink-0">
              <h2 className="font-bold text-text-heading flex items-center gap-2">
                <Bell size={18} /> Notifications
              </h2>
              <div className="flex items-center gap-2">
                <button className="text-xs font-semibold text-interactive-primary hover:underline">Mark all read</button>
                <div className="w-px h-4 bg-border-default mx-1" />
                <button onClick={onClose} className="p-1.5 text-text-muted hover:text-text-heading rounded-lg hover:bg-surface-secondary transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {notifications.map(notif => (
                <div key={notif.id} className={`p-4 rounded-xl border flex gap-3 transition-colors cursor-pointer hover:shadow-sm ${notif.unread ? 'bg-interactive-primary/5 border-interactive-primary/20' : 'bg-surface-secondary/50 border-border-default hover:bg-surface-primary'}`}>
                  <div className={`mt-0.5 ${notif.color}`}>
                    <notif.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-text-heading">{notif.title}</p>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{notif.message}</p>
                    <p className="text-[10px] font-semibold text-text-muted/60 mt-2 uppercase tracking-wider">{notif.time}</p>
                  </div>
                  {notif.unread && <div className="w-2 h-2 rounded-full bg-interactive-primary shrink-0 mt-1.5" />}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
