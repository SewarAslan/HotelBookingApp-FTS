import type { SearchParams } from "../features/search/types/SearchParams";

export function parseSearchParams(search: string): SearchParams {
  const params = new URLSearchParams(search);
  return {
    city: params.get("city") || undefined,
    checkInDate: params.get("checkInDate") || undefined,
    checkOutDate: params.get("checkOutDate") || undefined,
    adults: params.get("adults") ? Number(params.get("adults")) : undefined,
    children: params.get("children")
      ? Number(params.get("children"))
      : undefined,
    rooms: params.get("rooms") ? Number(params.get("rooms")) : undefined,
    sort: params.get("sort") || undefined,
    starRate: params.get("starRate") || undefined,
    amenities: params.get("amenities") || undefined,
  };
}

export function buildSearchParams(params: SearchParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
}
