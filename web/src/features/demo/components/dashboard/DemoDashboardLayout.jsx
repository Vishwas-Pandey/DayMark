import React from 'react';
import { DemoSidebar } from './DemoSidebar';
import { DemoTopBar } from './DemoTopBar';
import { DemoContextPanel } from './DemoContextPanel';
import { CommandPalette } from './CommandPalette';
import { QuickActionsFAB } from './QuickActionsFAB';

export const DemoDashboardLayout = ({ children }) => {
  return (
    <div className="flex h-[100dvh] bg-[#0a0a0a] text-text-heading overflow-hidden font-sans relative">
      <CommandPalette />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-1/4 w-[50vw] h-[50vw] rounded-full bg-interactive-primary/5 blur-[150px]" />
      </div>

      <DemoSidebar />
      
      <div className="flex flex-col flex-1 min-w-0 z-10 relative">
        <DemoTopBar />
        
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 md:p-8 xl:p-10 scrollbar-hide">
            <div className="max-w-5xl mx-auto">
              {children}
            </div>
          </main>
          
          <DemoContextPanel />
        </div>
      </div>
      
      <QuickActionsFAB />
    </div>
  );
};