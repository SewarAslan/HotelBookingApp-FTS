import React from "react";
import { Card, CardMedia, Box, Typography } from "@mui/material";
import type { Destination } from "../../../api/Api";
import { PLACEHOLDERS } from "../../../constants/placeHolders";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = React.memo(({ destination }: DestinationCardProps) => {
  const { cityName, countryName, thumbnailUrl, description } = destination;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 180,
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: 180,
          borderRadius: 8,
          overflow: "hidden",
          position: "relative",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        <CardMedia
          component="img"
          image={thumbnailUrl || PLACEHOLDERS.CITY}
          alt={cityName || "City"}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDERS.CITY;
          }}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
            color: "white",
            p: 1.2,
          }}
        >
          <Typography variant="subtitle2" fontWeight={600}>
            {cityName}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {countryName}
          </Typography>
        </Box>
      </Card>

      {description && (
        <Typography
          variant={MUI_TYPOGRAPHY.CAPTION}
          sx={{
            mt: 1,
            textAlign: "center",
            opacity: 0.8,
            wordBreak: "break-word",
            whiteSpace: "normal",
            lineHeight: 1.4,
            maxWidth: "100%",
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
});

DestinationCard.displayName = "DestinationCard";
export default DestinationCard;
