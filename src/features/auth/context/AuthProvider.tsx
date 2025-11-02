import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { AuthContext } from "./AuthContext";
import { authReducer, initialAuthState } from "./AuthReducer";
import { AUTH_ACTIONS } from "../../../constants/actionTypes";
import { apiClient } from "../../../api/client";
import type { AuthState } from "../types/AuthReducerType";
import { STORAGE_KEYS } from "../../../constants/storageKeys";
import { decodeJWT } from "../../../utils/jwtHelpers";

function loadAuthFromSession(): AuthState {
  const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
  const userString = sessionStorage.getItem(STORAGE_KEYS.AUTH_USER);
  if (token && userString) {
    return {
      token,
      userType: JSON.parse(userString).userType, // نستخرجه من الـ object
      isAuthenticated: true,
    };
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

      const { authentication } = data;
      const decoded = decodeJWT(authentication);
      if (!decoded) throw new Error("Failed to decode user info from token");

      sessionStorage.setItem(STORAGE_KEYS.TOKEN, authentication);
      sessionStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(decoded));

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { token: authentication, userType: decoded.userType },
      });

      return decoded.userType;
    } catch (error) {
      console.error("❌ Login failed:", error);
      throw error;
    }
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }

  useEffect(() => {
    const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    const userString = sessionStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (token && userString) {
      const user = JSON.parse(userString);
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { token, userType: user.userType },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
