import { Box, Container } from "@mui/material";
import {
  FiltersSidebar,
  SearchBar,
  SortMenu,
} from "../features/search/components";
import ResultsList from "../features/search/components/ResultsList";
import { MUI_BREAKPOINTS } from "../constants/muiTokens";

export default function SearchResultsPage() {
  return (
    <Box sx={{ background: "transparent", minHeight: "100vh" }}>
      <Container maxWidth={MUI_BREAKPOINTS.XL}>
        <SearchBar />
      </Container>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          component="aside"
          sx={{
            width: { xs: "100%", md: 260 },
            backgroundColor: "transparent",
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
    </Box>
  );
}
