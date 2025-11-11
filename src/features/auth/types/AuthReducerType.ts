import type { UserType } from "../../../types/types";
import { AUTH_ACTIONS } from "../../../constants/actionTypes";
export type AuthState = {
  token: string | null;
  userType: UserType;
  isAuthenticated: boolean;
};
export type AuthAction =
  | {
      type: typeof AUTH_ACTIONS.LOGIN_SUCCESS;
      payload: { token: string; userType: UserType };
    }
  | {
      type: typeof AUTH_ACTIONS.LOGOUT;
    };
