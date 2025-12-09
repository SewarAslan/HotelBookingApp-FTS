import { useEffect, useMemo, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { apiClient } from "../../../api/client";
import type { SearchResultDto } from "../../../api/Api";
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

      // filter by city
      if (params.city && results) {
        const targetCity = params.city.trim().toLowerCase();

        results = results.filter(
          (hotel) => (hotel.cityName || "").toLowerCase() === targetCity
        );
      }

      if (params.starRate && results) {
        const targetStars = Number(params.starRate);
        results = results.filter((hotel) => hotel.starRating === targetStars);
      }
      if (params.amenities && results) {
        const selected = params.amenities
          .split(",")
          .map((a) => a.trim().toLowerCase());

        results = results.filter((hotel) =>
          selected.every((sel) =>
            hotel.amenities?.some((a) => (a.name || "").toLowerCase() === sel)
          )
        );
      }

      if ((params.priceMin || params.priceMax) && results) {
        const min = params.priceMin ? Number(params.priceMin) : 0;
        const max = params.priceMax ? Number(params.priceMax) : Infinity;

        results = results.filter((hotel) => {
          const price = hotel.roomPrice ?? 0;
          return price >= min && price <= max;
        });
      }

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
      if (params.city && results) {
        const targetCity = params.city.trim().toLowerCase();

        results = results.filter(
          (hotel) => (hotel.cityName || "").toLowerCase() === targetCity
        );
      }
      if (params.adults && results) {
        const adults = Number(params.adults);
        results = results.filter(
          (hotel) => (hotel.roomCapacityAdults ?? 0) >= adults
        );
      }

      if (params.children && results) {
        const children = Number(params.children);
        results = results.filter(
          (hotel) => (hotel.roomCapacityChildren ?? 0) >= children
        );
      }

      if (params.rooms && results) {
        const rooms = Number(params.rooms);
        results = results.filter(
          (hotel) => (hotel.availableRooms ?? 1) >= rooms
        );
      }

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
