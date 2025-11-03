import React from "react";
import type { AppMode } from "./theme";

type ThemeController = {
  mode: AppMode;
  toggleMode: () => void;
};

export const ThemeControllerContext =
  React.createContext<ThemeController | null>(null);
