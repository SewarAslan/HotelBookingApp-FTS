import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Stack,
  useTheme,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { useHotelDetails } from "../../hotel/hooks/useHotelDetails";
import type { CartItem } from "../../../store/cartSlice";
import { PLACEHOLDERS } from "../../../constants/placeHolders";
import { useCart } from "../hooks/useCart";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

interface ItemsSectionProps {
  items: CartItem[];
}

export default function ItemsSection({ items }: ItemsSectionProps) {
  const theme = useTheme();

  const grandTotal = items.reduce((sum, item) => {
    const start = dayjs(item.checkInDate);
    const end = dayjs(item.checkOutDate);
    const nights = Math.max(end.diff(start, "day"), 1);
    const lineTotal = (item.price ?? 0) * nights;
    return sum + lineTotal;
  }, 0);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {items.map((item) => (
        <CheckoutItemCard key={item.roomId} item={item} />
      ))}

      <Card
        elevation={3}
        sx={{
          mt: 1,
          p: 2,
          borderRadius: 3,
          backgroundColor: theme.palette.customBackgrounds.glass,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant={MUI_TYPOGRAPHY.BODY1}
            fontWeight={700}
            color={theme.palette.secondary.main}
          >
            Total for all rooms
          </Typography>
          <Typography
            variant={MUI_TYPOGRAPHY.H6}
            fontWeight={800}
            color={theme.palette.primary.main}
          >
            ${grandTotal.toFixed(2)}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

function CheckoutItemCard({ item }: { item: CartItem }) {
  const theme = useTheme();
  const { removeFromCart } = useCart();
  const { data: hotel } = useHotelDetails(item.hotelId);

  const start = dayjs(item.checkInDate);
  const end = dayjs(item.checkOutDate);
  const nights = Math.max(end.diff(start, "day"), 1);
  const pricePerNight = item.price ?? 0;
  const lineTotal = pricePerNight * nights;

  return (
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
            onClick={() => removeFromCart(item.roomId as number)}
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
  );
}
