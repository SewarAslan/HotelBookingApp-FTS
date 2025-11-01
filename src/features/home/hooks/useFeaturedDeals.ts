import { useEffect, useState } from "react";
import { STATUS } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { FeaturedDealDto } from "../../../api/HotelBookingApi";

export function useFeaturedDeals() {
  const [data, setData] = useState<FeaturedDealDto[] | null>(null);
  const [status, setStatus] = useState<string>(STATUS.IDLE);
  const [error, setError] = useState<null | string>(null);

  async function fetchDeals() {
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      const response = await apiClient.api.homeFeaturedDealsList();

      setData(
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data
      );
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setStatus(STATUS.ERROR);
      setError("something went wrong!");
      console.log(error);
    }
  }
  useEffect(() => {
    fetchDeals();
  }, []);
  return { data, status, error, refetch: fetchDeals };
}
