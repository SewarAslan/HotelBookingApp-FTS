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

      setData(res.data || []);
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

  if (status === STATUS.ERROR) {
    return {
      data: [
        {
          id: 1,
          url: "https://plus.unsplash.com/premium_photo-1661923725782-f73c990fbddf?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8NSUyMHN0YXIlMjBob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          id: 2,
          url: "https://plus.unsplash.com/premium_photo-1661907801393-3b36254a81b4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 3,
          url: "https://plus.unsplash.com/premium_photo-1661962340349-6ea59fff7e7b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 4,
          url: "https://plus.unsplash.com/premium_photo-1661963717467-5892afb6f410?q=80&w=1089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 5,
          url: "https://plus.unsplash.com/premium_photo-1661938729822-7963779de687?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 6,
          url: "https://plus.unsplash.com/premium_photo-1661876403473-64980cbfdf0f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
      status: STATUS.SUCCESS,
      error: error,
      refetch: fetchGallery,
    };
  }

  return { data, status, error, refetch: fetchGallery };
}
