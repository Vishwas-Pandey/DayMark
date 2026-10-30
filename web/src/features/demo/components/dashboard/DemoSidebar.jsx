import React from 'react';
import { motion } from 'framer-motion';
import { useDemoStore } from '../../store/useDemoStore';

export const DemoSidebar = () => {
  const active = useDemoStore(state => state.activeTab);
  const setActive = useDemoStore(state => state.setActiveTab);
  
  const navItems = [
    { name: 'Dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
    { name: 'Tasks', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
    { name: 'Habits', icon: 'M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 0 1-4 4H3' },
    { name: 'Calendar', icon: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18' },
    { name: 'Journal', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' },
    { name: 'Goals', icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3' },
    { name: 'Analytics', icon: 'M18 20V10 M12 20V4 M6 20v-6' },
    { name: 'AI Coach', icon: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-[100dvh] sticky top-0 bg-surface-secondary/50 backdrop-blur-3xl border-r border-border-default pt-6 pb-6 z-40">
      <div className="px-6 mb-8 cursor-pointer group">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-primary transition-colors border border-transparent hover:border-border-default">
          <div className="w-8 h-8 rounded-lg bg-interactive-primary shadow-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-sm font-bold text-text-heading">Alex's Life</span>
            <span className="text-[10px] text-text-muted">Pro Plan</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted group-hover:text-text-heading"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 space-y-1 scrollbar-hide">
        {navItems.map((item) => (
          <button 
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative group focus-ring outline-none ${active === item.name ? 'text-text-heading bg-surface-primary border border-border-default shadow-sm' : 'text-text-muted hover:text-text-heading hover:bg-surface-primary/50 border border-transparent'}`}
          >
            {active === item.name && (
              <motion.div 
                layoutId="activeNavIndicator"
                className="absolute left-0 w-1 h-5 bg-interactive-primary rounded-r-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${active === item.name ? 'text-interactive-primary' : 'text-text-muted group-hover:text-interactive-primary transition-colors'}`}>
              <path d={item.icon}></path>
            </svg>
            {item.name}
          </button>
        ))}
      </nav>
      <div className="px-4 mt-auto space-y-1">
        <button aria-label="Settings" aria-current={active === 'Settings' ? 'page' : undefined} onClick={() => setActive('Settings')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group focus-ring outline-none ${active === 'Settings' ? 'text-text-heading bg-surface-primary border border-border-default' : 'text-text-muted hover:text-text-heading hover:bg-surface-primary/50 border border-transparent'}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          Settings
        </button>
      </div>
    </aside>
  );
};