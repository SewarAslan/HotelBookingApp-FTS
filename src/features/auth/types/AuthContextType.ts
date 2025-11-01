import type { UserType } from "../../../types/types";
import type { AuthState } from "./AuthReducerType";

export type AuthContextType = {
  state: AuthState;
  login: (username: string, password: string) => Promise<UserType>;
  logout: () => void;
};
