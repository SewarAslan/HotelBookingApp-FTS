import { useState } from "react";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import AdminToolbar from "../components/AdminToolbar";
import AdminTable, { type Column } from "../components/AdminTable";
import { useAdminCities } from "../hooks";
import MessageCard from "../../../components/MessageCard";
import { STATUS } from "../../../constants/status";
import { TablePagination } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import AdminFormDialog from "../components/AdminFormDialog";
import ConfirmDialog from "../components/ConfirmDialog";

import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../store/snackbarSlice";
import type { AdminCity } from "../../../api/adminApi";

type AdminCityRow = {
  id: number;
  name: string;
  description: string;
  postOffice: string;
  numberOfHotels: number;
};

export default function AdminCitiesPage() {
  const {
    data,
    status,
    error,
    refetch,
    setSearch,
    page,
    setPage,
    pageSize,
    createCity,
    updateCity,
    deleteCity,
    totalItems,
  } = useAdminCities();

  const cities: AdminCity[] = data ?? [];
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<AdminCity | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<AdminCity | null>(null);

  const preparedRows: AdminCityRow[] = cities.map((city) => ({
    id: city.id,
    name: city.name || "",
    description: city.description || "",
    postOffice: city.postOffice ?? "",
    numberOfHotels: city.numberOfHotels ?? 0,
  }));

  const columns: Column[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "City Name" },
    { field: "description", headerName: "Description" },
    { field: "postOffice", headerName: "Post Office" },
    { field: "numberOfHotels", headerName: "Hotels" },
  ];

  function handleSearch(query: string) {
    setPage(1);
    setSearch(query.trim());
  }

  function handleCreate() {
    setEditingCity(null);
    setDialogOpen(true);
  }

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

  async function handleFormSubmit(values: Record<string, unknown>) {
    const payload = {
      name: String(values.name ?? ""),
      description: String(values.description ?? ""),
      postOffice: String(values.postOffice ?? ""),
      numberOfHotels: Number(values.numberOfHotels ?? 0),
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

  const citySchema = Yup.object({
    name: Yup.string().required("City name is required"),
    description: Yup.string().optional(),
    postOffice: Yup.string().notRequired(),
    numberOfHotels: Yup.number().min(0, "can't be negative").notRequired(),
  });

  const theme = useTheme();
  const tablePage = page > 0 ? page - 1 : 0;

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: 3,
        animation: theme.animations.fadeInUp,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <AdminToolbar onSearch={handleSearch} onCreate={handleCreate} />
        <Tooltip title="Reset page">
          <IconButton
            onClick={() => {
              setSearch("");
              setPage(1);
              refetch();
            }}
          >
            <RestartAltIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Tooltip>
      </Box>
      <TablePagination
        component="div"
        count={totalItems}
        page={tablePage}
        onPageChange={(_, newPage) => setPage(newPage + 1)}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[pageSize]}
      />

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
          postOffice: editingCity?.postOffice ?? "",
          numberOfHotels: editingCity?.numberOfHotels ?? 0,
        }}
        validationSchema={citySchema}
        fields={[
          { name: "name", label: "City Name", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "postOffice", label: "Post Office", type: "text" },
          { name: "numberOfHotels", label: "Number of Hotels", type: "number" },
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
