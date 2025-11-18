import { Card, useTheme } from "@mui/material";
import SearchForm from "./SearchForm";

export default function SearchBar() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 2,
        mt: 2,
        mb: 3,
        borderRadius: 3,
        backdropFilter: "blur(10px) saturate(160%)",
        WebkitBackdropFilter: "blur(10px) saturate(160%)",
        backgroundColor: theme.palette.customBackgrounds.glass,
        border: theme.palette.divider,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 8px 24px rgba(0, 0, 0, 0.08)"
            : "0 8px 24px rgba(0, 0, 0, 0.4)",
        animation: theme.animations?.fadeInUp || "fadeInUp 0.6s ease",
      }}
    >
      <SearchForm compact />
    </Card>
  );
}
