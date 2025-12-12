import { useEffect, useMemo, useState } from "react";
import { STATUS, type StatusType } from "../../../constants/status";
import { requestJson } from "../../../api/adminApi";
import { format } from "date-fns";
import type {
  AdminAnalytics,
  Booking,
  BookingStatus,
  ChartItem,
  MostBookedHotel,
  RevenuePoint,
} from "../types/analytics";

export function useAdminAnalytics() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [status, setStatus] = useState<StatusType>(STATUS.LOADING);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    requestJson<Booking[]>("/bookings")
      .then((res) => {
        if (!mounted) return;
        setBookings(res);
        setStatus(STATUS.SUCCESS);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message ?? "Failed to load analytics");
        setStatus(STATUS.ERROR);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const analytics: AdminAnalytics = useMemo(() => {
    const totalBookings = bookings.length;

    const totalRevenue = bookings.reduce((sum, b) => sum + (b.price ?? 0), 0);

    const statusChart: ChartItem[] = Object.entries(
      bookings.reduce<Record<BookingStatus, number>>(
        (acc, b) => {
          acc[b.status] = (acc[b.status] ?? 0) + 1;
          return acc;
        },
        {
          Confirmed: 0,
          Pending: 0,
          Cancelled: 0,
        }
      )
    ).map(([name, value]) => ({ name, value }));

    const revenueChart: RevenuePoint[] = Object.entries(
      bookings.reduce<Record<string, number>>((acc, b) => {
        if (!b.bookingDate) return acc;
        const day = format(new Date(b.bookingDate), "yyyy-MM-dd");
        acc[day] = (acc[day] ?? 0) + b.price;
        return acc;
      }, {})
    )
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, revenue]) => ({ date, revenue }));

    const mostBookedHotelEntry = Object.entries(
      bookings.reduce<Record<number, number>>((acc, b) => {
        acc[b.hotelId] = (acc[b.hotelId] ?? 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1])[0];

    const mostBookedHotel: MostBookedHotel | null = mostBookedHotelEntry
      ? {
          hotelId: Number(mostBookedHotelEntry[0]),
          bookings: mostBookedHotelEntry[1],
        }
      : null;

    return {
      totalBookings,
      totalRevenue,
      statusChart,
      revenueChart,
      mostBookedHotel,
    };
  }, [bookings]);

  return {
    status,
    error,
    analytics,
    rawBookings: bookings,
  };
}
