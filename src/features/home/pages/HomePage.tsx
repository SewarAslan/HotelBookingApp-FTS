import {
  CarouselSection,
  FeaturedDealCard,
  FlexSection,
  RecentHotelCard,
} from "../components";
import SearchSection from "../components/SearchSection";
import DestinationCard from "../components/TrendingDestinationsCard";
import {
  useFeaturedDeals,
  useRecentHotels,
  useTrendingDestinations,
} from "../hooks";

export default function HomePage() {
  return (
    <>
      <SearchSection />

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
      <FlexSection
        sectionTitle="Trending Destinations"
        useDataHook={useTrendingDestinations}
        CardComponent={({ data }) => <DestinationCard destination={data} />}
        getKey={(dest) => dest.cityId}
      />
    </>
  );
}
