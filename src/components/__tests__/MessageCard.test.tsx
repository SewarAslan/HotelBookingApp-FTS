import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../tests/test-utils";
import MessageCard from "../MessageCard";
import { STATUS } from "../../constants/status";
import { UI_IMAGES } from "../../constants/UI_IMAGES";
import { vi } from "vitest";

describe("MessageCard Component", () => {
  test("renders LOADING state correctly", () => {
    renderWithProviders(
      <MessageCard status={STATUS.LOADING} message="Loading hotels..." />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    expect(screen.getByText("Loading hotels...")).toBeInTheDocument();
  });

  test("renders ERROR state with default message", () => {
    renderWithProviders(<MessageCard status={STATUS.ERROR} />);

    const img = screen.getByAltText("error");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", UI_IMAGES.error);

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  test("renders ERROR state with custom error text", () => {
    renderWithProviders(
      <MessageCard status={STATUS.ERROR} error="Network failed" />
    );

    expect(screen.getByText("Network failed")).toBeInTheDocument();
  });

  test("calls onRetry when Retry button is clicked", () => {
    const mockRetry = vi.fn();

    renderWithProviders(
      <MessageCard status={STATUS.ERROR} onRetry={mockRetry} />
    );

    const button = screen.getByRole("button", { name: "Retry" });
    fireEvent.click(button);

    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  test("renders EMPTY state when status is success and data is empty array", () => {
    renderWithProviders(
      <MessageCard
        status={STATUS.SUCCESS}
        data={[]}
        message="No hotels found"
      />
    );

    const img = screen.getByAltText("empty");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", UI_IMAGES.empty);

    expect(screen.getByText("No hotels found")).toBeInTheDocument();
  });

  test("returns null when success and data is NOT empty", () => {
    const { container } = renderWithProviders(
      <MessageCard status={STATUS.SUCCESS} data={[{ id: 1 }]} />
    );

    expect(container.firstChild).toBeNull();
  });
});
