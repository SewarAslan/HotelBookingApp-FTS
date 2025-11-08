import { useCallback, useEffect, useState } from "react";
import type { RecentHotelResultDto } from "../../../api/HotelBookingApi";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";

import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { HookResult } from "../../../types/hooksResult";

export function useRecentHotels(): HookResult<RecentHotelResultDto> {
  const [data, setData] = useState<RecentHotelResultDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, authUser } = useSelector(
    (state: RootState) => state.auth
  );

  const fetchRecentHotels = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      if (!isAuthenticated || !authUser?.userId) return;
      const response = await apiClient.api.homeUsersRecentHotelsList(
        authUser.userId
      );
      setData(response.data);
      setStatus(STATUS.SUCCESS);
    } catch {
      setStatus(STATUS.ERROR);
      setError("Something went wrong!");
    }
  }, [authUser?.userId, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) fetchRecentHotels();
  }, [fetchRecentHotels, isAuthenticated]);

  return { data, status, error, refetch: fetchRecentHotels };
}
