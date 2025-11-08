import {
  createTheme,
  responsiveFontSizes,
  type Theme,
  type ThemeOptions,
} from "@mui/material/styles";
import { keyframes } from "@mui/system";

export type AppMode = "light" | "dark";

export const fadeInUp = keyframes`
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
`;

export const softFloat = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0); }
`;

declare module "@mui/material/styles" {
  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    brand: {
      white: string;
      orange: string;
      yellow: string;
      turquoise: string;
    };
  }

  interface PaletteOptions {
    gradient?: {
      primary?: string;
      secondary?: string;
      tertiary?: string;
    };
    brand?: {
      white?: string;
      orange?: string;
      yellow?: string;
      turquoise?: string;
    };
  }

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
          primary: { main: "#ff8c42", light: "#ffb56b", dark: "#c35e00" }, // برتقالي رئيسي
          secondary: { main: "#23a79eff", light: "#8fd3cdff", dark: "#009e91" }, // تركواز ثانوي
          error: { main: "#ff4d4f" },
          success: { main: "#4caf50" },
          warning: { main: "#ffdf5d" },
          info: { main: "#29b6f6" },
          background: {
            default: "#f5ebe0",
            paper: "#fffaf3",
          },
          text: { primary: "#112127ff", secondary: "#6b3d1cff" },
          brand: {
            white: "#ffffff",
            orange: "#ff8c42",
            yellow: "#ffdf5d",
            turquoise: "#00cfc1",
          },
          gradient: {
            primary: "linear-gradient(135deg, #ffb56b, #ff8c42)",
            secondary: "linear-gradient(135deg, #6df3e8, #00cfc1)",
            tertiary: "linear-gradient(135deg, #ffffff, #00cfc1, #ffdf5d)",
          },
        }
      : {
          primary: { main: "#ffb56b", light: "#ffd18f", dark: "#c35e00" },
          secondary: { main: "#6df3e8", light: "#a7fbf9", dark: "#009e91" },
          error: { main: "#ff4d4f" },
          success: { main: "#81c784" },
          warning: { main: "#ffdf5d" },
          info: { main: "#4fc3f7" },
          background: {
            default: "#1b1b1b",
            paper: "#1f2d2e",
          },
          text: { primary: "#f3f4f6", secondary: "#cbd5e1" },
          brand: {
            white: "#f8f9fa",
            orange: "#ffd18f",
            yellow: "#ffea91",
            turquoise: "#a7fbf9",
          },
          gradient: {
            primary: "linear-gradient(135deg, #ff8c42, #ffb56b)",
            secondary: "linear-gradient(135deg, #00cfc1, #6df3e8)",
            tertiary:
              "linear-gradient(135deg, #0f0b0bff, #2e5c5bff, #706538ff)",
          },
        }),
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily:
      "Inter, Tajawal, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans‑serif",
    h1: { fontWeight: 800, letterSpacing: -0.5, fontSize: 50 },
    h2: { fontWeight: 700, letterSpacing: -0.3, fontSize: 40 },
    h3: { fontWeight: 700, fontSize: 45 },
    h4: { fontWeight: 700, fontSize: 40 },
    h5: { fontWeight: 600, fontSize: 30 },
    h6: { fontWeight: 600, fontSize: 20 },
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

  theme = createTheme(theme, {
    animations: {
      fadeInUp: `${fadeInUp} 0.6s ${theme.transitions.easing.easeOut}`,
      softFloat: `${softFloat} 3.2s ease‑in‑out infinite`,
    },

    components: {
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
              theme.palette.mode === "light" ? "#e0e0e0" : "#4a4a4a",
            borderRadius: 999,
            border:
              theme.palette.mode === "light"
                ? "2px solid #ffffff"
                : "2px solid #1b1b1b",
          },
          "*::-webkit-scrollbar-track": {
            background: theme.palette.mode === "light" ? "#f5f5f5" : "#141414",
          },
        },
      },

      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.background.default,
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
                  ? "0 8px 22px rgba(255,140,66,0.18)"
                  : "0 8px 22px rgba(255,181,107,0.25)",
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

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            transition: theme.transitions.create("background-color"),
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 12,
            borderRadius: 8,
            backdropFilter: "blur(2px)",
            background:
              theme.palette.mode === "light" ? "#112327ff" : "#e9e5ebff",
            color: theme.palette.mode === "light" ? "#faf9fbff" : "#112127ff",
          },
        },
      },

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

      MuiSkeleton: {
        styleOverrides: {
          root: { animation: `${softFloat} 3.2s ease‑in‑out infinite` },
        },
      },

      MuiDateCalendar: {
        styleOverrides: {
          root: {
            color: theme.palette.primary.main,
            borderRadius: "14px",
            borderWidth: "1px",
            borderColor: theme.palette.primary.dark,
            border: "1px solid",
            backgroundColor: theme.palette.background.paper,
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
