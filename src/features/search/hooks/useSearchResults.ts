import { useEffect, useMemo, useState } from "react";
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

  const fetchResults = async () => {
    setStatus(STATUS.LOADING);
    try {
      // 1️⃣ جلب البيانات الأساسية من السيرفر
      const response = await apiClient.api.homeSearchList({
        city: params.city,
        checkInDate: params.checkInDate,
        checkOutDate: params.checkOutDate,
        adults: Number(params.adults) || 1,
        children: Number(params.children) || 0,
        numberOfRooms: Number(params.rooms) || 1,
        starRate: params.starRate ? Number(params.starRate) : undefined,
        sort: params.sort || undefined,
      });

      let results = response.data;

      // 2️⃣ فلترة محلية حسب عدد النجوم
      if (params.starRate && results) {
        const targetStars = Number(params.starRate);
        results = results.filter((hotel) => hotel.starRating === targetStars);
      }

      // 3️⃣ فلترة محلية حسب الخدمات (amenities)
      if (params.amenities && results) {
        const selected = params.amenities
          .split(",")
          .map((a) => a.trim().toLowerCase());
        results = results.filter((hotel) =>
          hotel.amenities?.some((a) =>
            selected.includes((a.name || "").toLowerCase())
          )
        );
      }

      // 4️⃣ Sorting محلي (priceAsc, priceDesc, ratingDesc, discountDesc)
      if (params.sort && results) {
        switch (params.sort) {
          case "priceAsc":
            results.sort((a, b) => (a.roomPrice ?? 0) - (b.roomPrice ?? 0));
            break;
          case "priceDesc":
            results.sort((a, b) => (b.roomPrice ?? 0) - (a.roomPrice ?? 0));
            break;
          case "ratingDesc":
            results.sort((a, b) => (b.starRating ?? 0) - (a.starRating ?? 0));
            break;
          case "discountDesc":
            results.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
            break;
        }
      }

      // ✅ تعيين النتائج النهائية
      setData(results);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch search results");
      setStatus(STATUS.ERROR);
    }
  };

  useEffect(() => {
    void fetchResults();
  }, [location.search]);

  return { data, status, error, refetch: fetchResults };
}
