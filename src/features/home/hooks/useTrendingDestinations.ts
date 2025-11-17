import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { Destination } from "../../../api/Api";
import type { HookResult } from "../../../types/hooksResult";

export function useTrendingDestinations(): HookResult<Destination> {
  const [data, setData] = useState<Destination[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const fetchDestinations = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      const response = await apiClient.api.homeDestinationsTrendingList();
      setData(response.data);
      setStatus(STATUS.SUCCESS);
    } catch {
      setStatus(STATUS.ERROR);
      setError("Something went wrong!");
    }
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  return { data, status, error, refetch: fetchDestinations };
}
