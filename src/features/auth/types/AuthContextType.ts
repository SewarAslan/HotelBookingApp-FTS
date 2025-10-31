import type { AuthState } from "./AuthReducerType";

export type AuthContextType = {
  state: AuthState;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};
