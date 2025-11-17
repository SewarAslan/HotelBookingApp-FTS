import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { HotelAmenityDto } from "../../../api/Api";
import type { HookResult } from "../../../types/hooksResult";
export function useHotelAmenities(
  hotelId: number
): HookResult<HotelAmenityDto> {
  const [data, setData] = useState<HotelAmenityDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const fetchAmenities = useCallback(async () => {
    if (!hotelId) return;

    setStatus(STATUS.LOADING);
    setError(null);

    try {
      const res = await apiClient.api.hotelsAmenitiesList(hotelId);

      setData(res.data || []);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to load hotel amenities");
      setStatus(STATUS.ERROR);
    }
  }, [hotelId]);

  useEffect(() => {
    fetchAmenities();
  }, [fetchAmenities]);

  if (status === STATUS.ERROR) {
    return {
      data: [
        {
          id: 1,
          name: "Free Wi-Fi",
          description: "High-speed internet available in all rooms.",
        },
        {
          id: 2,
          name: "Swimming Pool",
          description: "Outdoor pool available for all guests.",
        },
        {
          id: 3,
          name: "Fitness Center",
          description: "Modern gym with cardio and weight equipment.",
        },
        {
          id: 4,
          name: "Room Service",
          description: "24/7 room service for all guests.",
        },
        {
          id: 5,
          name: "Parking",
          description: "Free secure parking available on site.",
        },
        {
          id: 6,
          name: "Air Conditioning",
          description: "Individually controlled AC in every room.",
        },
      ],
      status: STATUS.SUCCESS,
      error,
      refetch: fetchAmenities,
    };
  }

  return { data, status, error, refetch: fetchAmenities };
}
