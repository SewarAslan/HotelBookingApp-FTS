import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";

import App from "./App.tsx";
import ThemeProviderWithToggle from "./styles/ThemeProviderWithToggle";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProviderWithToggle>
        <App />
      </ThemeProviderWithToggle>
    </Provider>
  </StrictMode>
);
