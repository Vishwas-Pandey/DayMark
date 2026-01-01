import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-center" />

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8">
        <Outlet />
        {/* 'Outlet' is where the pages (Dashboard, AllTasks, Overdue) will appear */}
      </div>
    </div>
  );
};

export default Layout;
