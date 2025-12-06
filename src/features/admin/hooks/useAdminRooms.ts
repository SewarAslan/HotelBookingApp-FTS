import { useCallback, useEffect, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { requestJson, type AdminRoom } from "../../../api/adminApi";

interface RoomPayload {
  roomNumber: number;
  roomPhotoUrl?: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  price: number;
  availability: boolean;
}

interface UseAdminRoomsResult {
  data: AdminRoom[] | null;
  status: StatusType;
  error: string | null;
  refetch: () => void;

  createRoom: (
    payload: RoomPayload
  ) => Promise<{ success: boolean; error?: string }>;
  updateRoom: (
    roomId: number,
    payload: RoomPayload
  ) => Promise<{ success: boolean; error?: string }>;
  deleteRoom: (roomId: number) => Promise<{ success: boolean; error?: string }>;
}

export function useAdminRooms(hotelId: number): UseAdminRoomsResult {
  const [data, setData] = useState<AdminRoom[] | null>(null);
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    if (!hotelId) return;

    try {
      setStatus(STATUS.LOADING);
      setError(null);

      const rooms = await requestJson<AdminRoom[]>(`/hotels/${hotelId}/rooms`);
      setData(rooms);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      console.error("Failed to load rooms:", err);
      setError("Failed to load rooms");
      setStatus(STATUS.ERROR);
    }
  }, [hotelId]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const createRoom: UseAdminRoomsResult["createRoom"] = async (payload) => {
    try {
      // backend عندك ما برتبط الـ room بالـ hotel في POST /api/rooms
      await requestJson<AdminRoom>("/rooms", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await fetchRooms();
      return { success: true };
    } catch (err) {
      console.error("Create room failed:", err);
      return { success: false, error: "Failed to create room" };
    }
  };

  const updateRoom: UseAdminRoomsResult["updateRoom"] = async (
    roomId,
    payload
  ) => {
    try {
      await requestJson<AdminRoom>(`/rooms/${roomId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      await fetchRooms();
      return { success: true };
    } catch (err) {
      console.error("Update room failed:", err);
      return { success: false, error: "Failed to update room" };
    }
  };

  const deleteRoom: UseAdminRoomsResult["deleteRoom"] = async (roomId) => {
    try {
      await requestJson<AdminRoom[]>(`/rooms/${roomId}`, {
        method: "DELETE",
      });
      await fetchRooms();
      return { success: true };
    } catch (err) {
      console.error("Delete room failed:", err);
      return { success: false, error: "Failed to delete room" };
    }
  };

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
