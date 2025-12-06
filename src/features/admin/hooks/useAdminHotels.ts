import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { requestJson } from "../../../api/adminApi";

interface AdminHotelRaw {
  id: number;
  hotelName?: string;
  name?: string;
  description: string;
  hotelType: string;
  starRating: number;
  latitude?: number;
  longitude?: number;
  location?: string;
  imageUrl?: string;
  cityId?: number;
}

export interface AdminHotel {
  id: number;
  name: string;
  description: string;
  hotelType: string;
  starRating: number;
  latitude?: number;
  longitude?: number;
  location?: string;
  imageUrl?: string;
  cityId?: number;
}

export interface HotelPayload {
  name: string;
  description: string;
  hotelType: string;
  starRating: number;
  latitude?: number;
  longitude?: number;
  location?: string;
  imageUrl?: string;
  cityId?: number;
}

const PAGE_SIZE = 10;

export function useAdminHotels() {
  const [data, setData] = useState<AdminHotel[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchHotels = useCallback(async () => {
    try {
      setStatus(STATUS.LOADING);
      setError(null);

      const hotelsRaw = await requestJson<AdminHotelRaw[]>("/hotels");

      const hotels: AdminHotel[] = hotelsRaw.map((h) => ({
        id: h.id,
        name: h.hotelName ?? h.name ?? "",
        description: h.description ?? "",
        hotelType: h.hotelType ?? "",
        starRating: h.starRating ?? 0,
        latitude: h.latitude,
        longitude: h.longitude,
        location: h.location,
        imageUrl: h.imageUrl,
        cityId: h.cityId,
      }));

      const filtered = search
        ? hotels.filter((h) => {
            const q = search.toLowerCase();
            return (
              h.name.toLowerCase().includes(q) ||
              h.description.toLowerCase().includes(q) ||
              (h.location?.toLowerCase().includes(q) ?? false)
            );
          })
        : hotels;

      const start = (page - 1) * PAGE_SIZE;
      const paginated = filtered.slice(start, start + PAGE_SIZE);

      setData(paginated);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error("Failed to load hotels:", err);
      setError("Failed to load hotels");
      setStatus(STATUS.ERROR);
    }
  }, [search, page]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const createHotel = async (payload: HotelPayload) => {
    try {
      await requestJson("/hotels", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      await fetchHotels();
      return { success: true };
    } catch (err) {
      console.error("Create hotel failed:", err);
      return { success: false, error: "Failed to create hotel" };
    }
  };

  const updateHotel = async (id: number, payload: HotelPayload) => {
    try {
      await requestJson(`/hotels/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      await fetchHotels();
      return { success: true };
    } catch (err) {
      console.error("Update hotel failed:", err);
      return { success: false, error: "Failed to update hotel" };
    }
  };

  const deleteHotel = async (id: number) => {
    try {
      await requestJson(`/hotels/${id}`, {
        method: "DELETE",
      });

      await fetchHotels();
      return { success: true };
    } catch (err) {
      console.error("Delete hotel failed:", err);
      return { success: false, error: "Failed to delete hotel" };
    }
  };

  return {
    data,
    status,
    error,
    refetch: fetchHotels,

    search,
    setSearch,

    page,
    setPage,
    pageSize: PAGE_SIZE,

    createHotel,
    updateHotel,
    deleteHotel,
  };
}
