import { ROUTES } from "../constants/routes";
import { Api } from "./HotelBookingApi";
import Cookies from "js-cookie";

export const apiClient = new Api({
  baseUrl: "https://hotel.foothilltech.net",

  securityWorker: () => {
    const token = Cookies.get("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  },

  customFetch: async (
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> => {
    try {
      const response = await fetch(input, init);

      if (response.status === 401) {
        console.warn(
          "⚠️ Token expired or unauthorized, redirecting to login..."
        );
        Cookies.remove("token");
        Cookies.remove("user");
        window.location.href = ROUTES.LOGIN;
      }

      return response;
    } catch (error) {
      console.error("❌ API request failed:", error);
      throw error;
    }
  },
});
