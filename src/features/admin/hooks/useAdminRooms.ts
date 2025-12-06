import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { requestJson } from "../../../api/adminApi";
import type { AdminRoom } from "../../../api/adminApi";

export interface RoomPayload {
  roomNumber: number;
  roomPhotoUrl?: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  price: number;
  availability: boolean;
}

// ---------------------------------------------
// Helper — check if room belongs to selected hotel
// ---------------------------------------------
function roomBelongsToHotel(roomId: number, hotelId: number | null): boolean {
  if (!hotelId) return false;

  const start = hotelId * 100; // example: hotelId=3 → 300–399
  const end = hotelId * 100 + 99;

  return roomId >= start && roomId <= end;
}

// ---------------------------------------------
// The main hook
// ---------------------------------------------
export function useAdminRooms(selectedHotelId: number | null) {
  const [data, setData] = useState<AdminRoom[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    // إذا ما اختار هوتيل → رجع rooms فاضي
    if (!selectedHotelId) {
      setData([]);
      setStatus(STATUS.IDLE);
      return;
    }

    try {
      setStatus(STATUS.LOADING);
      setError(null);

      const allRooms = await requestJson<AdminRoom[]>(
        `/hotels/${selectedHotelId}/rooms`
      );

      const filtered = allRooms.filter((room) =>
        roomBelongsToHotel(room.roomId, selectedHotelId)
      );

      setData(filtered);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error("Failed to load rooms:", err);
      setError("Failed to load rooms");
      setStatus(STATUS.ERROR);
    }
  }, [selectedHotelId]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // CRUD operations
  async function createRoom(payload: RoomPayload) {
    try {
      await requestJson("/rooms", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await fetchRooms();
      return { success: true };
    } catch {
      return { success: false, error: "Failed to create room" };
    }
  }

  async function updateRoom(id: number, payload: RoomPayload) {
    try {
      await requestJson(`/rooms/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      await fetchRooms();
      return { success: true };
    } catch {
      return { success: false, error: "Failed to update room" };
    }
  }

  async function deleteRoom(id: number) {
    try {
      await requestJson(`/rooms/${id}`, { method: "DELETE" });
      await fetchRooms();
      return { success: true };
    } catch {
      return { success: false, error: "Failed to delete room" };
    }
  }

  return {
    data,
    status,
    error,
    refetch: fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom,
  };
}
