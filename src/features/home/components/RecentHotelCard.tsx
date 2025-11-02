import React from "react";
import type { RecentHotelResultDto } from "../../../api/HotelBookingApi";
import { PLACEHOLDERS } from "../../../constants/placeHolders";

interface RecentHotelCardProps {
  hotel: RecentHotelResultDto;
}

const RecentHotelCard = React.memo(({ hotel }: RecentHotelCardProps) => {
  const {
    hotelName,
    starRating,
    visitDate,
    cityName,
    thumbnailUrl,
    priceLowerBound,
    priceUpperBound,
  } = hotel;

  const formattedDate = visitDate
    ? new Date(visitDate).toISOString().split("T")[0]
    : null;

  return (
    <div
      className="
        flex flex-col bg-white rounded-lg overflow-hidden shadow-sm
        hover:shadow-md hover:scale-[1.015] transition-all duration-300
        max-w-xs sm:max-w-sm w-full
      "
    >
      <div className="relative w-full h-36 sm:h-40">
        <img
          src={thumbnailUrl || PLACEHOLDERS.ROOM}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDERS.ROOM;
          }}
          alt={hotelName ? `${hotelName} photo` : "Hotel photo"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/40 to-transparent text-white text-[11px] px-2 py-1 font-medium">
          Recently Visited
        </div>
      </div>

      <div className="flex flex-col p-3 gap-1.5 text-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-gray-800 truncate">
            {hotelName || "Unknown Hotel"}
          </h3>
          {cityName && <p className="text-xs text-gray-500">{cityName}</p>}
        </div>

        {starRating && (
          <div className="text-yellow-400 text-xs">
            {"★".repeat(Math.floor(starRating))}
            {"☆".repeat(5 - Math.floor(starRating))}
          </div>
        )}

        {(priceLowerBound || priceUpperBound) && (
          <p className="text-xs text-violet-600 font-medium">
            From ${priceLowerBound ?? "-"} - ${priceUpperBound ?? "-"}
          </p>
        )}

        {formattedDate && (
          <p className="text-[11px] text-gray-400 italic">
            Visited on {formattedDate}
          </p>
        )}
      </div>
    </div>
  );
});

RecentHotelCard.displayName = "RecentHotelCard";
export default RecentHotelCard;
