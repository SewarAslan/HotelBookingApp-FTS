import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import AuthForm from "../../../features/auth/components/AuthForm";
import { vi } from "vitest";

describe("AuthForm Component", () => {
  test("renders form fields and login button", () => {
    renderWithProviders(
      <AuthForm title="Login" onSubmit={() => {}} isLoading={false} />
    );

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", async () => {
    renderWithProviders(
      <AuthForm title="Login" onSubmit={() => {}} isLoading={false} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(
      await screen.findByText("username is required!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("password is required!")
    ).toBeInTheDocument();
  });

  test("shows min-length validation errors", async () => {
    renderWithProviders(
      <AuthForm title="Login" onSubmit={() => {}} isLoading={false} />
    );

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "aa" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "aa" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(
      await screen.findByText("username is too short!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("password is too short!")
    ).toBeInTheDocument();
  });

  test("calls onSubmit with correct values", async () => {
    const mockSubmit = vi.fn();

    renderWithProviders(
      <AuthForm title="Login" onSubmit={mockSubmit} isLoading={false} />
    );

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "Sewar" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockSubmit.mock.calls[0][0]).toEqual({
        username: "Sewar",
        password: "12345",
      });
    });
  });

  test("renders loading spinner when isLoading is true", () => {
    renderWithProviders(
      <AuthForm title="Login" onSubmit={() => {}} isLoading={true} />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("shows error message when error prop is passed", () => {
    renderWithProviders(
      <AuthForm
        title="Login"
        onSubmit={() => {}}
        isLoading={false}
        error="Invalid credentials"
      />
    );

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });
});
