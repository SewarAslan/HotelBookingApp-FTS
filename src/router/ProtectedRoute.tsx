import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { ROUTES } from "../constants/routes";

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
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(state.userType as "Admin" | "User")
  ) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}
