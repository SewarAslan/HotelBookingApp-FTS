import { useCallback, useState } from "react";
import { apiClient } from "../../../api/client";
import { STATUS, type StatusType } from "../../../constants/status";
import type { CartItem } from "../../../store/cartSlice";

interface CheckoutParams {
  userId: number;
  items: CartItem[];
}
interface BookingResponse {
  bookingId: number;
  hotelId: number;
  roomId: number;
  userId: number;
}

export function useCheckout() {
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const createBooking = useCallback(
    async ({ userId, items }: CheckoutParams) => {
      setStatus(STATUS.LOADING);
      setError(null);

      try {
        const bookingIds: number[] = [];

        for (const item of items) {
          const payload = {
            hotelId: item.hotelId!,
            roomId: item.roomId!,
            userId,
          };

          const res = await apiClient.api.bookingsCreate(payload);

          const data = res.data as BookingResponse | undefined;
          const bookingId = data?.bookingId;
          if (bookingId) {
            bookingIds.push(bookingId);
          }
        }

        setStatus(STATUS.SUCCESS);
        return bookingIds;
      } catch (e) {
        console.error("Failed to create bookings", e);
        setError("Failed to complete booking. Please try again.");
        setStatus(STATUS.ERROR);
        return [];
      }
    },
    []
  );

  return { createBooking, status, error };
}
