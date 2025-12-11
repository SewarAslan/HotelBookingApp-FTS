import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { PhotoDto } from "../../../api/Api";
import type { HookResult } from "../../../types/hooksResult";

export function useHotelGallery(id: number): HookResult<PhotoDto> {
  const [data, setData] = useState<PhotoDto[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = useCallback(async () => {
    if (!id) return;

    setStatus(STATUS.LOADING);
    setError(null);

    try {
      const res = await apiClient.api.hotelsGalleryList(id);

      const raw = (res.data ?? []) as string[];

      const mapped = raw.map((url, index) => ({
        id: index + 1,
        url,
      }));

      setData(mapped);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to load hotel gallery");
      setStatus(STATUS.ERROR);
    }
  }, [id]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  return { data, status, error, refetch: fetchGallery };
}
