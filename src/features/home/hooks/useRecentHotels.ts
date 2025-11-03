import { useCallback, useEffect, useState } from "react";
import type { RecentHotelResultDto } from "../../../api/HotelBookingApi";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
export function useRecentHotels() {
  const [data, setData] = useState<RecentHotelResultDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<null | string>(null);
  const { isAuthenticated, AuthUser } = useSelector(
    (state: RootState) => state.auth
  );

  const fetchRecentHotels = useCallback(async () => {
    const userId = AuthUser?.userId || Number(Cookies.get("userId"));

    setStatus(STATUS.LOADING);
    setError(null);
    try {
      if (!isAuthenticated || !userId) return;
      const response = await apiClient.api.homeUsersRecentHotelsList(userId);

      setData(response.data);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setStatus(STATUS.ERROR);
      setError("something went wrong!");
      console.log(error);
    }
  }, [AuthUser?.userId, isAuthenticated]);
  useEffect(() => {
    if (isAuthenticated) fetchRecentHotels();
  }, [fetchRecentHotels, isAuthenticated]);
  return { data, status, error, refetch: fetchRecentHotels };
}
