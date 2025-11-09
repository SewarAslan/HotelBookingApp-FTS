import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useTheme,
  Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import type { SearchResultDto } from "../../../api/HotelBookingApi";
import { PLACEHOLDERS } from "../../../constants/placeHolders";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

interface ResultCardProps {
  data: SearchResultDto;
}

const ResultCard = React.memo(({ data }: ResultCardProps) => {
  const theme = useTheme();
  const {
    hotelName,
    cityName,
    roomPhotoUrl,
    starRating,
    roomType,
    roomPrice,
    discount,
  } = data;

  const discountedPrice = discount
    ? roomPrice && roomPrice - roomPrice * discount
    : roomPrice;

  return (
    <Card
      elevation={3}
      sx={{
        width: 300,
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={roomPhotoUrl || PLACEHOLDERS.ROOM}
          alt={hotelName || "Hotel"}
          sx={{ height: 160, objectFit: "cover" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDERS.ROOM;
          }}
        />
        {discount && discount > 0 && (
          <Chip
            label={`-${Math.round(discount * 100)}%`}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: theme.palette.secondary.main,
              color: "#fff",
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      <CardContent>
        <Typography variant={MUI_TYPOGRAPHY.H6} fontWeight={600}>
          {hotelName}
        </Typography>
        <Typography
          variant={MUI_TYPOGRAPHY.BODY2}
          color={theme.palette.text.secondary}
        >
          {cityName}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              fontSize="small"
              sx={{
                color:
                  i < Math.floor(starRating ?? 0)
                    ? theme.palette.brand.yellow
                    : theme.palette.action.disabled,
              }}
            />
          ))}
        </Box>

        <Typography
          variant={MUI_TYPOGRAPHY.BODY2}
          color={theme.palette.text.secondary}
          mt={0.5}
        >
          {roomType}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center" }}>
          {discount && (
            <Typography
              variant={MUI_TYPOGRAPHY.BODY2}
              sx={{
                textDecoration: "line-through",
                color: theme.palette.text.disabled,
              }}
            >
              ${roomPrice?.toFixed(0)}
            </Typography>
          )}
          <Typography
            variant={MUI_TYPOGRAPHY.BODY1}
            fontWeight={700}
            color={theme.palette.primary.main}
          >
            ${discountedPrice?.toFixed(0)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
