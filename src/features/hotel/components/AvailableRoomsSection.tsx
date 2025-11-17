import { Box, Typography, useTheme } from "@mui/material";
import MessageCard from "../../../components/MessageCard";
import { STATUS } from "../../../constants/status";
import { useRoomAvailability } from "../hooks/useRoomAvailability";
import { useRoom } from "../hooks/useRoom";
import RoomCard from "./RoomCard";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";
import { useLocation } from "react-router-dom";

interface Props {
  hotelId: number;
}

export default function AvailableRoomsSection({ hotelId }: Props) {
  const theme = useTheme();
  const location = useLocation();

  // 📌 Read URL params
  const params = new URLSearchParams(location.search);
  const urlCheckIn = params.get("checkInDate");
  const urlCheckOut = params.get("checkOutDate");

  const shouldUseAvailability = Boolean(urlCheckIn && urlCheckOut);

  const availability = useRoomAvailability(
    hotelId,
    urlCheckIn || "",
    urlCheckOut || ""
  );

  const allRooms = useRoom(hotelId);

  const data = shouldUseAvailability ? availability.data : allRooms.data;
  const status = shouldUseAvailability ? availability.status : allRooms.status;
  const error = shouldUseAvailability ? availability.error : allRooms.error;
  const refetch = shouldUseAvailability
    ? availability.refetch
    : allRooms.refetch;

  if (status !== STATUS.SUCCESS) {
    return (
      <MessageCard
        status={status}
        error={error}
        data={data}
        message={
          status === STATUS.LOADING
            ? shouldUseAvailability
              ? "Loading available rooms..."
              : "Loading rooms..."
            : "Failed to load rooms"
        }
        onRetry={refetch}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <MessageCard
        status={STATUS.SUCCESS}
        data={[]}
        message={
          shouldUseAvailability
            ? "No rooms available for the selected dates."
            : "No rooms found."
        }
      />
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      <Typography
        variant={MUI_TYPOGRAPHY.H5}
        fontWeight={900}
        color={theme.palette.primary.main}
        mb={1}
      >
        {shouldUseAvailability ? "Available Rooms" : "All Rooms"}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {data.map((room) => (
          <RoomCard
            key={room.roomId}
            room={room}
            hotelId={hotelId}
            checkInDate={urlCheckIn ?? ""}
            checkOutDate={urlCheckOut ?? ""}
          />
        ))}
      </Box>
    </Box>
  );
}
