import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import type { CartItem } from "../../../store/cartSlice";
import { useCart } from "../hooks/useCart";
import { useHotelDetails } from "../../hotel/hooks";
import dayjs from "dayjs";
import { PLACEHOLDERS } from "../../../constants/placeHolders";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import ConfirmDialog from "../../admin/components/ConfirmDialog";

export function CheckoutItemCard({ item }: { item: CartItem }) {
  const theme = useTheme();
  const { removeFromCart } = useCart();
  const { data: hotel } = useHotelDetails(item.hotelId);

  const start = dayjs(item.checkInDate);
  const end = dayjs(item.checkOutDate);
  const nights = Math.max(end.diff(start, "day"), 1);
  const pricePerNight = item.price ?? 0;
  const lineTotal = pricePerNight * nights;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleConfirmDelete = () => {
    removeFromCart(item.roomId as number);
    setConfirmOpen(false);
  };
  return (
    <>
      <Card
        elevation={4}
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
            src={item.roomPhotoUrl || PLACEHOLDERS.ROOM}
            alt={item.roomType || "Room Image"}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant={MUI_TYPOGRAPHY.H6}
              fontWeight={700}
              sx={{ color: theme.palette.primary.main }}
            >
              {hotel?.hotelName || "Hotel"}
            </Typography>

            <IconButton
              size="small"
              sx={{
                color: theme.palette.error.light,
                "&:hover": { color: theme.palette.error.main },
              }}
              onClick={() => setConfirmOpen(true)}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography
            variant={MUI_TYPOGRAPHY.BODY1}
            fontWeight={600}
            color={theme.palette.secondary.main}
          >
            {item.roomType}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
          >
            <Typography
              variant={MUI_TYPOGRAPHY.BODY2}
              color={theme.palette.text.secondary}
            >
              Check-in:{" "}
              <strong style={{ color: theme.palette.secondary.dark }}>
                {start.format("YYYY-MM-DD")}
              </strong>
            </Typography>

            <Typography
              variant={MUI_TYPOGRAPHY.BODY2}
              color={theme.palette.text.secondary}
            >
              Check-out:{" "}
              <strong style={{ color: theme.palette.secondary.dark }}>
                {end.format("YYYY-MM-DD")}
              </strong>
            </Typography>

            <Typography
              variant={MUI_TYPOGRAPHY.BODY2}
              color={theme.palette.text.secondary}
            >
              Nights:{" "}
              <strong style={{ color: theme.palette.secondary.dark }}>
                {nights}
              </strong>
            </Typography>
          </Stack>

          <Divider sx={{ my: 1 }} />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant={MUI_TYPOGRAPHY.BODY2}
              color={theme.palette.text.secondary}
            >
              Price / night:{" "}
              <strong style={{ color: theme.palette.secondary.dark }}>
                ${pricePerNight.toFixed(2)}
              </strong>
            </Typography>

            <Typography
              variant={MUI_TYPOGRAPHY.BODY1}
              fontWeight={700}
              sx={{ color: theme.palette.primary.main }}
            >
              Total: ${lineTotal.toFixed(2)}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Room"
        message="Are you sure you want to remove this room from cart?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
