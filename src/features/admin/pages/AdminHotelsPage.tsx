import { useState } from "react";
import { Box } from "@mui/material";
import AdminToolbar from "../components/AdminToolbar";
import AdminTable, { type Column } from "../components/AdminTable";
import MessageCard from "../../../components/MessageCard";
import { STATUS } from "../../../constants/status";

import AdminFormDialog from "../components/AdminFormDialog";
import ConfirmDialog from "../components/ConfirmDialog";

import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../store/snackbarSlice";

import * as Yup from "yup";
import {
  useAdminHotels,
  type AdminHotel,
  type HotelPayload,
} from "../hooks/useAdminHotels";

//
// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
//

type AdminHotelRow = {
  id: number;
  hotelName: string;
  hotelType: string;
  starRating: number | string;
  location: string;
  description: string;
};

//
// ------------------------------------------------------------
// Component
// ------------------------------------------------------------
//

export default function AdminHotelsPage() {
  const {
    data,
    status,
    error,
    refetch,
    setSearch,
    setPage,
    createHotel,
    updateHotel,
    deleteHotel,
  } = useAdminHotels();

  const hotels: AdminHotel[] = data ?? [];
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<AdminHotel | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<AdminHotel | null>(null);

  //
  // ------------------------------------------------------------
  // Prepare rows for table
  // ------------------------------------------------------------
  //

  const preparedRows: AdminHotelRow[] = hotels.map((h) => ({
    id: h.id,
    hotelName: h.hotelName || h.name || "",
    hotelType: h.hotelType || "",
    starRating: h.starRating ?? "",
    location: h.location || "",
    description: h.description || "",
  }));

  //
  // ------------------------------------------------------------
  // Columns
  // ------------------------------------------------------------
  //

  const columns: Column[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "hotelName", headerName: "Hotel Name" },
    { field: "hotelType", headerName: "Type" },
    { field: "starRating", headerName: "Stars" },
    { field: "location", headerName: "Location" },
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
    setEditingHotel(null);
    setDialogOpen(true);
  }

  // Table sends AdminHotelRow → we convert back to AdminHotel
  function handleRowClick(row: AdminHotelRow) {
    const hotel = hotels.find((h) => h.id === row.id) ?? null;
    setEditingHotel(hotel);
    setDialogOpen(true);
  }

  function handleDeleteClick(row: AdminHotelRow) {
    const hotel = hotels.find((h) => h.id === row.id) ?? null;
    setSelectedHotel(hotel);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!selectedHotel) return;

    const result = await deleteHotel(selectedHotel.id);

    dispatch(
      showSnackbar({
        message: result.success
          ? "Hotel deleted successfully"
          : result.error || "Delete failed",
        severity: result.success ? "success" : "error",
      })
    );

    setDeleteDialogOpen(false);
    setSelectedHotel(null);
    refetch();
  }

  //
  // ------------------------------------------------------------
  // Form submit
  // ------------------------------------------------------------
  //

  async function handleFormSubmit(values: Record<string, unknown>) {
    const payload: HotelPayload = {
      hotelName: String(values.hotelName ?? values.name ?? ""),
      description: String(values.description ?? ""),
      hotelType: String(values.hotelType ?? ""),
      starRating: Number(values.starRating),
      location: String(values.location ?? ""),
    };

    let result;

    if (editingHotel) {
      result = await updateHotel(editingHotel.id, payload);
    } else {
      result = await createHotel(payload);
    }

    dispatch(
      showSnackbar({
        message: result.success
          ? editingHotel
            ? "Hotel updated successfully"
            : "Hotel created successfully"
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

  const hotelSchema = Yup.object({
    hotelName: Yup.string().required("Hotel name is required"),
    description: Yup.string(),
    hotelType: Yup.string(),
    starRating: Yup.number()
      .typeError("Stars must be a number")
      .min(1)
      .max(5)
      .required("Star rating is required"),
    location: Yup.string(),
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
          error={error ?? "Failed to load hotels"}
          onRetry={refetch}
          data={null}
        />
      ) : (
        <AdminTable
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
        title={editingHotel ? "Update Hotel" : "Create Hotel"}
        submitLabel={editingHotel ? "Update" : "Create"}
        initialValues={{
          hotelName: editingHotel?.hotelName ?? editingHotel?.name ?? "",
          description: editingHotel?.description ?? "",
          hotelType: editingHotel?.hotelType ?? "",
          starRating: editingHotel?.starRating ?? 1,
          location: editingHotel?.location ?? "",
        }}
        validationSchema={hotelSchema}
        fields={[
          { name: "hotelName", label: "Hotel Name", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "hotelType", label: "Hotel Type", type: "text" },
          { name: "starRating", label: "Star Rating", type: "number" },
          { name: "location", label: "Location", type: "text" },
        ]}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Hotel"
        message={
          selectedHotel
            ? `Are you sure you want to delete "${
                selectedHotel.hotelName ?? selectedHotel.name
              }"?`
            : "Are you sure you want to delete this hotel?"
        }
      />
    </Box>
  );
}
