import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import ThemeProviderWithToggle from "./styles/ThemeProviderWithToggle";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProviderWithToggle>
        <App />
      </ThemeProviderWithToggle>
    </AuthProvider>
  </StrictMode>
);
