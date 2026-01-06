import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  useTheme,
  Container,
  Tooltip,
  Button,
} from "@mui/material";
import type { RoomAvailabilityResultDto } from "../../../api/Api";
import { PLACEHOLDERS } from "../../../constants/placeHolders";
import {
  MUI_COLORS,
  MUI_TYPOGRAPHY,
  MUI_VARIANTS,
} from "../../../constants/muiTokens";
import { useCart } from "../../checkout/hooks/useCart";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../store/snackbarSlice";
import { useAuthActions } from "../../auth";
export default function RoomCard({
  room,
  hotelId,
  checkInDate,
  checkOutDate,
}: {
  room: RoomAvailabilityResultDto;
  hotelId: number;
  checkInDate?: string;
  checkOutDate?: string;
}) {
  const amenities = room.roomAmenities ?? [];
  const theme = useTheme();
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const { authUser } = useAuthActions();
  console.log("ROOM CARD DATA:", room);

  return (
    <Card
      elevation={3}
      sx={{
        backgroundColor: theme.palette.customBackgrounds.glass,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "stretch",
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "translateY(-4px)" },
        width: "100%",
        maxWidth: 900,
        mx: "auto",
      }}
    >
      <Box sx={{ position: "relative", flexShrink: 0 }}>
        <CardMedia
          component="img"
          src={room.roomPhotoUrl ?? PLACEHOLDERS.ROOM}
          alt={room.roomType ?? "Room Image"}
          sx={{
            width: { xs: "100%", sm: 180 },
            height: { xs: 180, sm: "100%" },
            objectFit: "cover",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDERS.ROOM;
          }}
        />
      </Box>

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2.5,
        }}
      >
        <Box>
          <Container
            disableGutters
            sx={{
              display: "flex",

              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                variant={MUI_TYPOGRAPHY.H6}
                fontWeight={700}
                sx={{
                  color: theme.palette.secondary.main,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {room.roomType}
              </Typography>
              <Typography
                variant={MUI_TYPOGRAPHY.CAPTION}
                fontWeight={500}
                color={theme.palette.primary.main}
              >
                Room #{room.roomNumber}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant={MUI_TYPOGRAPHY.BODY1}
                fontWeight={700}
                color={theme.palette.primary.main}
              >
                ${room.price} / night
              </Typography>
            </Box>
          </Container>

          <Container
            disableGutters
            sx={{
              display: "flex",
              gap: 2,
              py: 1,
            }}
          >
            <Typography
              variant={MUI_TYPOGRAPHY.BODY2}
              color="text.secondary"
              fontWeight={700}
            >
              Adults : {room.capacityOfAdults}
            </Typography>
            <Typography
              variant={MUI_TYPOGRAPHY.BODY2}
              color="text.secondary"
              fontWeight={700}
            >
              Children : {room.capacityOfChildren}
            </Typography>
          </Container>

          {amenities?.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {amenities.map((amenity) => (
                  <Tooltip
                    key={amenity.name}
                    title={amenity.description || "No description"}
                    placement="top"
                    arrow
                  >
                    <Chip
                      label={amenity.name}
                      color={MUI_COLORS.PRIMARY}
                      variant={MUI_VARIANTS.OUTLINED}
                      sx={{
                        borderRadius: 3,
                        fontWeight: 600,
                        px: 1.5,
                        py: 1.5,
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
        {authUser?.userType === "User" && (
          <>
            <Button
              variant="gradient-secondary"
              disabled={!(checkInDate && checkOutDate)}
              sx={{
                fontWeight: 600,
                mt: 2,
                mb: 1,

                borderRadius: 2,
              }}
              onClick={(e) => {
                e.stopPropagation();

                addToCart({
                  roomId: room.roomId,
                  hotelId,
                  roomType: room.roomType,
                  roomPhotoUrl: room.roomPhotoUrl,
                  price: room.price,
                  capacityOfAdults: room.capacityOfAdults,
                  capacityOfChildren: room.capacityOfChildren,
                  checkInDate: checkInDate!,
                  checkOutDate: checkOutDate!,
                });

                dispatch(
                  showSnackbar({
                    message: "Room added to cart!",
                    severity: "success",
                  })
                );
              }}
            >
              Book Now
            </Button>
            {authUser?.userType === "User" && !checkInDate && !checkOutDate && (
              <Typography
                variant={MUI_TYPOGRAPHY.CAPTION}
                color="text.secondary"
                fontWeight={400}
              >
                You have to select the Check-In and the check-Out date to book
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
