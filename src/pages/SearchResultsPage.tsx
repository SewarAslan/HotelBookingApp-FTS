import { Box, Container, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { parseSearchParams } from "../utils/url";

import { FiltersSidebar, ResultsList } from "../features/search/components";

export default function SearchResultsPage() {
  const theme = useTheme();
  const location = useLocation();
  const searchParams = parseSearchParams(location.search);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        gap: 3,
        py: 4,
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{
          flexBasis: { xs: "100%", md: "25%" },
          background: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 4px 20px rgba(0,0,0,0.05)"
              : "0 4px 20px rgba(0,0,0,0.25)",
          p: 2,
          height: "fit-content",
        }}
      >
        <FiltersSidebar params={searchParams} />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <ResultsList params={searchParams} />
      </Box>
    </Container>
  );
}
