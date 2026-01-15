import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AllTasks from "./pages/AllTasks";
import Overdue from "./pages/Overdue";
import Layout from "./components/Layout";

// Routes separated so we can use AuthContext
const AppRoutes = () => {
  const { user, loading } = useAuth();

  // ⏳ Wait for hydration BUT do not block navigation
  if (loading) return null;

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
      />

      {/* Protected Routes */}
      {user ? (
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/all-tasks" element={<AllTasks />} />
          <Route path="/overdue" element={<Overdue />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
