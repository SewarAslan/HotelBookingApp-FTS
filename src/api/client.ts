import { STORAGE_KEYS } from "../constants/storageKeys";
import { Api } from "./HotelBookingApi";

export const apiClient = new Api({
  baseUrl: "https://hotel.foothilltech.net",
  securityWorker: () => {
    const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  },
});
