import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { FeaturedDealDto } from "../../../api/HotelBookingApi";

export function useFeaturedDeals() {
  const [data, setData] = useState<FeaturedDealDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<null | string>(null);

  const fetchDeals = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      const response = await apiClient.api.homeFeaturedDealsList();

      setData(response.data);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setStatus(STATUS.ERROR);
      setError("something went wrong!");
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);
  return { data, status, error, refetch: fetchDeals };
}
