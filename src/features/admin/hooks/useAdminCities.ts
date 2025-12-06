import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { requestJson, type AdminCity } from "../../../api/adminApi";

interface CityPayload {
  name: string;
  description: string;
}

interface UseAdminCitiesResult {
  data: AdminCity[] | null;
  status: StatusType;
  error: string | null;
  refetch: () => void;

  search: string;
  setSearch: (value: string) => void;

  page: number;
  setPage: (value: number) => void;
  pageSize: number;

  createCity: (
    payload: CityPayload
  ) => Promise<{ success: boolean; error?: string }>;
  updateCity: (
    id: number,
    payload: CityPayload
  ) => Promise<{ success: boolean; error?: string }>;
  deleteCity: (id: number) => Promise<{ success: boolean; error?: string }>;
}

const PAGE_SIZE = 10;

export function useAdminCities(): UseAdminCitiesResult {
  const [data, setData] = useState<AdminCity[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchCities = useCallback(async () => {
    try {
      setStatus(STATUS.LOADING);
      setError(null);

      // الـ backend تبع زميلك بيرجع كل المدن بدون query params
      const cities = await requestJson<AdminCity[]>("/cities");

      // نعمل search من الـ frontend
      const filtered = search
        ? cities.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
          )
        : cities;

      // نعمل pagination من الـ frontend
      const start = (page - 1) * PAGE_SIZE;
      const paginated = filtered.slice(start, start + PAGE_SIZE);

      setData(paginated);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error("Failed to load cities:", err);
      setError("Failed to load cities");
      setStatus(STATUS.ERROR);
    }
  }, [search, page]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const createCity: UseAdminCitiesResult["createCity"] = async (payload) => {
    try {
      await requestJson<AdminCity>("/cities", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await fetchCities();
      return { success: true };
    } catch (err) {
      console.error("Create city failed:", err);
      return { success: false, error: "Failed to create city" };
    }
  };

  const updateCity: UseAdminCitiesResult["updateCity"] = async (
    id,
    payload
  ) => {
    try {
      await requestJson<AdminCity>(`/cities/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      await fetchCities();
      return { success: true };
    } catch (err) {
      console.error("Update city failed:", err);
      return { success: false, error: "Failed to update city" };
    }
  };

  const deleteCity: UseAdminCitiesResult["deleteCity"] = async (id) => {
    try {
      await requestJson<AdminCity[]>(`/cities/${id}`, {
        method: "DELETE",
      });
      await fetchCities();
      return { success: true };
    } catch (err) {
      console.error("Delete city failed:", err);
      return { success: false, error: "Failed to delete city" };
    }
  };

  return {
    data,
    status,
    error,
    refetch: fetchCities,
    search,
    setSearch,
    page,
    setPage,
    pageSize: PAGE_SIZE,
    createCity,
    updateCity,
    deleteCity,
  };
}
