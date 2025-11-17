import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import type { SearchResultDto } from "../../../api/Api";
import { PLACEHOLDERS } from "../../../constants/placeHolders";
import { MUI_SIZES, MUI_TYPOGRAPHY } from "../../../constants/muiTokens";
import { useNavigate, useLocation } from "react-router-dom";

interface ResultCardProps {
  data: SearchResultDto;
}

const ResultCard = React.memo(({ data }: ResultCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    hotelId,
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

  const currentParams = new URLSearchParams(location.search);
  const checkInDate = currentParams.get("checkInDate");
  const checkOutDate = currentParams.get("checkOutDate");

  const handleNavigate = () => {
    console.log("Rendering hotel:", hotelId, hotelName);
    if (!hotelId) return;
    navigate(
      `/hotel/${hotelId}?checkInDate=${checkInDate ?? ""}&checkOutDate=${
        checkOutDate ?? ""
      }`
    );
  };

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
        cursor: "pointer",
      }}
      onClick={handleNavigate}
    >
      <Box sx={{ position: "relative", flexShrink: 0 }}>
        <CardMedia
          component="img"
          image={roomPhotoUrl || PLACEHOLDERS.ROOM}
          alt={hotelName || "Hotel"}
          sx={{
            width: { xs: "100%", sm: 180 },
            height: { xs: 180, sm: "100%" },
            objectFit: "cover",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDERS.ROOM;
          }}
        />
        {discount && discount > 0 && (
          <Chip
            label={`-${Math.round(discount * 100)}%`}
            size={MUI_SIZES.SMALL}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.background.default,

              fontWeight: 600,
            }}
          />
        )}
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
          <Typography
            variant={MUI_TYPOGRAPHY.H6}
            fontWeight={700}
            sx={{
              color: theme.palette.primary.main,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
          >
            {hotelName}
          </Typography>

          <Typography
            variant={MUI_TYPOGRAPHY.BODY2}
            color={theme.palette.secondary.dark}
            fontWeight={600}
          >
            {cityName} • {roomType}
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
        </Box>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
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

          <Button
            variant="gradient"
            sx={{
              fontWeight: 600,
              px: 3,
              py: 1,
              borderRadius: 2,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
          >
            Book Now!
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
