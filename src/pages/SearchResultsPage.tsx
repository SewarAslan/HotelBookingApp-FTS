import React from "react";
import { Box, useTheme, Container } from "@mui/material";
import { FiltersSidebar, SortMenu } from "../features/search/components";
import ResultsList from "../features/search/components/ResultsList";
import { MUI_BREAKPOINTS } from "../constants/muiTokens";

export default function SearchResultsPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        background: theme.palette.background.default,
        animation: theme.animations.fadeInUp,
      }}
    >
      <Box
        component="aside"
        sx={{
          width: { xs: "100%", md: 260 },
          borderRight: {
            md: `1px solid ${theme.palette.divider}`,
          },
          borderBottom: {
            xs: `1px solid ${theme.palette.divider}`,
            md: "none",
          },
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <FiltersSidebar />
      </Box>

      <Container
        maxWidth={MUI_BREAKPOINTS.XL}
        sx={{
          flexGrow: 1,
          py: 3,
          px: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SortMenu />
        <ResultsList />
      </Container>
    </Box>
  );
}
