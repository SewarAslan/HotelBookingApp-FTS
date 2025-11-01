import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(username: string, password: string) {
    try {
      setIsLoading(true);
      setError(null);
      const userType = await login(username, password);
      console.log("✅ Logged in as:", userType);
      if (userType === "Admin") navigate("/admin");
      else navigate("/");
    } catch (error) {
      setError(
        "something went wrong, please check your username and  password"
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return { handleLogin, isLoading, error };
}
