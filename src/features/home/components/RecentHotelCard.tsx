import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import type { RecentHotelResultDto } from "../../../api/HotelBookingApi";
import { PLACEHOLDERS } from "../../../constants/placeHolders";
interface RecentHotelCardProps {
  hotel: RecentHotelResultDto;
}

const RecentHotelCard = React.memo(({ hotel }: RecentHotelCardProps) => {
  const theme = useTheme();

  const {
    hotelName,
    starRating,
    visitDate,
    cityName,
    thumbnailUrl,
    priceLowerBound,
    priceUpperBound,
  } = hotel;

  const formattedDate = visitDate
    ? new Date(visitDate).toISOString().split("T")[0]
    : null;

  return (
    <Card
      elevation={3}
      sx={{
        maxWidth: 300,
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        animation: theme.animations.fadeInUp,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 6px 22px rgba(124, 58, 237, 0.15)"
              : "0 6px 22px rgba(167, 139, 250, 0.25)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={thumbnailUrl || PLACEHOLDERS.ROOM}
          alt={hotelName || "Hotel"}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDERS.ROOM;
          }}
          sx={{ height: 160, objectFit: "cover" }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            bgcolor: "rgba(0,0,0,0.4)",
            color: "#fff",
            px: 1.5,
            py: 0.5,
            fontSize: 12,
            fontWeight: 500,
            backdropFilter: "blur(2px)",
          }}
        >
          Recently Visited
        </Box>
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            color="text.primary"
            noWrap
          >
            {hotelName || "Unknown Hotel"}
          </Typography>
          {cityName && (
            <Typography variant="caption" color="text.secondary">
              {cityName}
            </Typography>
          )}
        </Box>

        {starRating && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                fontSize="small"
                sx={{
                  color:
                    i < Math.floor(starRating)
                      ? "#facc15"
                      : theme.palette.action.disabled,
                }}
              />
            ))}
          </Box>
        )}

        {(priceLowerBound || priceUpperBound) && (
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.brand.violet,
              fontWeight: 600,
              mt: 1,
            }}
          >
            From ${priceLowerBound ?? "-"} - ${priceUpperBound ?? "-"}
          </Typography>
        )}

        {formattedDate && (
          <Typography
            variant="caption"
            color="text.secondary"
            fontStyle="italic"
            sx={{ mt: 0.5 }}
          >
            Visited on {formattedDate}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
});

RecentHotelCard.displayName = "RecentHotelCard";
export default RecentHotelCard;
