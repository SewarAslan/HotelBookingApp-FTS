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
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {items.map((item) => (
        <CheckoutItemCard key={item.roomId} item={item} />
      ))}
    </Box>
  );
}

function CheckoutItemCard({ item }: { item: CartItem }) {
  const theme = useTheme();
  const { removeFromCart } = useCart();

  const { data: hotel } = useHotelDetails(item.hotelId);

  const start = dayjs(item.checkInDate);
  const end = dayjs(item.checkOutDate);
  const nights = end.diff(start, "day");

  const finalPrice = (item.price as number) * nights;

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
          direction="row"
          justifyContent="space-around"
          alignItems={"center"}
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

        {/* 💰 السعر */}
        <Typography
          variant={MUI_TYPOGRAPHY.BODY1}
          fontWeight={700}
          sx={{ color: theme.palette.primary.main }}
        >
          Total: ${finalPrice}
        </Typography>
      </CardContent>
    </Card>
  );
}
