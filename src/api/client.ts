import { Api } from "./HotelBookingApi";

export const apiClient = new Api({
  baseUrl: "https://hotel.foothilltech.net",
  securityWorker: () => {
    const token = sessionStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  },
});
