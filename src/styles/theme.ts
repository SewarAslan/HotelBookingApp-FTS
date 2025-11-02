import {
  createTheme,
  responsiveFontSizes,
  type Theme,
  type ThemeOptions,
} from "@mui/material/styles";
import { keyframes } from "@mui/system";

export type AppMode = "light" | "dark";

/* ================================
   🎬 Animations
================================ */
export const fadeInUp = keyframes`
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
`;

export const softFloat = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0); }
`;

/* ================================
   🧩 Extend Theme Types (Palette + Animations)
================================ */
declare module "@mui/material/styles" {
  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
    };
    brand: {
      lavender: string;
      violet: string;
      rose: string;
    };
  }

  interface PaletteOptions {
    gradient?: {
      primary?: string;
      secondary?: string;
    };
    brand?: {
      lavender?: string;
      violet?: string;
      rose?: string;
    };
  }

  // ✅ نضيف دعم لأنيميشن داخل theme
  interface Theme {
    animations: {
      fadeInUp: string;
      softFloat: string;
    };
  }

  interface ThemeOptions {
    animations?: {
      fadeInUp?: string;
      softFloat?: string;
    };
  }
}

/* ================================
   🎨 Design Tokens per Mode
================================ */
const getDesignTokens = (mode: AppMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#7c3aed", light: "#a78bfa", dark: "#5b21b6" },
          secondary: { main: "#c084fc", dark: "#9a6df0" },
          error: { main: "#ef4444" },
          success: { main: "#10b981" },
          warning: { main: "#f59e0b" },
          info: { main: "#3b82f6" },
          background: { default: "#f3e8ff", paper: "#ffffff" },
          text: { primary: "#211127", secondary: "#54395e" },
          brand: {
            lavender: "#a78bfa",
            violet: "#7c3aed",
            rose: "#c084fc",
          },
          gradient: {
            primary: "linear-gradient(135deg, #a78bfa, #7c3aed)",
            secondary: "linear-gradient(135deg, #c084fc, #9a6df0)",
          },
        }
      : {
          primary: { main: "#a78bfa", light: "#c4b5fd", dark: "#7c3aed" },
          secondary: { main: "#9a6df0" },
          error: { main: "#f87171" },
          success: { main: "#34d399" },
          warning: { main: "#fbbf24" },
          info: { main: "#60a5fa" },
          background: { default: "#221127", paper: "#341e3b" },
          text: { primary: "#f3f4f6", secondary: "#cbd5e1" },
          brand: {
            lavender: "#c4b5fd",
            violet: "#a78bfa",
            rose: "#d8b4fe",
          },
          gradient: {
            primary: "linear-gradient(135deg, #7c3aed, #a78bfa)",
            secondary: "linear-gradient(135deg, #9a6df0, #c084fc)",
          },
        }),
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily:
      "Inter, Tajawal, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    h1: { fontWeight: 800, letterSpacing: -0.5 },
    h2: { fontWeight: 700, letterSpacing: -0.3 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
    subtitle1: { opacity: 0.9 },
    subtitle2: { opacity: 0.85 },
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});

/* ================================
   🧱 Theme Factory + Component Overrides
================================ */
export const createAppTheme = (mode: AppMode): Theme => {
  let theme = createTheme(getDesignTokens(mode));

  // ✅ نضيف الأنيميشنات داخل الـ theme نفسه
  theme = createTheme(theme, {
    animations: {
      fadeInUp: `${fadeInUp} 0.6s ${theme.transitions.easing.easeOut}`,
      softFloat: `${softFloat} 3.2s ease-in-out infinite`,
    },

    components: {
      /* 🌐 Global Styles */
      MuiCssBaseline: {
        styleOverrides: {
          "*, *::before, *::after": { boxSizing: "border-box" },
          html: { height: "100%", scrollBehavior: "smooth" },
          body: {
            height: "100%",
            background: theme.palette.background.default,
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
          "#root": { minHeight: "100%" },
          "*::-webkit-scrollbar": { width: 10, height: 10 },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor:
              theme.palette.mode === "light" ? "#d4d4d8" : "#3f3f46",
            borderRadius: 999,
            border:
              theme.palette.mode === "light"
                ? "2px solid #f8fafc"
                : "2px solid #0f172a",
          },
          "*::-webkit-scrollbar-track": {
            background: theme.palette.mode === "light" ? "#f1f5f9" : "#0b1222",
          },
        },
      },

      /* 🔘 Button */
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 12,
            fontWeight: 600,
            textTransform: "none",
            transition: theme.transitions.create(
              ["transform", "box-shadow", "background-color"],
              { duration: theme.transitions.duration.short }
            ),
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0 8px 22px rgba(124, 58, 237, 0.18)"
                  : "0 8px 22px rgba(167, 139, 250, 0.25)",
            },
            "&:active": { transform: "translateY(0)" },
          },
        },
        variants: [
          {
            props: { variant: "gradient" as unknown },
            style: {
              background: theme.palette.gradient.primary,
              color: "#fff",
              "&:hover": {
                background: theme.palette.gradient.secondary,
              },
            },
          },
        ],
      },

      /* 🃏 Card */
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            overflow: "hidden",
            backdropFilter: "saturate(120%) blur(2px)",
            animation: `${fadeInUp} 0.6s ease-out`,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 8px 30px rgba(0,0,0,0.06)"
                : "0 8px 30px rgba(0,0,0,0.35)",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "translateY(-4px)" },
          },
        },
      },

      /* 📦 Paper */
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            transition: theme.transitions.create("background-color"),
          },
        },
      },

      /* 💬 Tooltip */
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 12,
            borderRadius: 8,
            backdropFilter: "blur(2px)",
            background: theme.palette.mode === "light" ? "#111827" : "#e5e7eb",
            color: theme.palette.mode === "light" ? "#f9fafb" : "#111827",
          },
        },
      },

      /* 🍞 Snackbar */
      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            fontWeight: 600,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 10px 30px rgba(0,0,0,0.10)"
                : "0 10px 30px rgba(0,0,0,0.45)",
          },
        },
      },

      /* 💀 Skeleton */
      MuiSkeleton: {
        styleOverrides: {
          root: { animation: `${softFloat} 3.2s ease-in-out infinite` },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
