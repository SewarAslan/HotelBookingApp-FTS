import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeToggleButton } from "../components/ThemeToggleButton";
import FeaturedDealsSection from "../features/home/components/FeaturedDealsSection";
import RecentHotelsSection from "../features/home/components/RecentHotelsSection";

export default function HomePage() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={700}>
          Smart Stays 🌸
        </Typography>
        <ThemeToggleButton />
      </Toolbar>

      <FeaturedDealsSection />
      <RecentHotelsSection />
    </AppBar>
  );
}
