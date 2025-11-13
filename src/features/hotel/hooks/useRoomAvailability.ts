import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { RoomAvailabilityResultDto } from "../../../api/HotelBookingApi";
import type { HookResult } from "../../../types/hooksResult";

export function useRoomAvailability(
  id: number,
  checkInDate?: string,
  checkOutDate?: string
): HookResult<RoomAvailabilityResultDto> {
  const [data, setData] = useState<RoomAvailabilityResultDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    if (!id) return;
    setStatus(STATUS.LOADING);
    setError(null);

    try {
      const res = (await apiClient.api.hotelsAvailableRoomsList(id, {
        checkInDate,
        CheckOutDate: checkOutDate,
      })) as unknown as { data: RoomAvailabilityResultDto[] };
      setData(res.data);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to load available rooms");
      setStatus(STATUS.ERROR);
    }
  }, [id, checkInDate, checkOutDate]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return { data, status, error, refetch: fetchRooms };
}
