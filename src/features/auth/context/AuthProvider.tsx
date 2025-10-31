import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { AuthContext } from "./AuthContext";
import { authReducer, initialAuthState } from "./AuthReducer";
import { AUTH_ACTIONS } from "../../../constants/actionTypes";
import { apiClient } from "../../../api/client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useImmerReducer(authReducer, initialAuthState);

  async function login(username: string, password: string) {
    try {
      const response = await apiClient.api.authAuthenticateCreate({
        userName: username,
        password,
      });

      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      const { userType, authentication } = data;

      sessionStorage.setItem("token", authentication);
      sessionStorage.setItem("userType", userType);

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { token: authentication, userType },
      });

      return userType;
    } catch (error) {
      console.error("❌ Login failed:", error);
      throw error;
    }
  }

  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userType");
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userType = sessionStorage.getItem("userType");

    if (token && userType) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { token, userType: userType as "Admin" | "User" },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
