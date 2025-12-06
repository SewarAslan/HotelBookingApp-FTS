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
import { useAdminRooms } from "../hooks/useAdminRooms";
import type { AdminRoom } from "../../../api/adminApi";

//
// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
//

// Table rows type
type AdminRoomRow = {
  roomId: number;
  roomNumber: number;
  roomType: string;
  price: number;
  availability: boolean;
  capacityOfAdults: number;
  capacityOfChildren: number;
};

//
// ------------------------------------------------------------
// Component
// ------------------------------------------------------------
//

export default function AdminRoomsPage({ hotelId }: { hotelId: number }) {
  const { data, status, error, refetch, createRoom, updateRoom, deleteRoom } =
    useAdminRooms(hotelId);

  const rooms: AdminRoom[] = data ?? [];
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<AdminRoom | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<AdminRoom | null>(null);

  //
  // ------------------------------------------------------------
  // Prepare rows for table
  // ------------------------------------------------------------
  //

  const preparedRows: AdminRoomRow[] = rooms.map((r) => ({
    roomId: r.roomId,
    roomNumber: r.roomNumber,
    roomType: r.roomType,
    price: r.price,
    availability: r.availability,
    capacityOfAdults: r.capacityOfAdults,
    capacityOfChildren: r.capacityOfChildren,
  }));

  //
  // ------------------------------------------------------------
  // Columns
  // ------------------------------------------------------------
  //

  const columns: Column[] = [
    { field: "roomId", headerName: "ID", width: 80 },
    { field: "roomNumber", headerName: "Room Number" },
    { field: "roomType", headerName: "Type" },
    { field: "price", headerName: "Price" },
    { field: "availability", headerName: "Available" },
  ];

  //
  // ------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------
  //

  function handleCreate() {
    setEditingRoom(null);
    setDialogOpen(true);
  }

  function handleRowClick(row: AdminRoomRow) {
    const room = rooms.find((r) => r.roomId === row.roomId) ?? null;
    setEditingRoom(room);
    setDialogOpen(true);
  }

  function handleDeleteClick(row: AdminRoomRow) {
    const room = rooms.find((r) => r.roomId === row.roomId) ?? null;
    setSelectedRoom(room);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!selectedRoom) return;

    const result = await deleteRoom(selectedRoom.roomId);

    dispatch(
      showSnackbar({
        message: result.success
          ? "Room deleted successfully"
          : result.error || "Delete failed",
        severity: result.success ? "success" : "error",
      })
    );

    setDeleteDialogOpen(false);
    setSelectedRoom(null);
    refetch();
  }

  //
  // ------------------------------------------------------------
  // Submit form
  // ------------------------------------------------------------
  //

  async function handleFormSubmit(values: Record<string, unknown>) {
    const payload = {
      roomNumber: Number(values.roomNumber),
      roomPhotoUrl: String(values.roomPhotoUrl || ""),
      roomType: String(values.roomType),
      capacityOfAdults: Number(values.capacityOfAdults),
      capacityOfChildren: Number(values.capacityOfChildren),
      price: Number(values.price),
      availability: Boolean(values.availability),
    };

    let result;

    if (editingRoom) {
      result = await updateRoom(editingRoom.roomId, payload);
    } else {
      result = await createRoom(payload);
    }

    dispatch(
      showSnackbar({
        message: result.success
          ? editingRoom
            ? "Room updated successfully"
            : "Room created successfully"
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

  const roomSchema = Yup.object({
    roomNumber: Yup.number()
      .typeError("Room number must be a number")
      .required("Required"),
    roomType: Yup.string().required("Room Type is required"),
    price: Yup.number().typeError("Price must be number").required("Required"),
    capacityOfAdults: Yup.number()
      .typeError("Adults capacity must be a number")
      .required(),
    capacityOfChildren: Yup.number()
      .typeError("Children capacity must be a number")
      .required(),
    availability: Yup.boolean().required(),
    roomPhotoUrl: Yup.string().optional(),
  });

  //
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  //

  return (
    <Box sx={{ p: 2 }}>
      <AdminToolbar onCreate={handleCreate} />

      {status === STATUS.ERROR ? (
        <MessageCard
          status="error"
          error={error || "Failed to load rooms"}
          onRetry={refetch}
          data={null}
        />
      ) : (
        <AdminTable<AdminRoomRow>
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
        title={editingRoom ? "Update Room" : "Create Room"}
        submitLabel={editingRoom ? "Update" : "Create"}
        initialValues={{
          roomNumber: editingRoom?.roomNumber ?? "",
          roomType: editingRoom?.roomType ?? "",
          price: editingRoom?.price ?? "",
          availability: editingRoom?.availability ?? false,
          capacityOfAdults: editingRoom?.capacityOfAdults ?? "",
          capacityOfChildren: editingRoom?.capacityOfChildren ?? "",
          roomPhotoUrl: editingRoom?.roomPhotoUrl ?? "",
        }}
        validationSchema={roomSchema}
        fields={[
          { name: "roomNumber", label: "Room Number", type: "number" },
          { name: "roomType", label: "Room Type", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "capacityOfAdults", label: "Adults", type: "number" },
          { name: "capacityOfChildren", label: "Children", type: "number" },

          {
            name: "availability",
            label: "Available",
            type: "select",
            options: [
              { label: "Available", value: "true" },
              { label: "Not Available", value: "false" },
            ],
          },

          { name: "roomPhotoUrl", label: "Photo URL", type: "text" },
        ]}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Room"
        message={
          selectedRoom
            ? `Delete room #${selectedRoom.roomNumber}?`
            : "Are you sure?"
        }
      />
    </Box>
  );
}
