import React, { useRef } from "react";
import { useRecentHotels } from "../hooks/useRecentHotels";
import { STATUS } from "../../../constants/status";
import MessageCard from "../../../components/MessageCard";
import RecentHotelCard from "../components/RecentHotelCard";

const RecentHotelsSection = () => {
  const { data, status, error, refetch } = useRecentHotels();
  const carouselRef = useRef<HTMLDivElement>(null);

  const shouldRenderList =
    status === STATUS.SUCCESS && Array.isArray(data) && data.length > 0;

  const scroll = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;

    const cardWidth = container.firstElementChild?.clientWidth || 300;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      className="relative px-4 py-6 sm:px-8 lg:px-12 w-full mt-8"
      aria-busy={status === STATUS.LOADING}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-violet-800 mb-4">
        Recently Visited
      </h2>

      <MessageCard
        status={status}
        error={error}
        data={data}
        message="Loading recent hotels..."
        onRetry={refetch}
      />

      {shouldRenderList && (
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="
              absolute left-0 top-1/2 -translate-y-1/2 z-10
              bg-white/80 hover:bg-white shadow-md rounded-full p-2
              text-violet-700 hover:text-violet-900 transition-all
              hidden sm:flex
            "
            aria-label="Scroll left"
          >
            ‹
          </button>

          <div
            ref={carouselRef}
            className="
              flex gap-4 overflow-x-auto scroll-smooth pb-3
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
            "
          >
            {data.map((hotel, index) => (
              <div key={hotel.hotelId ?? index} className="flex-shrink-0">
                <RecentHotelCard hotel={hotel} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="
              absolute right-0 top-1/2 -translate-y-1/2 z-10
              bg-white/80 hover:bg-white shadow-md rounded-full p-2
              text-violet-700 hover:text-violet-900 transition-all
              hidden sm:flex
            "
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default RecentHotelsSection;
