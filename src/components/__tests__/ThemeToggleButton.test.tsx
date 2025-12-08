import { screen, fireEvent } from "@testing-library/react";
import { ThemeToggleButton } from "../ThemeToggleButton";
import { renderWithProviders } from "../../tests/test-utils";
import { ThemeControllerContext } from "../../styles/ThemeContext";
import { vi } from "vitest";
type ThemeCtx = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

// Custom wrapper to inject context
function renderWithThemeContext(ctxValue: ThemeCtx) {
  return renderWithProviders(
    <ThemeControllerContext.Provider value={ctxValue}>
      <ThemeToggleButton />
    </ThemeControllerContext.Provider>
  );
}

describe("ThemeToggleButton", () => {
  test("renders DarkModeIcon when mode is light", () => {
    const ctx = { mode: "light", toggleMode: vi.fn() } as const;

    renderWithThemeContext(ctx);

    // DarkModeIcon should appear
    expect(screen.getByTestId("DarkModeIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("LightModeIcon")).not.toBeInTheDocument();
  });

  test("renders LightModeIcon when mode is dark", () => {
    const ctx = { mode: "dark", toggleMode: vi.fn() } as const;

    renderWithThemeContext(ctx);

    expect(screen.getByTestId("LightModeIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("DarkModeIcon")).not.toBeInTheDocument();
  });

  test("button click triggers toggleMode", () => {
    const toggleMock = vi.fn();
    const ctx = { mode: "light", toggleMode: toggleMock } as const;

    renderWithThemeContext(ctx);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
  test("shows correct tooltip text", async () => {
    const ctx = { mode: "light", toggleMode: vi.fn() } as const;
    renderWithThemeContext(ctx);
    const button = screen.getByRole("button");
    fireEvent.mouseOver(button);
    const tooltip = await screen.findByText("Switch to Dark mode");

    expect(tooltip).toBeInTheDocument();
  });

  test("returns null if context is missing", () => {
    const { container } = renderWithProviders(<ThemeToggleButton />);

    expect(container.firstChild).toBeNull();
  });
});
