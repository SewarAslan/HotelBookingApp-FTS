import type { Draft } from "immer";
import type { AuthState, AuthAction } from "../types/AuthReducerType";
import { AUTH_ACTIONS } from "../../../constants/actionTypes";

export const initialAuthState: AuthState = {
  token: null,
  userType: null,
  isAuthenticated: false,
};

export function authReducer(draft: Draft<AuthState>, action: AuthAction) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      draft.token = action.payload.token;
      draft.userType = action.payload.userType;
      draft.isAuthenticated = true;

      break;

    case AUTH_ACTIONS.LOGOUT:
      draft.token = null;
      draft.userType = null;
      draft.isAuthenticated = false;

      break;

    default:
      return draft;
  }
}
