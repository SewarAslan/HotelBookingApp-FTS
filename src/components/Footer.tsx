import { Box, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        fontSize: "0.875rem",
      }}
    >
      © {new Date().getFullYear()} Smart Stays — All rights reserved.
    </Box>
  );
}
