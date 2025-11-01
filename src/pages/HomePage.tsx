import FeaturedDealsSection from "../features/home/components/FeaturedDealsSection";
import RecentHotelCard from "../features/home/components/RecentHotelCard";

export default function HomePage() {
  return (
    <div>
      <FeaturedDealsSection />
      <RecentHotelCard
        hotel={{
          hotelId: 1,
          hotelName: "Grand Plaza",
          starRating: 4,
          visitDate: "2025-08-02",
          cityName: "Ramallah",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
          priceLowerBound: 120,
          priceUpperBound: 160,
        }}
      />
    </div>
  );
}
