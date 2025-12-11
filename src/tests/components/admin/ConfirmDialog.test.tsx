import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import ConfirmDialog from "../../../features/admin/components/ConfirmDialog";
import { vi } from "vitest";

describe("ConfirmDialog Component", () => {
  test("renders dialog when open is true", () => {
    renderWithProviders(
      <ConfirmDialog
        open={true}
        title="Delete City"
        message="Are you sure?"
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );

    expect(screen.getByText("Delete City")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  test("does not render when open is false", () => {
    renderWithProviders(
      <ConfirmDialog
        open={false}
        title="Delete"
        message="Are you sure?"
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );

    expect(screen.queryByText("Are you sure?")).toBeNull();
  });

  test("calls onClose when Cancel is clicked", () => {
    const mockClose = vi.fn();

    renderWithProviders(
      <ConfirmDialog
        open={true}
        title="Delete"
        message="Are you sure?"
        onClose={mockClose}
        onConfirm={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockClose).toHaveBeenCalled();
  });

  test("calls onConfirm when Confirm is clicked", () => {
    const mockConfirm = vi.fn();

    renderWithProviders(
      <ConfirmDialog
        open={true}
        title="Delete"
        message="Are you sure?"
        onClose={() => {}}
        onConfirm={mockConfirm}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
    expect(mockConfirm).toHaveBeenCalled();
  });
});
