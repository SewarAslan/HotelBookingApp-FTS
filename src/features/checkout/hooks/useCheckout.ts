import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { apiClient } from "../../../api/client";
import type { BookingRequest } from "../../../api/Api";
import { STATUS, type StatusType } from "../../../constants/status";
import type { CartItem } from "../../../store/cartSlice";

interface CheckoutParams {
  customerName: string;
  hotelName: string;
  items: CartItem[];
  paymentMethod: string;
}

export function useCheckout() {
  const [status, setStatus] = useState<StatusType>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const createBooking = useCallback(
    async ({
      customerName,
      hotelName,
      items,
      paymentMethod,
    }: CheckoutParams) => {
      if (!items.length) return false;

      setStatus(STATUS.LOADING);
      setError(null);

      try {
        for (const item of items) {
          const start = dayjs(item.checkInDate);
          const end = dayjs(item.checkOutDate);
          const nights = Math.max(end.diff(start, "day"), 1);
          const totalCost = (item.price ?? 0) * nights;

          const payload: BookingRequest = {
            customerName,
            hotelName,
            roomNumber: String(item.roomId ?? ""),
            roomType: item.roomType ?? "",
            bookingDateTime: new Date().toISOString(),
            totalCost,
            paymentMethod,
          };

          await apiClient.api.bookingsCreate(payload);
        }

        setStatus(STATUS.SUCCESS);
        return true;
      } catch (e) {
        console.error("Failed to create bookings", e);
        setError("Failed to complete booking. Please try again.");
        setStatus(STATUS.ERROR);
        return false;
      }
    },
    []
  );

  return { createBooking, status, error };
}
