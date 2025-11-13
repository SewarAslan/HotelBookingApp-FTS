import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { ReviewDto } from "../../../api/HotelBookingApi";
import type { HookResult } from "../../../types/hooksResult";

export function useReviews(id: number): HookResult<ReviewDto> {
  const [data, setData] = useState<ReviewDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    if (!id) return;
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      const res = (await apiClient.api.hotelsReviewsList(id)) as unknown as {
        data: ReviewDto[];
      };
      setData(res.data);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to load reviews");
      setStatus(STATUS.ERROR);
    }
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { data, status, error, refetch: fetchReviews };
}
