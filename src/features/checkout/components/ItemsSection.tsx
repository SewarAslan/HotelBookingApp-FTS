import { Box, Card, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import type { CartItem } from "../../../store/cartSlice";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";
import { CheckoutItemCard } from "./CheckoutItemCard";

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
