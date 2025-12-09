import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { requestJson } from "../../../api/adminApi";

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
  const [data, setData] = useState<AdminHotel[]>([]);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchHotels = useCallback(async () => {
    try {
      setStatus(STATUS.LOADING);
      setError(null);

      // 1) Fetch hotels for specific page
      const hotelsRaw = await requestJson<AdminHotel[]>(
        `/hotels?pageNumber=${page}&pageSize=${PAGE_SIZE}&searchQuery=${search}`
      );

      // 2) Fetch ALL hotels once to compute total count
      const allHotels = await requestJson<AdminHotel[]>(
        "/hotels?pageSize=9999"
      );

      const filteredTotal = search
        ? allHotels.filter((h) =>
            (h.name ?? "").toLowerCase().includes(search.toLowerCase())
          ).length
        : allHotels.length;

      setTotalItems(filteredTotal);
      const cities = await requestJson<{ id: number; name: string }[]>(
        "/cities"
      );

      const hotels = hotelsRaw.map((h) => {
        const cityName = cities.find((c) => c.id === h.cityId)?.name;

        return {
          id: h.id,
          name: h.name ?? "",
          description: h.description ?? "",
          hotelType: h.hotelType ?? "",
          starRating: h.starRating ?? 0,
          latitude: h.latitude,
          longitude: h.longitude,
          imageUrl: h.imageUrl,
          cityId: h.cityId,
          location: cityName,
        };
      });

      setData(hotels);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error("Failed to load hotels:", err);
      setError("Failed to load hotels");
      setStatus(STATUS.ERROR);
    }
  }, [page, search]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  // CRUD
  const createHotel = async (payload: HotelPayload) => {
    try {
      await requestJson("/hotels", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      fetchHotels();
      return { success: true };
    } catch {
      return { success: false, error: "Failed to create hotel" };
    }
  };

  const updateHotel = async (id: number, payload: HotelPayload) => {
    try {
      await requestJson(`/hotels/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      fetchHotels();
      return { success: true };
    } catch {
      return { success: false, error: "Failed to update hotel" };
    }
  };

  const deleteHotel = async (id: number) => {
    try {
      await requestJson(`/hotels/${id}`, { method: "DELETE" });
      fetchHotels();
      return { success: true };
    } catch {
      return { success: false, error: "Failed to delete hotel" };
    }
  };

  return {
    data,
    status,
    error,
    refetch: fetchHotels,

    // pagination state
    search,
    setSearch,
    page,
    setPage,
    totalItems,
    pageSize: PAGE_SIZE,

    // crud
    createHotel,
    updateHotel,
    deleteHotel,
  };
}
