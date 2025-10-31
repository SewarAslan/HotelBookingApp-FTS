import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("Admin" | "User")[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(state.userType as "Admin" | "User")
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}
