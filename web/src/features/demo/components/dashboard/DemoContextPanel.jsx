import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AICoachWidget } from '../DashboardWidgets';
import { useDemoStore } from '../../store/useDemoStore';

export const DemoContextPanel = () => {
  const activeTab = useDemoStore(state => state.activeTab);
  
  return (
    <aside className="hidden xl:flex flex-col w-80 h-[calc(100vh-80px)] sticky top-20 bg-surface-primary/30 backdrop-blur-md border-l border-border-default overflow-y-auto p-6 scrollbar-hide">
      <div className="flex flex-col gap-6">
        
        <div>
          <h3 className="text-xs font-bold tracking-widest text-text-muted uppercase mb-4">Up Next</h3>
          <div className="space-y-3">
            {[
              { time: "14:00", title: "Product Sync", color: "bg-blue-500" },
              { time: "15:30", title: "Deep Work (90m)", color: "bg-purple-500" },
              { time: "17:00", title: "Gym Session", color: "bg-green-500" }
            ].map((ev, i) => (
              <motion.div 
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary/50 border border-border-subtle hover:bg-surface-secondary transition-colors cursor-pointer group"
                whileHover={{ x: 2 }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-text-muted">{ev.time}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${ev.color} mt-1 group-hover:scale-125 transition-transform`} />
                </div>
                <span className="text-sm font-medium text-text-heading">{ev.title}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {activeTab !== 'AI Coach' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h3 className="text-xs font-bold tracking-widest text-text-muted uppercase mb-4 mt-6">Coach Insights</h3>
              <AICoachWidget />
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <h3 className="text-xs font-bold tracking-widest text-text-muted uppercase mb-4 mt-6">Weekly Goal</h3>
          <div className="bg-surface-secondary/50 border border-border-subtle rounded-xl p-4 hover:border-interactive-primary/30 transition-colors group">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-text-heading group-hover:text-interactive-primary transition-colors">Ship MVP</span>
              <span className="text-xs font-bold text-interactive-primary">80%</span>
            </div>
            <div className="w-full h-2 bg-surface-primary rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-interactive-primary"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
};