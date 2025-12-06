import { ROUTES } from "../constants/routes";
import { Api } from "./Api";
import Cookies from "js-cookie";

export const apiClient = new Api({
  baseUrl: "http://localhost:5000",

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

      const isLoginRequest = String(input).includes("auth/authenticate");

      if (response.status === 401 && !isLoginRequest) {
        console.warn("⚠️ Token expired, redirecting to login...");
        Cookies.remove("token");
        Cookies.remove("authUser");
        window.location.href = ROUTES.LOGIN;
      }

      return response;
    } catch (error) {
      console.error("❌ API request failed:", error);
      throw error;
    }
  },
});
