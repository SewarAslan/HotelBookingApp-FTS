import React from "react";
import type { AppMode } from "./theme";

/* ===== 💡 نوع السياق الخاص بالتحكم بالثيم ===== */
type ThemeController = {
  mode: AppMode;
  toggleMode: () => void;
};

/* ===== 🧠 إنشاء الـ Context ===== */
export const ThemeControllerContext =
  React.createContext<ThemeController | null>(null);
