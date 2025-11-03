import { useCallback, useEffect, useMemo, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { Destination } from "../../../api/HotelBookingApi";

export function useTrendingDestinations() {
  const [data, setData] = useState<Destination[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<null | string>(null);

  const fetchDestinations = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      const response = await apiClient.api.homeDestinationsTrendingList();

      setData(response.data);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setStatus(STATUS.ERROR);
      setError("something went wrong!");
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);
  return useMemo(
    () => ({ data, status, error, refetch: fetchDestinations }),
    [data, status, error, fetchDestinations]
  );
}
