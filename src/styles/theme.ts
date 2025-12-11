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
    customBackgrounds: {
      gradient: string;
      glass: string;
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
    customBackgrounds?: {
      gradient?: string;
      glass?: string;
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
          primary: {
            main: "#ff944d",
            light: "#ffbb85",
            dark: "#c8641e",
          },
          secondary: {
            main: "#1dbbb4",
            light: "#a6eae8",
            dark: "#0f7d79",
          },

          error: { main: "#ff4d4f" },
          success: { main: "#4caf50" },
          warning: { main: "#ffdf5d" },
          info: { main: "#29b6f6" },
          background: {
            default: "#f5ebe0",
            paper: "#fffaf3ff",
          },
          text: { primary: "#112127ff", secondary: "#6b3d1cff" },
          brand: {
            turquoise: "#1dbbb4",
            orange: "#ff944d",
            yellow: "#ffdf5d",
            white: "#ffffff",
          },
          gradient: {
            secondary: "linear-gradient(135deg, #a6eae8, #1dbbb4)",
            primary: "linear-gradient(135deg, #ffbb85, #ff944d)",
            tertiary: "linear-gradient(135deg, #ffffff, #1dbbb4, #ffdf5d)",
          },
          customBackgrounds: {
            gradient: "linear-gradient(135deg, #a8edea 0%, #fed6a3 100%)",
            glass: "rgba(255, 255, 255, 0.65)",
          },
        }
      : {
          primary: {
            main: "#dfa871",
            light: "#ffd1a6",
            dark: "#c8641e",
          },
          secondary: {
            main: "#57fff1ff",
            light: "#a6eae8",
            dark: "#009c94ff",
          },
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
            turquoise: "#6df3e8",
            orange: "#ffd1a6",
            yellow: "#ffea91",
            white: "#f8f9fa",
          },
          gradient: {
            secondary: "linear-gradient(135deg, #1dbbb4, #a6eae8)",
            primary: "linear-gradient(135deg, #c8641e, #ffd1a6)",
            tertiary: "linear-gradient(135deg, #0f0b0b, #2e5c5b, #706538)",
          },
          customBackgrounds: {
            gradient: "linear-gradient(135deg, #1b1b1b 0%, #141817 100%)",
            glass: "rgba(60, 60, 60, 0.35)",
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
                  ? "0 8px 22px rgba(122, 122, 122, 0.18)"
                  : "0 8px 22px rgba(18, 18, 18, 0.25)",
            },
            "&:active": { transform: "translateY(0)" },
          },
        },
        variants: [
          {
            props: { variant: "gradient-primary" as unknown },
            style: {
              background: theme.palette.primary.main,
              color: "#ffffffff",
              "&:hover": {
                background: theme.palette.primary.dark,
              },
            },
          },
          {
            props: { variant: "gradient-secondary" as unknown },
            style: {
              background: theme.palette.secondary.main,
              color: theme.palette.mode === "light" ? "#ffffffff" : "#122524ff",
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: "white",
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
    },
  });

  return responsiveFontSizes(theme);
};
export const lightTheme = createAppTheme("light");
export const darkTheme = createAppTheme("dark");
