import { useCallback, useEffect, useMemo, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { SearchResultDto } from "../../../api/HotelBookingApi";
import type { HookResult } from "../../../types/hooksResult";
import { useLocation } from "react-router-dom";
import { parseSearchParams } from "../../../utils/url";

export function useSearchResults(): HookResult<SearchResultDto> {
  const [data, setData] = useState<SearchResultDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const params = useMemo(
    () => parseSearchParams(location.search),
    [location.search]
  );

  const fetchSearchResults = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      const response = await apiClient.api.homeSearchList(params);
      setData(response.data);
      setStatus(STATUS.SUCCESS);
    } catch {
      setStatus(STATUS.ERROR);
      setError("Something went wrong!");
    }
  }, [params]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  return { data, status, error, refetch: fetchSearchResults };
}
