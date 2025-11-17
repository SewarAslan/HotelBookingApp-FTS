import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { RoomAvailabilityResultDto } from "../../../api/Api";

export function useRoomAvailability(
  hotelId: number,
  checkInDate: string,
  checkOutDate: string
) {
  const [data, setData] = useState<RoomAvailabilityResultDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setError(null);

    try {
      const res = await apiClient.api.hotelsAvailableRoomsList(hotelId, {
        checkInDate,
        CheckOutDate: checkOutDate,
      });

      setData(res.data ?? []);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error("Failed to load rooms:", err);
      setError("Failed to load rooms");
      setStatus(STATUS.ERROR);
    }
  }, [hotelId, checkInDate, checkOutDate]);

  useEffect(() => {
    if (hotelId && checkInDate && checkOutDate) {
      fetchRooms();
    }
  }, [fetchRooms, hotelId, checkInDate, checkOutDate]);

  return { data, status, error, refetch: fetchRooms };
}
