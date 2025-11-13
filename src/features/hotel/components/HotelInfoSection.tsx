import { Box, Typography, Divider, Stack, Chip, useTheme } from "@mui/material";
import { useHotelDetails, useHotelAmenities } from "../hooks";
import { STATUS } from "../../../constants/status";
import MessageCard from "../../../components/MessageCard";

interface HotelInfoSectionProps {
  hotelId: number;
}

export default function HotelInfoSection({ hotelId }: HotelInfoSectionProps) {
  const theme = useTheme();
  const {
    data: hotel,
    status: hotelStatus,
    error: hotelError,
    refetch: refetchHotel,
  } = useHotelDetails(hotelId);

  const {
    data: amenities,
    status: amenityStatus,
    error: amenityError,
    refetch: refetchAmenities,
  } = useHotelAmenities(hotelId);

  // 🟡 عرض الحالة العامة (loading / error / empty)
  if (hotelStatus !== STATUS.SUCCESS) {
    return (
      <MessageCard
        status={hotelStatus}
        error={hotelError}
        onRetry={refetchHotel}
        message={
          hotelStatus === STATUS.LOADING
            ? "Loading hotel details..."
            : hotelStatus === STATUS.ERROR
            ? "Failed to load hotel details"
            : "No hotel details found."
        }
      />
    );
  }

  if (!hotel)
    return (
      <MessageCard
        status={STATUS.SUCCESS}
        data={[]}
        message="No hotel details found."
      />
    );

  // 🟢 الحالة الناجحة:
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 4px 18px rgba(0,0,0,0.05)"
            : "0 4px 18px rgba(0,0,0,0.25)",
        background: theme.palette.background.paper,
        animation: theme.animations.fadeInUp,
      }}
    >
      {/* 🏨 Hotel name */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {hotel.name ?? "Unnamed Hotel"}
      </Typography>

      {/* ⭐ Rating */}
      {hotel.starRating ? (
        <Typography variant="body2" color="text.secondary" mb={1}>
          {"⭐".repeat(hotel.starRating)} ({hotel.starRating} Stars)
        </Typography>
      ) : (
        <Typography variant="body2" color="text.secondary" mb={1}>
          No rating available
        </Typography>
      )}

      {/* 🗺️ Location */}
      {hotel.latitude && hotel.longitude && (
        <Typography variant="body2" color="text.secondary" mb={2}>
          📍 Coordinates: {hotel.latitude.toFixed(3)},{" "}
          {hotel.longitude.toFixed(3)}
        </Typography>
      )}

      <Divider sx={{ my: 2 }} />

      {/* 📝 Description */}
      <Typography variant="body1" mb={2}>
        {hotel.description ?? "No description provided for this hotel."}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* 🏋️ Amenities */}
      <Typography variant="h6" mb={1}>
        Amenities
      </Typography>

      {amenityStatus !== STATUS.SUCCESS ? (
        <MessageCard
          status={amenityStatus}
          error={amenityError}
          data={amenities}
          onRetry={refetchAmenities}
          message={
            amenityStatus === STATUS.LOADING
              ? "Loading amenities..."
              : amenityStatus === STATUS.ERROR
              ? "Failed to load amenities"
              : "No amenities available."
          }
        />
      ) : amenities && amenities.length > 0 ? (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {amenities.map((a, i) => (
            <Chip
              key={i}
              label={a.name}
              color="primary"
              variant="outlined"
              sx={{ borderRadius: "8px", fontSize: "0.9rem" }}
            />
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary" fontSize="0.9rem">
          No amenities available.
        </Typography>
      )}
    </Box>
  );
}
