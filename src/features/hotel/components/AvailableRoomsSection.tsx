import { Box, Typography, useTheme } from "@mui/material";
import MessageCard from "../../../components/MessageCard";
import { STATUS } from "../../../constants/status";
import { useRoomAvailability } from "../hooks/useRoomAvailability";
import RoomCard from "./RoomCard";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

interface Props {
  hotelId: number;
  checkInDate: string;
  checkOutDate: string;
}

export default function AvailableRoomsSection({
  hotelId,
  checkInDate,
  checkOutDate,
}: Props) {
  const theme = useTheme();
  const { data, status, error, refetch } = useRoomAvailability(
    hotelId,
    checkInDate,
    checkOutDate
  );

  if (status !== STATUS.SUCCESS) {
    return (
      <MessageCard
        status={status}
        error={error}
        data={data}
        message={
          status === STATUS.LOADING
            ? "Loading available rooms..."
            : status === STATUS.ERROR
            ? "Failed to load rooms"
            : "No rooms found"
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
        message="No rooms available for the selected dates."
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
        Available Rooms
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {data.map((room) => (
          <RoomCard key={room.roomId} room={room} />
        ))}
      </Box>
    </Box>
  );
}
