import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";

const ADMIN_BASE_URL =
  import.meta.env.VITE_ADMIN_API_URL ?? "http://localhost:5000";

export interface AdminHotel {
  id: number;
  hotelName?: string;
  name?: string;
  description?: string;
  hotelType?: string;
  starRating?: number;
  location?: string;
}


export interface HotelPayload {
  hotelName: string;
  name?: string;
  description?: string;
  hotelType?: string;
  starRating?: number;
  location?: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

export function useAdminHotels() {
  const [data, setData] = useState<AdminHotel[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchHotels = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setError(null);

    try {
      const params = new URLSearchParams({
        searchQuery: search,
        pageNumber: String(page),
        pageSize: String(pageSize),
      });

      const res = await fetch(
        `${ADMIN_BASE_URL}/api/hotels?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error(`Failed to load hotels. Status: ${res.status}`);
      }

      const json: AdminHotel[] = await res.json();
      setData(json);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error("Failed to load hotels:", err);
      setError("Failed to load hotels");
      setStatus(STATUS.ERROR);
    }
  }, [search, page, pageSize]);

  useEffect(() => {
    void fetchHotels();
  }, [fetchHotels]);

  async function createHotel(payload: HotelPayload): Promise<ActionResult> {
    try {
      const res = await fetch(`${ADMIN_BASE_URL}/api/hotels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Create failed. Status: ${res.status}`);
      }

      await fetchHotels();
      return { success: true };
    } catch (err) {
      console.error("Create hotel failed:", err);
      return { success: false, error: "Failed to create hotel" };
    }
  }

  async function updateHotel(
    id: number,
    payload: HotelPayload
  ): Promise<ActionResult> {
    try {
      const res = await fetch(`${ADMIN_BASE_URL}/api/hotels/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Update failed. Status: ${res.status}`);
      }

      await fetchHotels();
      return { success: true };
    } catch (err) {
      console.error("Update hotel failed:", err);
      return { success: false, error: "Failed to update hotel" };
    }
  }

  async function deleteHotel(id: number): Promise<ActionResult> {
    try {
      const res = await fetch(`${ADMIN_BASE_URL}/api/hotels/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Delete failed. Status: ${res.status}`);
      }

      await fetchHotels();
      return { success: true };
    } catch (err) {
      console.error("Delete hotel failed:", err);
      return { success: false, error: "Failed to delete hotel" };
    }
  }

  return {
    data,
    status,
    error,
    refetch: fetchHotels,
    search,
    setSearch,
    page,
    setPage,
    createHotel,
    updateHotel,
    deleteHotel,
  };
}
