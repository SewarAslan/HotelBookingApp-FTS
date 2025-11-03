import React from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { createAppTheme, type AppMode } from "./theme";
import { ThemeControllerContext } from "./ThemeContext";

function setCookie(name: string, value: string, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name: string): string | undefined {
  const key = `${name}=`;
  return document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(key))
    ?.substring(key.length);
}

export default function ThemeProviderWithToggle({
  children,
}: {
  children: React.ReactNode;
}) {
  const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  const cookieMode = getCookie("app_mode") as AppMode | undefined;

  const initialMode: AppMode =
    cookieMode ?? (systemPrefersDark ? "dark" : "light");

  //
  const [mode, setMode] = React.useState<AppMode>(initialMode);

  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  const toggleMode = React.useCallback(() => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      setCookie("app_mode", next);
      return next;
    });
  }, []);

  return (
    <ThemeControllerContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeControllerContext.Provider>
  );
}
