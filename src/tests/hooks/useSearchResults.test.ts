import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useSearchResults } from "../../../src/features/search/hooks/useSearchResults";
import { apiClient } from "../../../src/api/client";
import { STATUS } from "../../../src/constants/status";
import type { Mock } from "vitest";
let mockSearch = "";
vi.mock("react-router-dom", () => ({
  useLocation: () => ({ search: mockSearch }),
}));

vi.mock("../../../src/api/client");

const fakeResults = [
  {
    hotelId: 1,
    hotelName: "Sunset Resort",
    roomPrice: 200,
    starRating: 5,
    amenities: [{ name: "Spa" }],
  },
];

describe("useSearchResults", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch results successfully", async () => {
    const mockHomeSearch = apiClient.api.homeSearchList as Mock;

    mockHomeSearch.mockResolvedValue({ data: fakeResults });

    const { result } = renderHook(() => useSearchResults());

    expect(result.current.status).toBe(STATUS.LOADING);

    await waitFor(() => {
      expect(result.current.status).toBe(STATUS.SUCCESS);
    });

    expect(result.current.data).toEqual(fakeResults);
  });
  test("sets ERROR state when API fails", async () => {
    const mockHomeSearch = apiClient.api.homeSearchList as Mock;

    mockHomeSearch.mockRejectedValue(new Error("Network failed"));

    const { result } = renderHook(() => useSearchResults());

    expect(result.current.status).toBe(STATUS.LOADING);

    await waitFor(() => {
      expect(result.current.status).toBe(STATUS.ERROR);
    });

    expect(result.current.error).toBe("Failed to fetch search results");
  });
  test("filters results by amenities correctly", async () => {
    mockSearch = "?amenities=spa";

    const mockHomeSearch = apiClient.api.homeSearchList as Mock;

    const hotels = [
      {
        hotelId: 1,
        hotelName: "Spa Hotel",
        amenities: [{ name: "Spa" }],
        roomPrice: 100,
      },
      {
        hotelId: 2,
        hotelName: "Gym Hotel",
        amenities: [{ name: "Gym" }],
        roomPrice: 200,
      },
      {
        hotelId: 3,
        hotelName: "Nothing Hotel",
        amenities: [{ name: "Parking" }],
        roomPrice: 150,
      },
    ];

    mockHomeSearch.mockResolvedValue({ data: hotels });

    const { result } = renderHook(() => useSearchResults());

    await waitFor(() => {
      expect(result.current.status).toBe(STATUS.SUCCESS);
    });

    const returned = result.current.data!;

    expect(returned.length).toBe(1);
    expect(returned[0].hotelName).toBe("Spa Hotel");
  });

  test("filters results by star rating", async () => {
    const mockHomeSearch = apiClient.api.homeSearchList as Mock;

    const hotels = [
      {
        hotelId: 1,
        hotelName: "Five Star Hotel",
        starRating: 5,
        roomPrice: 300,
      },
      {
        hotelId: 2,
        hotelName: "Three Star Hotel",
        starRating: 3,
        roomPrice: 150,
      },
    ];

    mockHomeSearch.mockResolvedValue({ data: hotels });
    mockSearch = "?starRate=5";

    vi.mock("react-router-dom", () => ({
      useLocation: () => ({ search: mockSearch }),
    }));

    const { result } = renderHook(() => useSearchResults());

    await waitFor(() => {
      expect(result.current.status).toBe(STATUS.SUCCESS);
    });

    const returned = result.current.data!;

    expect(returned.length).toBe(1);
    expect(returned[0].hotelName).toBe("Five Star Hotel");
    expect(returned[0].starRating).toBe(5);
  });
  test("filters results by minimum price", async () => {
    mockSearch = "?priceMin=200";

    const mockHomeSearch = apiClient.api.homeSearchList as Mock;

    const hotels = [
      { hotelId: 1, hotelName: "Cheap", roomPrice: 100 },
      { hotelId: 2, hotelName: "Mid", roomPrice: 200 },
      { hotelId: 3, hotelName: "Expensive", roomPrice: 300 },
    ];

    mockHomeSearch.mockResolvedValue({ data: hotels });

    const { result } = renderHook(() => useSearchResults());

    await waitFor(() => expect(result.current.status).toBe(STATUS.SUCCESS));

    const returned = result.current.data!;
    expect(returned.length).toBe(2);
    expect(returned.map((h) => h.hotelName)).toEqual(["Mid", "Expensive"]);
  });
  test("filters results by maximum price", async () => {
    mockSearch = "?priceMax=200";

    const mockHomeSearch = apiClient.api.homeSearchList as Mock;

    const hotels = [
      { hotelId: 1, hotelName: "Cheap", roomPrice: 100 },
      { hotelId: 2, hotelName: "Mid", roomPrice: 200 },
      { hotelId: 3, hotelName: "Expensive", roomPrice: 300 },
    ];

    mockHomeSearch.mockResolvedValue({ data: hotels });

    const { result } = renderHook(() => useSearchResults());

    await waitFor(() => expect(result.current.status).toBe(STATUS.SUCCESS));

    const returned = result.current.data!;
    expect(returned.length).toBe(2);
    expect(returned.map((h) => h.hotelName)).toEqual(["Cheap", "Mid"]);
  });
  test("filters results by price range", async () => {
    mockSearch = "?priceMin=150&priceMax=300";

    const mockHomeSearch = apiClient.api.homeSearchList as Mock;

    const hotels = [
      { hotelId: 1, hotelName: "Cheap", roomPrice: 100 },
      { hotelId: 2, hotelName: "Mid", roomPrice: 200 },
      { hotelId: 3, hotelName: "Expensive", roomPrice: 300 },
      { hotelId: 4, hotelName: "Ultra", roomPrice: 400 },
    ];

    mockHomeSearch.mockResolvedValue({ data: hotels });

    const { result } = renderHook(() => useSearchResults());

    await waitFor(() => expect(result.current.status).toBe(STATUS.SUCCESS));

    const returned = result.current.data!;
    expect(returned.length).toBe(2);
    expect(returned.map((h) => h.hotelName)).toEqual(["Mid", "Expensive"]);
  });
  test("sorts results by price ascending", async () => {
    mockSearch = "?sort=priceAsc";

    const mockHomeSearch = apiClient.api.homeSearchList as Mock;

    const hotels = [
      { hotelId: 1, hotelName: "A", roomPrice: 300 },
      { hotelId: 2, hotelName: "B", roomPrice: 100 },
      { hotelId: 3, hotelName: "C", roomPrice: 200 },
    ];

    mockHomeSearch.mockResolvedValue({ data: hotels });

    const { result } = renderHook(() => useSearchResults());

    await waitFor(() => expect(result.current.status).toBe(STATUS.SUCCESS));

    const names = result.current.data!.map((h) => h.hotelName);
    expect(names).toEqual(["B", "C", "A"]);
  });
  test("sorts results by price descending", async () => {
    mockSearch = "?sort=priceDesc";

    const mockHomeSearch = apiClient.api.homeSearchList as Mock;

    const hotels = [
      { hotelId: 1, hotelName: "A", roomPrice: 100 },
      { hotelId: 2, hotelName: "B", roomPrice: 300 },
      { hotelId: 3, hotelName: "C", roomPrice: 200 },
    ];

    mockHomeSearch.mockResolvedValue({ data: hotels });

    const { result } = renderHook(() => useSearchResults());

    await waitFor(() => expect(result.current.status).toBe(STATUS.SUCCESS));

    expect(result.current.data!.map((h) => h.hotelName)).toEqual([
      "B",
      "C",
      "A",
    ]);
  });
  test("filters results when multiple amenities must ALL be present (AND logic)", async () => {
    mockSearch = "?amenities=spa,pool";

    const mockHomeSearch = apiClient.api.homeSearchList as Mock;

    const hotels = [
      {
        hotelId: 1,
        hotelName: "Spa & Pool Hotel",
        amenities: [{ name: "Spa" }, { name: "Pool" }],
      },
      {
        hotelId: 2,
        hotelName: "Spa Only",
        amenities: [{ name: "Spa" }],
      },
      {
        hotelId: 3,
        hotelName: "Pool Only",
        amenities: [{ name: "Pool" }],
      },
    ];

    mockHomeSearch.mockResolvedValue({ data: hotels });

    const { result } = renderHook(() => useSearchResults());

    await waitFor(() => {
      expect(result.current.status).toBe(STATUS.SUCCESS);
    });

    const returned = result.current.data!;

    expect(returned.length).toBe(1);
    expect(returned[0].hotelName).toBe("Spa & Pool Hotel");
  });

  test("returns empty results when filters match no hotels", async () => {
    mockSearch = "?starRate=5";

    const mockHomeSearch = apiClient.api.homeSearchList as Mock;

    mockHomeSearch.mockResolvedValue({
      data: [{ hotelId: 99, hotelName: "Low Star", starRating: 2 }],
    });

    const { result } = renderHook(() => useSearchResults());

    await waitFor(() => expect(result.current.status).toBe(STATUS.SUCCESS));

    expect(result.current.data!.length).toBe(0);
  });
});
