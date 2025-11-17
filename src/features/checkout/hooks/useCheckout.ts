import { useState, useCallback } from "react";
import { apiClient } from "../../../api/client";
import type { StatusType } from "../../../constants/status";

export interface BookingRequest {
  customerName: string;
  hotelName: string;
  roomNumber: string;
  roomType: string;
  bookingDateTime: string;
  totalCost: number;
  paymentMethod: string;
}

export interface BookingResponse {
  bookingId: number;
  message: string;
}

export function useCheckout() {
  const [status, setStatus] = useState<StatusType>("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BookingResponse | null>(null);

  const createBooking = useCallback(async (payload: BookingRequest) => {
    setStatus("loading");
    setError(null);

    try {
      await apiClient.api.bookingsCreate(payload);

      setData(null);
      setStatus("success");
      return true;
    } catch {
      setError("Failed to create booking");
      setStatus("error");
      return false;
    }
  }, []);

  const refetch = () => {
    setStatus("idle");
    setError(null);
  };

  return {
    status,
    error,
    data,
    createBooking,
    refetch,
  };
}
