import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // ⛔ Wait until AuthContext finishes loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // ❌ Redirect only AFTER loading is false
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
