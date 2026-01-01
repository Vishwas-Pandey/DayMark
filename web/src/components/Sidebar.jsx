import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListTodo, AlertCircle, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const Sidebar = () => {
  const handleLogout = () => {
    // 1. Clear Data
    localStorage.removeItem("user");
    // 2. Show Alert
    toast.success("Logged out");
    // 3. FORCE REFRESH to Login Page (Fixes the "staying on page" bug)
    window.location.href = "/login";
  };

  const navItems = [
    { path: "/dashboard", label: "Today", icon: LayoutDashboard },
    { path: "/all-tasks", label: "All Habits", icon: ListTodo },
    { path: "/overdue", label: "Overdue", icon: AlertCircle },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <h1 className="text-2xl font-black tracking-tight text-gray-900">
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
                  ? "bg-black text-white shadow-lg shadow-gray-200"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
