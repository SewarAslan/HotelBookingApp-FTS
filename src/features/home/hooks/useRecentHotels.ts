import { useEffect, useState } from "react";
import type { RecentHotelResultDto } from "../../../api/HotelBookingApi";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import { STORAGE_KEYS } from "../../../constants/storageKeys";
import { useAuth } from "../../auth/hooks/useAuth";
export function useRecentHotels() {
  const [data, setData] = useState<RecentHotelResultDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<null | string>(null);
  const { state } = useAuth();

  async function fetchRecentHotels() {
    const userString = sessionStorage.getItem(STORAGE_KEYS.AUTH_USER);
    const authUser = userString ? JSON.parse(userString) : null;
    const userId = authUser?.userId;
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      if (!state.isAuthenticated || !userId) return;
      const response = await apiClient.api.homeUsersRecentHotelsList(userId);

      setData(response.data);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setStatus(STATUS.ERROR);
      setError("something went wrong!");
      console.log(error);
    }
  }
  useEffect(() => {
    fetchRecentHotels();
  }, []);
  return { data, status, error, refetch: fetchRecentHotels };
}
