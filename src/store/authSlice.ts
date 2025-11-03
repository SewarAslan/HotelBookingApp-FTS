import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { apiClient } from "../api/client";
import { decodeJWT } from "../utils/jwtHelpers";
import type { DecodedUser } from "../types/User";

export interface AuthState {
  token: string | null;
  AuthUser: DecodedUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: Cookies.get("token") || null,
  AuthUser: Cookies.get("AuthUser")
    ? JSON.parse(Cookies.get("AuthUser")!)
    : null,
  isAuthenticated: !!Cookies.get("token"),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  { token: string; AuthUser: DecodedUser },
  { username: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const res = await apiClient.api.authAuthenticateCreate({
      userName: credentials.username,
      password: credentials.password,
    });

    const parsed =
      typeof res.data === "string" ? JSON.parse(res.data) : res.data;

    const { authentication } = parsed;
    const decoded = decodeJWT(authentication) as DecodedUser;

    if (!decoded) throw new Error("Failed to decode token");

    Cookies.set("token", authentication, { expires: 7 });
    Cookies.set("AuthUser", JSON.stringify(decoded), { expires: 7 });

    return { token: authentication, AuthUser: decoded };
  } catch (err) {
    console.error("❌ Login failed", err);
    return rejectWithValue("Invalid username or password");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      Cookies.remove("token");
      Cookies.remove("AuthUser");
      state.token = null;
      state.AuthUser = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; AuthUser: DecodedUser }>
        ) => {
          state.loading = false;
          state.token = action.payload.token;
          state.AuthUser = action.payload.AuthUser;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
