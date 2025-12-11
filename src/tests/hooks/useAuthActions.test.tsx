import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { useAuthActions } from "../../features/auth/hooks/useAuthActions";
import { logout } from "../../store/authSlice";
import { ROUTES } from "../../constants/routes";
import { vi } from "vitest";

// mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe("useAuthActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("navigates to HOME when user logs in", async () => {
    // mock dispatch result
    const dispatchSpy = vi.spyOn(store, "dispatch").mockResolvedValueOnce({
      type: "auth/loginUser/fulfilled",
      payload: { authUser: { userType: "User" } },
    });

    const { result } = renderHook(() => useAuthActions(), { wrapper });

    await act(async () => {
      await result.current.handleLogin("x", "y");
    });

    expect(dispatchSpy).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME);
  });

  test("navigates to ADMIN when admin logs in", async () => {
    const dispatchSpy = vi.spyOn(store, "dispatch").mockResolvedValueOnce({
      type: "auth/loginUser/fulfilled",
      payload: { authUser: { userType: "Admin" } },
    });

    const { result } = renderHook(() => useAuthActions(), { wrapper });

    await act(async () => {
      await result.current.handleLogin("admin", "123");
    });

    expect(dispatchSpy).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.ADMIN);
  });

  test("logout dispatches and navigates to LOGIN", () => {
    const dispatchSpy = vi.spyOn(store, "dispatch");

    const { result } = renderHook(() => useAuthActions(), { wrapper });

    act(() => {
      result.current.handleLogout();
    });

    expect(dispatchSpy).toHaveBeenCalledWith(logout());
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN);
  });
});
