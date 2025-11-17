import {
  Typography,
  Divider,
  Stack,
  Chip,
  useTheme,
  Card,
  CardContent,
  Box,
  Tooltip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { useHotelDetails, useHotelAmenities } from "../hooks";
import { STATUS } from "../../../constants/status";
import MessageCard from "../../../components/MessageCard";
import {
  MUI_COLORS,
  MUI_SIZES,
  MUI_TYPOGRAPHY,
  MUI_VARIANTS,
} from "../../../constants/muiTokens";
import MapSection from "./MapSection";

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

  if (hotelStatus !== STATUS.SUCCESS || !hotel) {
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

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        animation: theme.animations.fadeInUp,
        background: theme.palette.customBackgrounds.glass,
      }}
    >
      <CardContent>
        <Typography
          variant={MUI_TYPOGRAPHY.H5}
          fontWeight={900}
          color={theme.palette.primary.main}
        >
          {hotel.hotelName ?? "Unnamed Hotel"}
        </Typography>

        {hotel.latitude && hotel.location && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOnIcon
              fontSize={MUI_SIZES.SMALL}
              color={MUI_COLORS.SECONDARY}
            />
            <Typography
              variant={MUI_TYPOGRAPHY.BODY1}
              color={MUI_COLORS.SECONDARY}
              fontWeight={500}
            >
              {hotel.location}
            </Typography>
          </Stack>
        )}
        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5, mb: 2 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              fontSize="small"
              sx={{
                color:
                  i < Math.floor(hotel.starRating ?? 0)
                    ? theme.palette.brand.yellow
                    : theme.palette.action.disabled,
              }}
            />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant={MUI_TYPOGRAPHY.BODY2}
          mb={2}
          color="text.secondary"
          fontWeight={400}
        >
          {hotel.description ?? "No description provided for this hotel."}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant={MUI_TYPOGRAPHY.H6}
          fontWeight={600}
          color={MUI_COLORS.PRIMARY}
          mb={1}
        >
          Location
        </Typography>
        <MapSection hotelId={hotelId} />
        <Divider sx={{ my: 2 }} />

        <Typography
          variant={MUI_TYPOGRAPHY.H6}
          fontWeight={600}
          color={MUI_COLORS.PRIMARY}
          mb={1}
        >
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
            {amenities.map((a) => (
              <Tooltip
                key={a.id}
                title={a.description || "No description"}
                placement="top"
                arrow
              >
                <Chip
                  label={a.name}
                  color={MUI_COLORS.SECONDARY}
                  variant={MUI_VARIANTS.OUTLINED}
                  sx={{
                    borderRadius: 3,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.5,
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            ))}
          </Stack>
        ) : (
          <Typography color={MUI_COLORS.SECONDARY} fontSize="0.9rem">
            No amenities available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
