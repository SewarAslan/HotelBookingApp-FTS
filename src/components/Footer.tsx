import { Box, Typography, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 2,
        backdropFilter: "blur(10px) saturate(160%)",
        WebkitBackdropFilter: "blur(10px) saturate(160%)",
        backgroundColor: theme.palette.customBackgrounds.glass,
        borderTop: "1px solid rgba(255, 255, 255, 0.11)",
        color: theme.palette.text.secondary,
        fontSize: "0.875rem",
        boxShadow:
          theme.palette.mode === "light"
            ? "0 -4px 20px rgba(0,0,0,0.04)"
            : "0 -4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <Typography
        color={theme.palette.secondary.dark}
        sx={{
          fontWeight: 600,
        }}
      >
        © {new Date().getFullYear()} Smart Stays — All rights reserved.
      </Typography>
    </Box>
  );
}
