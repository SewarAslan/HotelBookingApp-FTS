import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import { useRoomAvailability } from "../hooks/useRoomAvailability";
import { STATUS } from "../../../constants/status";
import MessageCard from "../../../components/MessageCard";

interface AvailableRoomsSectionProps {
  hotelId: number;
  checkInDate?: string;
  checkOutDate?: string;
}

export default function AvailableRoomsSection({
  hotelId,
  checkInDate,
  checkOutDate,
}: AvailableRoomsSectionProps) {
  const theme = useTheme();
  const { data, status, error, refetch } = useRoomAvailability(
    hotelId,
    checkInDate,
    checkOutDate
  );

  // 🟡 الحالات العامة
  if (status !== STATUS.SUCCESS) {
    return (
      <MessageCard
        status={status}
        error={error}
        data={data}
        onRetry={refetch}
        message={
          status === STATUS.LOADING
            ? "Loading available rooms..."
            : status === STATUS.ERROR
            ? "Failed to load rooms"
            : "No rooms available for this hotel."
        }
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <MessageCard
        status={STATUS.SUCCESS}
        data={[]}
        message="No rooms available for this hotel."
      />
    );
  }

  // 🟢 الحالة الناجحة: عرض الغرف
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Available Rooms
      </Typography>

      <Stack spacing={3}>
        {data.map((room) => (
          <Card
            key={room.roomId}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              borderRadius: 3,
              overflow: "hidden",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0 4px 12px rgba(0,0,0,0.05)"
                  : "0 4px 12px rgba(0,0,0,0.3)",
              animation: theme.animations.fadeInUp,
            }}
          >
            {/* صورة الغرفة */}
            <CardMedia
              component="img"
              image={room.roomPhotoUrl ?? "/placeholder.jpg"}
              alt={room.roomType ?? "Room photo"}
              sx={{
                width: { xs: "100%", sm: 220 },
                height: { xs: 180, sm: "auto" },
                objectFit: "cover",
              }}
            />

            {/* تفاصيل الغرفة */}
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                {room.roomType ?? "Room"}
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Room #{room.roomNumber ?? "—"}
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Capacity: {room.capacityOfAdults} Adults,{" "}
                {room.capacityOfChildren} Children
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              {/* المرافق */}
              {room.roomAmenities && room.roomAmenities.length > 0 ? (
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {room.roomAmenities.map((a, i) => (
                    <Chip
                      key={i}
                      label={a.name}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ borderRadius: "6px", fontSize: "0.8rem" }}
                    />
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No amenities listed.
                </Typography>
              )}

              <Divider sx={{ my: 1.5 }} />

              {/* السعر */}
              <Typography variant="h6" color="primary">
                ${room.price?.toFixed(2)}
              </Typography>

              {/* التوفر */}
              <Typography
                variant="body2"
                color={room.availability ? "success.main" : "error.main"}
                mt={0.5}
              >
                {room.availability ? "Available" : "Not Available"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
