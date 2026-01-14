import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AllTasks from "./pages/AllTasks";
import Overdue from "./pages/Overdue";
import Layout from "./components/Layout";

function App() {
  // ⚠️ Note: For a real app, use a Context or State for 'user' to update instantly on login.
  // Currently, you might need to refresh the page after logging in for this to update.
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        {/* Public Route: Login */}
        {/* If user is already logged in, redirect them away from Login page */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
        />

        {/* Protected Routes Block */}
        {user ? (
          <Route element={<Layout />}>
            {/* 👇 THIS WAS MISSING: Redirect root "/" to "/dashboard" */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all-tasks" element={<AllTasks />} />
            <Route path="/overdue" element={<Overdue />} />

            {/* Catch-all for logged-in users (e.g., /random-url -> /dashboard) */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        ) : (
          /* Catch-all for guests: Any unknown URL goes to Login */
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
