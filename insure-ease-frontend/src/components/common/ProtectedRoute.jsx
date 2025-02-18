import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  // If the route is admin-only, ensure user is both authenticated AND an admin
  if (adminOnly && (!isAuthenticated || !isAdmin)) {
    return <Navigate to="/login" replace />;
  }

  // If it's a normal protected route, just check authentication
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;