import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import AdminFormDialog, {
  type FieldConfig,
} from "../../../features/admin/components/AdminFormDialog";
import { vi } from "vitest";
import * as Yup from "yup";

describe("AdminFormDialog Component", () => {
  const fields: FieldConfig[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
  ];

  const initialValues = { name: "", description: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
  });

  test("renders dialog when open is true", () => {
    renderWithProviders(
      <AdminFormDialog
        open={true}
        onClose={() => {}}
        title="Add City"
        fields={fields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      />
    );

    expect(screen.getByText("Add City")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  test("does not render dialog when open is false", () => {
    renderWithProviders(
      <AdminFormDialog
        open={false}
        onClose={() => {}}
        title="Add City"
        fields={fields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      />
    );

    expect(screen.queryByText("Add City")).toBeNull();
  });

  test("calls onClose when Cancel is clicked", () => {
    const mockClose = vi.fn();

    renderWithProviders(
      <AdminFormDialog
        open={true}
        onClose={mockClose}
        title="Add City"
        fields={fields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockClose).toHaveBeenCalled();
  });

  test("calls onSubmit with correct values", async () => {
    const mockSubmit = vi.fn();

    renderWithProviders(
      <AdminFormDialog
        open={true}
        onClose={() => {}}
        title="Add City"
        fields={fields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={mockSubmit}
        submitLabel="Save"
      />
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Nablus" },
    });

    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Beautiful city" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      const submittedValues = mockSubmit.mock.calls[0][0];
      expect(submittedValues).toEqual({
        name: "Nablus",
        description: "Beautiful city",
      });
    });
  });
});
