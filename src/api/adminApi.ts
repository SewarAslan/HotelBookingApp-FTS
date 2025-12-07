const ADMIN_API_BASE_URL = "http://localhost:5000/api";

async function requestJson<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${ADMIN_API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export interface AdminCity {
  id: number;
  name: string;
  description: string;
}

export interface AdminHotel {
  id: number;
  name?: string;
  hotelName?: string;
  description: string;
  hotelType?: string;
  starRating?: number;
  latitude?: number;
  longitude?: number;
}

export interface AdminRoom {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  price: number;
  availability: boolean;
}

export { requestJson };
