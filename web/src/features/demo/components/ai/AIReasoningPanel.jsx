import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AIReasoningPanel = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-6 rounded-2xl bg-surface-primary border border-interactive-primary/30 relative overflow-hidden group hover:border-interactive-primary transition-colors cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
      </div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className="text-xs font-bold tracking-widest text-text-muted uppercase mb-1">AI Recommendation</h3>
          <p className="text-sm font-medium text-text-heading">Move Deep Work to 9:30 AM</p>
        </div>
        <div className="flex items-center gap-1 bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold border border-green-500/20">
          94% Confidence
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10 overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-border-subtle space-y-4">
              <div>
                <span className="text-xs font-bold text-text-muted block mb-1">Reasoning</span>
                <p className="text-sm text-text-heading">Historical completion of deep work blocks increases by 22% when scheduled immediately after morning exercise.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold text-text-muted block mb-1">Expected Benefit</span>
                  <p className="text-sm text-green-400 font-medium">High Focus Yield</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-text-muted block mb-1">Est. Time Saved</span>
                  <p className="text-sm text-text-heading font-medium">45 minutes</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!expanded && (
        <div className="text-xs text-interactive-primary font-medium mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
          View AI Reasoning <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      )}
    </div>
  );
};