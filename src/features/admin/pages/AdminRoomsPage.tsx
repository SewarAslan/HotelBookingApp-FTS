import { useState } from "react";
import { Box, useTheme } from "@mui/material";
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
import HotelSelector from "../components/HotelSelector";

type AdminRoomRow = {
  roomId: number;
  roomNumber: number;
  roomType: string;
  price: number;
  availability: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
};

export default function AdminRoomsPage() {
  const [hotelId, setHotelId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const roomsHook = useAdminRooms(hotelId);

  const data = roomsHook?.data ?? [];
  const status = roomsHook?.status ?? STATUS.IDLE;
  const error = roomsHook?.error ?? null;

  const refetch = roomsHook?.refetch ?? (() => {});
  const createRoom =
    roomsHook?.createRoom ?? (() => Promise.resolve({ success: false }));
  const updateRoom =
    roomsHook?.updateRoom ?? (() => Promise.resolve({ success: false }));
  const deleteRoom =
    roomsHook?.deleteRoom ?? (() => Promise.resolve({ success: false }));

  const rooms: AdminRoom[] = data ?? [];

  function handleSearch(query: string) {
    setSearch(query.trim());
  }

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<AdminRoom | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<AdminRoom | null>(null);

  const filteredRooms = rooms.filter((r) =>
    r.roomNumber.toString().includes(search)
  );

  const preparedRows: AdminRoomRow[] = filteredRooms.map((r) => ({
    roomId: r.roomId,
    roomNumber: r.roomNumber,
    roomType: r.roomType,
    price: r.price,
    availability: r.availability ? "Available" : "Not Available",
    capacityOfAdults: r.capacityOfAdults,
    capacityOfChildren: r.capacityOfChildren,
  }));

  const columns: Column[] = [
    { field: "roomId", headerName: "ID", width: 80 },
    { field: "roomNumber", headerName: "Room Number" },
    { field: "roomType", headerName: "Type" },
    { field: "price", headerName: "Price" },
    { field: "availability", headerName: "Availability" },
  ];

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

  async function handleFormSubmit(values: Record<string, unknown>) {
    const payload = {
      roomNumber: Number(values.roomNumber),
      roomPhotoUrl: String(values.roomPhotoUrl || ""),
      roomType: String(values.roomType),
      capacityOfAdults: Number(values.capacityOfAdults),
      capacityOfChildren: Number(values.capacityOfChildren),
      price: Number(values.price),
      availability: values.availability === "true",
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

  const roomSchema = Yup.object({
    roomNumber: Yup.number()
      .typeError("Room number must be a number")
      .required(),
    roomType: Yup.string().required(),
    price: Yup.number().typeError("Price must be a number").required(),
    capacityOfAdults: Yup.number().required(),
    capacityOfChildren: Yup.number().required(),
    availability: Yup.string().required(),
    roomPhotoUrl: Yup.string().optional(),
  });
  const theme = useTheme();
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: 3,
        animation: theme.animations.fadeInUp,
      }}
    >
      <HotelSelector value={hotelId} onChange={setHotelId} />

      {!hotelId && (
        <MessageCard
          status="info"
          data="Please choose a hotel to view its rooms."
        />
      )}

      {hotelId && (
        <Box sx={{ marginTop: "10px" }}>
          <AdminToolbar onSearch={handleSearch} onCreate={handleCreate} />

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
        </Box>
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
          availability: editingRoom?.availability ? "true" : "false",
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
