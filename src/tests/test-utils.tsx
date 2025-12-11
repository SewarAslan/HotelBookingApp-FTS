import { lightTheme } from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store as defaultStore } from "../store/store";
import type { PropsWithChildren } from "react";
import type { Store } from "@reduxjs/toolkit";

interface RenderOptions {
  storeOverride?: Store;
  [key: string]: unknown;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { storeOverride, ...options }: RenderOptions = {}
) {
  const usedStore = storeOverride || defaultStore;

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={usedStore}>
        <BrowserRouter>
          <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}
