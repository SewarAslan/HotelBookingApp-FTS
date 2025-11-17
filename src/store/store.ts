import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import snackbarReducer from "./snackbarSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
