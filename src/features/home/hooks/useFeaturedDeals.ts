import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { FeaturedDealDto } from "../../../api/Api";
import type { HookResult } from "../../../types/hooksResult";

export function useFeaturedDeals(): HookResult<FeaturedDealDto> {
  const [data, setData] = useState<FeaturedDealDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const fetchDeals = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      const response = await apiClient.api.homeFeaturedDealsList();
      setData(response.data);
      setStatus(STATUS.SUCCESS);
    } catch {
      setStatus(STATUS.ERROR);
      setError("Something went wrong!");
    }
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  return { data, status, error, refetch: fetchDeals };
}
