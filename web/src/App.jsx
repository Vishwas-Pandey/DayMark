import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { DashboardSkeleton } from "./components/common/Skeletons";
import { OfflineBanner } from "./components/common/ErrorStates";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ProtectedRoute, AuthRoute } from "./components/guards/RouteGuards";

// Layouts
import DashboardLayout from "./components/layout/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";

// Loaders
import { LoaderProvider, LoaderPortal, LoaderTransition } from "./features/landing/components/loader";

// Pages
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import { DemoPage } from "./pages/DemoPage";

// Lazy Loaded Protected Pages
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AllTasks = lazy(() => import("./pages/AllTasks"));
const Overdue = lazy(() => import("./pages/Overdue"));
const Habits = lazy(() => import("./pages/Habits"));
const Goals = lazy(() => import("./pages/Goals"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Journal = lazy(() => import("./pages/Journal"));
const Analytics = lazy(() => import("./pages/Analytics"));
const AI = lazy(() => import("./pages/AI"));
const Profile = lazy(() => import("./pages/Profile"));

const AppRoutes = () => {
  return (
    <>
      <OfflineBanner />
      <Suspense fallback={<DashboardSkeleton />}>
        <Routes>
          {/* Public Routing Layer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
          </Route>

          {/* Auth Routing Layer */}
          <Route element={<AuthRoute><AuthLayout /></AuthRoute>}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route path="/demo" element={<DemoPage />} />

          {/* Protected Routing Layer */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<AllTasks />} />
            <Route path="/all-tasks" element={<AllTasks />} />
            <Route path="/overdue" element={<Overdue />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/profile" element={<Profile />} />

            {/* Catch-all for logged in users */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LoaderProvider>
          <Router>
            <Toaster position="top-center" />
            <LoaderPortal />
            <LoaderTransition>
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </LoaderTransition>
          </Router>
        </LoaderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
