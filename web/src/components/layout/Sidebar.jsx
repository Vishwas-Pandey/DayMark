import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Activity, Target, Calendar, Book, BarChart2, Sparkles, LogOut } from 'lucide-react';
import { useAuthContext } from '../../context/AuthProvider';

export const Sidebar = ({ isCollapsed }) => {
  const { logout } = useAuthContext();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Activity, label: 'Habits', path: '/habits' },
    { icon: Target, label: 'Goals', path: '/goals' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Book, label: 'Journal', path: '/journal' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: Sparkles, label: 'AI Workspace', path: '/ai' },
  ];

  return (
    <aside className={`flex flex-col h-full bg-surface-primary border-r border-border-default transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} hidden md:flex`}>
      <div className="p-4 flex items-center justify-center font-bold text-xl h-16 border-b border-border-default">
        {isCollapsed ? 'D' : 'DayMark'}
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-surface-secondary text-text-heading' : 'text-text-muted hover:bg-surface-secondary/50'}`}
          >
            <item.icon size={20} className="shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border-default">
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-muted hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
