import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AICTA = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start gap-4">
      <p className="text-sm text-text-muted font-medium">Ready to Let AI Organize Your Day?</p>
      <button 
        onClick={() => navigate('/demo')}
        className="px-8 py-3.5 rounded-lg bg-text-heading text-surface-primary font-semibold shadow-[0_0_20px_rgba(var(--color-interactive-primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--color-interactive-primary-rgb),0.5)] transition-shadow relative overflow-hidden group focus-ring outline-none"
      >
        <span className="relative z-10 flex items-center gap-2">
          Start Your Intelligent Journey
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </span>
      </button>
    </div>
  );
};