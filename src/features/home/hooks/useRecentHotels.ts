import { useEffect, useState } from "react";
import type { RecentHotelResultDto } from "../../../api/HotelBookingApi";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";

export function useRecentHotels() {
  const [data, setData] = useState<RecentHotelResultDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<null | string>(null);

  async function fetchRecentHotels() {
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      const response = await apiClient.api.homeUsersRecentHotelsList(1);

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
