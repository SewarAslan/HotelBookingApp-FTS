import { screen, fireEvent, waitFor } from "@testing-library/react";
import AuthForm from "../features/auth/components/AuthForm";
import { describe, expect, test, vi } from "vitest";
import { renderWithTheme } from "./test-utils";

// helper
function setup(overrides: Partial<React.ComponentProps<typeof AuthForm>> = {}) {
  const onSubmit = vi.fn();

  const props = {
    title: "Login",
    onSubmit,
    isLoading: false,
    error: null,
    ...overrides,
  };

  renderWithTheme(<AuthForm {...props} />);

  return { onSubmit, props };
}

describe("AuthForm Component", () => {
  // -------------------------------------------------------
  // 1) Basic Rendering
  // -------------------------------------------------------
  test("renders form inputs and title", () => {
    setup();

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  // -------------------------------------------------------
  // 2) Yup Validation Errors
  // -------------------------------------------------------
  test("shows validation errors when submitting empty form", async () => {
    setup();

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText("username is required!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("password is required!")
    ).toBeInTheDocument();
  });

  test("does not submit when validation fails", async () => {
    const { onSubmit } = setup();

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
  });

  test("shows validation error for short username", async () => {
    const { onSubmit } = setup();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "ab" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "goodpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText("username is too short!")
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------
  // 3) Fixing values removes errors
  // -------------------------------------------------------
  test("removes validation errors after fixing input", async () => {
    setup();

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText("username is required!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("password is required!")
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "sewar" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "mypassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(
        screen.queryByText("username is required!")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        screen.queryByText("password is required!")
      ).not.toBeInTheDocument()
    );
  });

  // -------------------------------------------------------
  // 4) Successful Submit
  // -------------------------------------------------------
  test("calls onSubmit with correct values", async () => {
    const { onSubmit } = setup();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "secret123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        {
          username: "admin",
          password: "secret123",
        },
        expect.any(Object) // Formik bag
      )
    );
  });

  // -------------------------------------------------------
  // 5) Loading Spinner
  // -------------------------------------------------------
  test("shows loading spinner when isLoading is true", () => {
    setup({ isLoading: true });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  // -------------------------------------------------------
  // 6) Error Message Prop
  // -------------------------------------------------------
  test("shows error message when error prop exists", () => {
    setup({ error: "Invalid login" });

    expect(screen.getByText("Invalid login")).toBeInTheDocument();
  });
});
