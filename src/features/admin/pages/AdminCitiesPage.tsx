import { useState } from "react";
import { Box } from "@mui/material";
import AdminToolbar from "../components/AdminToolbar";
import AdminTable, { type Column } from "../components/AdminTable";
import { useAdminCities } from "../hooks";
import MessageCard from "../../../components/MessageCard";
import { STATUS } from "../../../constants/status";

import AdminFormDialog from "../components/AdminFormDialog";
import ConfirmDialog from "../components/ConfirmDialog";

import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../store/snackbarSlice";
import type { AdminCity } from "../../../api/adminApi";

//
// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
//

// what table rows actually look like
type AdminCityRow = {
  id: number;
  name: string;
  description: string;
};

//
// ------------------------------------------------------------
// Component
// ------------------------------------------------------------
//

export default function AdminCitiesPage() {
  const {
    data,
    status,
    error,
    refetch,
    setSearch,
    setPage,
    createCity,
    updateCity,
    deleteCity,
  } = useAdminCities();

  const cities: AdminCity[] = data ?? [];
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<AdminCity | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<AdminCity | null>(null);

  //
  // ------------------------------------------------------------
  // Prepare rows
  // ------------------------------------------------------------
  //

  const preparedRows: AdminCityRow[] = cities.map((city) => ({
    id: city.id,
    name: city.name || "",
    description: city.description || "",
  }));

  //
  // ------------------------------------------------------------
  // Columns
  // ------------------------------------------------------------
  //

  const columns: Column[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "City Name" },
    { field: "description", headerName: "Description" },
  ];

  //
  // ------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------
  //

  function handleSearch(query: string) {
    setPage(1);
    setSearch(query.trim());
  }

  function handleCreate() {
    setEditingCity(null);
    setDialogOpen(true);
  }

  // row from table → convert back to original AdminCity
  function handleRowClick(row: AdminCityRow) {
    const city = cities.find((c) => c.id === row.id) ?? null;
    setEditingCity(city);
    setDialogOpen(true);
  }

  function handleDeleteClick(row: AdminCityRow) {
    const city = cities.find((c) => c.id === row.id) ?? null;
    setSelectedCity(city);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!selectedCity) return;

    const result = await deleteCity(selectedCity.id);

    dispatch(
      showSnackbar({
        message: result.success
          ? "City deleted successfully"
          : result.error || "Delete failed",
        severity: result.success ? "success" : "error",
      })
    );

    setDeleteDialogOpen(false);
    setSelectedCity(null);
    refetch();
  }

  //
  // ------------------------------------------------------------
  // Submit form
  // ------------------------------------------------------------
  //

  async function handleFormSubmit(values: Record<string, unknown>) {
    const payload = {
      name: String(values.name ?? ""),
      description: String(values.description ?? ""),
    };

    let result;

    if (editingCity) {
      result = await updateCity(editingCity.id, payload);
    } else {
      result = await createCity(payload);
    }

    dispatch(
      showSnackbar({
        message: result.success
          ? editingCity
            ? "City updated successfully"
            : "City created successfully"
          : result.error || "Operation failed",
        severity: result.success ? "success" : "error",
      })
    );

    if (result.success) {
      setDialogOpen(false);
      refetch();
    }
  }

  //
  // ------------------------------------------------------------
  // Validation Schema
  // ------------------------------------------------------------
  //

  const citySchema = Yup.object({
    name: Yup.string().required("City name is required"),
    description: Yup.string().optional(),
  });

  //
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  //

  return (
    <Box sx={{ p: 2 }}>
      <AdminToolbar onSearch={handleSearch} onCreate={handleCreate} />

      {status === STATUS.ERROR ? (
        <MessageCard
          status="error"
          error={error || "Failed to load cities"}
          onRetry={refetch}
          data={null}
        />
      ) : (
        <AdminTable<AdminCityRow>
          columns={columns}
          rows={preparedRows}
          loading={status === STATUS.LOADING}
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
        />
      )}

      <AdminFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingCity ? "Update City" : "Create City"}
        submitLabel={editingCity ? "Update" : "Create"}
        initialValues={{
          name: editingCity?.name ?? "",
          description: editingCity?.description ?? "",
        }}
        validationSchema={citySchema}
        fields={[
          { name: "name", label: "City Name", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ]}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete City"
        message={
          selectedCity
            ? `Are you sure you want to delete "${selectedCity.name}"?`
            : "Are you sure you want to delete this city?"
        }
      />
    </Box>
  );
}
