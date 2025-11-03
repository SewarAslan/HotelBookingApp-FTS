import { useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeControllerContext } from "../styles/ThemeContext";

export function ThemeToggleButton() {
  const ctx = useContext(ThemeControllerContext);
  if (!ctx) return null;

  return (
    <Tooltip
      title={`Switch to ${ctx.mode === "light" ? "Dark" : "Light"} mode`}
    >
      <IconButton
        color="primary"
        onClick={ctx.toggleMode}
        sx={{
          transition: "transform 0.3s ease",
          "&:hover": { transform: "rotate(20deg) scale(1.1)" },
        }}
      >
        {ctx.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
