export type BookingStatus = "Confirmed" | "Pending" | "Cancelled";

export interface Booking {
  bookingId: number;
  hotelId: number;
  roomId: number;
  userId: number;
  price: number;
  checkInDate: string;
  checkOutDate: string;
  status: BookingStatus;
  bookingDate?: string;
}

export interface ChartItem {
  name: string;
  value: number;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
}

export interface MostBookedHotel {
  hotelId: number;
  bookings: number;
}

export interface AdminAnalytics {
  totalBookings: number;
  totalRevenue: number;
  statusChart: ChartItem[];
  revenueChart: RevenuePoint[];
  mostBookedHotel: MostBookedHotel | null;
}
