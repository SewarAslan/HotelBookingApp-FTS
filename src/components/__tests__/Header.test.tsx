import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../tests/test-utils";
import Header from "../Header";
import { vi } from "vitest";
import { within } from "@testing-library/react";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (orig) => {
  const actual = (await orig()) as typeof import("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: "/" }),
  };
});

interface MockUser {
  givenName: string;
  familyName: string;
  userType: "User" | "Admin";
}

let mockAuthUser: MockUser | null = null;
const mockHandleLogout = vi.fn();

vi.mock("../../features/auth/hooks", () => ({
  useAuthActions: () => ({
    authUser: mockAuthUser,
    handleLogout: mockHandleLogout,
  }),
}));

let mockCartCount = 0;

vi.mock("../../features/checkout/hooks/useCart", () => ({
  useCart: () => ({ count: mockCartCount }),
}));

vi.mock("@mui/material/useMediaQuery", () => ({
  __esModule: true,
  default: () => false,
}));

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthUser = {
      givenName: "Sewar",
      familyName: "Aslan",
      userType: "User",
    };
    mockCartCount = 0;
  });

  test("renders login avatar when user is logged in", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText("SA")).toBeInTheDocument();
  });

  test("navigates to Home when clicking logo", () => {
    renderWithProviders(<Header />);
    fireEvent.click(screen.getByText("Smart Stays"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("renders Admin link only in the top navigation for admin users", () => {
    mockAuthUser = {
      givenName: "Admin",
      familyName: "User",
      userType: "Admin",
    };

    renderWithProviders(<Header />);

    const toolbar = screen.getByRole("banner");

    const adminLink = within(toolbar).getByText("Admin");

    expect(adminLink).toBeInTheDocument();
  });

  test("hides Admin link for normal user", () => {
    mockAuthUser = {
      givenName: "Sewar",
      familyName: "Aslan",
      userType: "User",
    };

    renderWithProviders(<Header />);

    expect(screen.queryByText("Admin")).toBeNull();
  });

  test("opens and closes user menu and triggers logout", () => {
    mockAuthUser = {
      givenName: "Sewar",
      familyName: "Aslan",
      userType: "User",
    };

    renderWithProviders(<Header />);

    fireEvent.click(screen.getByLabelText("Account settings"));

    const menu = screen.getByRole("menu");

    const logoutItem = within(menu).getByText("Logout");

    fireEvent.click(logoutItem);
    expect(mockHandleLogout).toHaveBeenCalled();
  });
});
