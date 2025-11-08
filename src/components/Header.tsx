import { Box, Typography, useTheme } from "@mui/material";
import { ThemeToggleButton } from "./ThemeToggleButton";

export default function Header() {
  const theme = useTheme();
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 4 },
        py: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper,
        position: "sticky",
        top: 0,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          background: theme.palette.gradient.primary,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Smart Stays
      </Typography>

      <ThemeToggleButton />
    </Box>
  );
}
