import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { RoomAvailabilityResultDto } from "../../../api/Api";
export function useRoom(hotelId: number) {
  const [data, setData] = useState<RoomAvailabilityResultDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setError(null);

    try {
      const res = await apiClient.api.hotelsRoomsList(hotelId, {
        checkInDate: "2042-11-30",
        checkOutDate: "2088-11-18",
      });

      setData(res.data ?? []);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error("Failed to load rooms:", err);
      setError("Failed to load rooms");
      setStatus(STATUS.ERROR);
    }
  }, [hotelId]);

  useEffect(() => {
    if (hotelId) {
      fetchRooms();
    }
  }, [fetchRooms, hotelId]);

  return { data, status, error, refetch: fetchRooms };
}
