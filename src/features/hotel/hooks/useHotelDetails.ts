import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { HotelDto } from "../../../api/HotelBookingApi";
import type { HotelResult } from "../../../types/hooksResult";

export function useHotelDetails(id: number): HotelResult<HotelDto> {
  const [data, setData] = useState<HotelDto | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const fetchHotel = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      const res = (await apiClient.api.getHotel(id, {
        includeRooms: false,
      })) as unknown as {
        data: HotelDto;
      };

      setData(res.data);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      setError("Failed to load hotel details");
      setStatus(STATUS.ERROR);
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchHotel();
  }, [fetchHotel, id]);

  return { data, status, error, refetch: fetchHotel };
}
