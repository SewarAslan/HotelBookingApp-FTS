import { useCallback, useEffect, useState } from "react";
import type { HotelDto } from "../../../api/Api";
import type { HotelResult } from "../../../types/hooksResult";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";

export function useHotelDetails(id: number): HotelResult<HotelDto> {
  const [data, setData] = useState<HotelDto | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const fetchHotel = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      const res = await apiClient.api.getHotel(id, {
        includeRooms: false,
      });

      console.log("hotel details response:", res);
      setData(res.data ?? null);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.log("hotel fetch error:", err);
      setError("Failed to load hotel details");
      setStatus(STATUS.ERROR);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchHotel();
  }, [id, fetchHotel]);

  return { data, status, error, refetch: fetchHotel };
}
