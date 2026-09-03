import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { RightPanel } from './RightPanel';

// The AI Workspace has its own full-width, self-contained layout
// (conversation list + chat + composer) — the global insights panel
// would just duplicate/collide with it.
const ROUTES_WITHOUT_RIGHT_PANEL = ['/ai'];

export const DashboardLayout = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isRightPanelOpen, setRightPanelOpen] = useState(true);
  const showRightPanel = isRightPanelOpen && !ROUTES_WITHOUT_RIGHT_PANEL.includes(location.pathname);

  return (
    <div className="flex h-[100dvh] w-full bg-surface-primary overflow-hidden text-text-body font-sans">
      {/* Mobile Drawer Navigation could be injected here */}

      <Sidebar isCollapsed={isSidebarCollapsed} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Workspace */}
          <main className={`flex-1 overflow-y-auto ${ROUTES_WITHOUT_RIGHT_PANEL.includes(location.pathname) ? '' : 'p-4 md:p-6 lg:p-8'}`}>
            <Outlet />
          </main>

          <RightPanel isOpen={showRightPanel} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
