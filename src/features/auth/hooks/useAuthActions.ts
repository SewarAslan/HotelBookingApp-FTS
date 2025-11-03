import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../../store/store";
import { ROUTES } from "../../../constants/routes";

export function useAuthActions() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, AuthUser, token } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = async (username: string, password: string) => {
    const result = await dispatch(loginUser({ username, password }));

    if (loginUser.fulfilled.match(result)) {
      const { AuthUser } = result.payload;

      if (AuthUser.userType === "Admin") navigate(ROUTES.ADMIN);
      else navigate(ROUTES.HOME);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  return {
    handleLogin,
    handleLogout,
    loading,
    error,
    isAuthenticated,
    AuthUser,
    token,
  };
}
