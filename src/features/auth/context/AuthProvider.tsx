import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { AuthContext } from "./AuthContext";
import { authReducer, initialAuthState } from "./AuthReducer";
import { AUTH_ACTIONS } from "../../../constants/actionTypes";
import { apiClient } from "../../../api/client";
import type { AuthState } from "../types/AuthReducerType";
import type { UserType } from "../../../types/types";
import { STORAGE_KEYS } from "../../../constants/storageKeys";

function loadAuthFromSession(): AuthState {
  const token = sessionStorage.getItem("token");
  const userType = sessionStorage.getItem("userType") as UserType | null;
  if (token && userType) {
    return { token, userType, isAuthenticated: true };
  }
  return initialAuthState;
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useImmerReducer(
    authReducer,
    initialAuthState,
    loadAuthFromSession
  );

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

      sessionStorage.setItem(STORAGE_KEYS.TOKEN, authentication);
      sessionStorage.setItem(STORAGE_KEYS.USER_TYPE, userType);

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
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER_TYPE);
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }

  useEffect(() => {
    const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    const userType = sessionStorage.getItem(STORAGE_KEYS.USER_TYPE);

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
