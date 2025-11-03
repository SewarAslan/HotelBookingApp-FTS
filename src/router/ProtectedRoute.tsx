import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import type { RootState } from "../store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("Admin" | "User")[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, AuthUser } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated || !AuthUser) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(AuthUser.userType)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
}
