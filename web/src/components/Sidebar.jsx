import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, ListTodo, AlertCircle, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthProvider";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navItems = [
    { path: "/dashboard", label: "Today", icon: LayoutDashboard },
    { path: "/all-tasks", label: "All Habits", icon: ListTodo },
    { path: "/overdue", label: "Overdue", icon: AlertCircle },
  ];

  return (
    <div className="w-64 h-[100dvh] bg-surface-primary border-r border-border-default flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <h1 className="text-2xl font-black tracking-tight text-text-heading">
          DayMark ☀️
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive
                  ? "bg-surface-primary text-text-heading shadow-lg shadow-gray-200"
                  : "text-text-muted hover:bg-surface-secondary hover:text-text-heading"
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border-default">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-text-muted hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
