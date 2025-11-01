import React from "react";
import type { FeaturedDealDto } from "../../../api/HotelBookingApi";
import { PLACEHOLDERS } from "../../../constants/placeHolders";

interface FeaturedDealCardProps {
  deal: FeaturedDealDto;
}

const FeaturedDealCard = React.memo(({ deal }: FeaturedDealCardProps) => {
  const {
    roomPhotoUrl,
    hotelName,
    cityName,
    hotelStarRating,
    originalRoomPrice,
    discount,
    finalPrice,
    title,
    description,
  } = deal;

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
          src={roomPhotoUrl || PLACEHOLDERS.ROOM}
          alt={hotelName ? `${hotelName} room photo` : "Hotel room"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {discount && discount != null && discount > 0 && (
          <span
            className="
              absolute top-2 left-2 bg-violet-500 text-white text-[10px]
              px-1.5 py-0.5 rounded-full font-medium shadow-sm
            "
          >
            -{discount * 100}%
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-3 gap-1.5 text-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-gray-800 truncate">
            {hotelName || "Unknown Hotel"}
          </h3>
          {cityName && <p className="text-xs text-gray-500">{cityName}</p>}
        </div>

        {hotelStarRating && (
          <div
            className="text-yellow-400 text-xs"
            aria-label={`Hotel rating: ${hotelStarRating} out of 5`}
          >
            {"★".repeat(Math.floor(hotelStarRating))}
            {"☆".repeat(5 - Math.floor(hotelStarRating))}
          </div>
        )}

        <div className="flex items-center gap-1 text-xs mt-0.5">
          {originalRoomPrice && (
            <span className="line-through text-gray-400">
              ${originalRoomPrice}
            </span>
          )}
          {finalPrice && finalPrice != null && (
            <span className="text-violet-600 font-semibold">${finalPrice}</span>
          )}
        </div>

        {title && (
          <p className="text-violet-700 text-xs font-medium mt-1">{title}</p>
        )}
        {description && (
          <p className="text-[11px] text-gray-500 line-clamp-2 leading-snug">
            {description}
          </p>
        )}
      </div>
    </div>
  );
});

FeaturedDealCard.displayName = "FeaturedDealCard";
export default FeaturedDealCard;
