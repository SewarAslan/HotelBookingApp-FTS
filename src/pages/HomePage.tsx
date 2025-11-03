import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeToggleButton } from "../components/ThemeToggleButton";
import CarouselSection from "../features/home/components/CaruselSection";
import { useFeaturedDeals } from "../features/home/hooks/useFeaturedDeals";
import FeaturedDealCard from "../features/home/components/FeaturedDealCard";
import { useRecentHotels } from "../features/home/hooks/useRecentHotels";
import RecentHotelCard from "../features/home/components/RecentHotelCard";

export default function HomePage() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={700}>
          Smart Stays 🌸
        </Typography>
        <ThemeToggleButton />
      </Toolbar>

      <CarouselSection
        sectionTitle="Featured Deals"
        useDataHook={useFeaturedDeals}
        CardComponent={({ data }) => <FeaturedDealCard deal={data} />}
        getKey={(deal) => deal.hotelId}
      />
      <CarouselSection
        sectionTitle="Recent Visited"
        useDataHook={useRecentHotels}
        CardComponent={({ data }) => <RecentHotelCard hotel={data} />}
        getKey={(hotel) => hotel.hotelId}
      />
    </AppBar>
  );
}
