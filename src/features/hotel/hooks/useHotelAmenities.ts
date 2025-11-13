import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { HotelAmenityDto } from "../../../api/HotelBookingApi";
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
      const res = (await apiClient.api.hotelsAmenitiesList(
        hotelId
      )) as unknown as {
        data: HotelAmenityDto[];
      };

      setData(res.data);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to load hotel amenities");
      setStatus(STATUS.ERROR);
    }
  }, [hotelId]);

  useEffect(() => {
    if (hotelId) fetchAmenities();
  }, [fetchAmenities, hotelId]);

  return { data, status, error, refetch: fetchAmenities };
}
