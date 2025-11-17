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
import type { FeaturedDealDto } from "../../../api/Api";
import { PLACEHOLDERS } from "../../../constants/placeHolders";
import {
  MUI_COLORS,
  MUI_SIZES,
  MUI_TYPOGRAPHY,
} from "../../../constants/muiTokens";
import { useNavigate } from "react-router-dom";

interface FeaturedDealCardProps {
  deal: FeaturedDealDto;
}

const FeaturedDealCard = React.memo(({ deal }: FeaturedDealCardProps) => {
  const theme = useTheme();
  const {
    hotelId,
    roomPhotoUrl,
    hotelName,
    cityName,
    hotelStarRating,
    originalRoomPrice,
    discount,
    finalPrice,
    title,
    description,
  } = deal;
  const navigate = useNavigate();
  const handleNavigate = () => {
    console.log("Rendering hotel:", hotelId, hotelName);
    if (!hotelId) return;
    navigate(`/hotel/${hotelId}?checkInDate=&checkOutDate=`);
  };
  return (
    <Card
      elevation={3}
      onClick={handleNavigate}
      sx={{
        maxWidth: 300,
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        animation: theme.animations.fadeInUp,
        "&:hover": {
          transform: "translateY(-4px)",
          cursor: "pointer",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={roomPhotoUrl || PLACEHOLDERS.ROOM}
          alt={hotelName ? `${hotelName} room` : "Hotel room"}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDERS.ROOM;
          }}
          sx={{
            height: 160,
            objectFit: "cover",
          }}
        />

        {discount && discount > 0 && (
          <Chip
            label={`-${discount * 100}%`}
            size={MUI_SIZES.SMALL}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.background.default,
              fontWeight: 600,
              boxShadow: theme.shadows[3],
            }}
          />
        )}
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Box
          color={MUI_COLORS.PRIMARY}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant={MUI_TYPOGRAPHY.SUBTITLE1}
            fontWeight={600}
            color={MUI_COLORS.PRIMARY}
            noWrap
            sx={{
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {hotelName || "Unknown Hotel"}
          </Typography>
          <Typography
            variant={MUI_TYPOGRAPHY.CAPTION}
            color={"text." + MUI_COLORS.SECONDARY}
          >
            {cityName || ""}
          </Typography>
        </Box>

        {hotelStarRating && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                fontSize={MUI_SIZES.SMALL}
                sx={{
                  color:
                    i < Math.floor(hotelStarRating)
                      ? theme.palette.brand.yellow
                      : theme.palette.action.disabled,
                }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          {originalRoomPrice && (
            <Typography
              variant={MUI_TYPOGRAPHY.BODY2}
              sx={{
                textDecoration: "line-through",
                color: theme.palette.text.disabled,
              }}
            >
              ${originalRoomPrice}
            </Typography>
          )}
          {finalPrice && (
            <Typography
              variant={MUI_TYPOGRAPHY.BODY2}
              fontWeight={600}
              color={MUI_COLORS.PRIMARY}
            >
              ${finalPrice}
            </Typography>
          )}
        </Box>

        {title && (
          <Typography
            variant={MUI_TYPOGRAPHY.BODY2}
            fontWeight={400}
            sx={{
              mt: 1,
              color: theme.palette.brand.turquoise,
            }}
          >
            {title}
          </Typography>
        )}
        {description && (
          <Typography
            variant={MUI_TYPOGRAPHY.CAPTION}
            color={"text." + MUI_COLORS.SECONDARY}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
});

FeaturedDealCard.displayName = "FeaturedDealCard";
export default FeaturedDealCard;
