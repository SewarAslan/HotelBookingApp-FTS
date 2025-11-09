import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  useTheme,
} from "@mui/material";
import { apiClient } from "../../../api/client";
import type { FilterAmenityDto } from "../../../api/HotelBookingApi";
import { useNavigate, useLocation } from "react-router-dom";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

export default function FiltersSidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [amenities, setAmenities] = useState<FilterAmenityDto[]>([]);

  useEffect(() => {
    apiClient.api.searchResultsAmenitiesList().then((res) => {
      setAmenities(res.data);
    });
  }, []);

  const handleStarChange = (star: number) => {
    params.set("starRate", String(star));
    navigate({ search: params.toString() });
  };

  const handleAmenityToggle = (name: string) => {
    const current = params.get("amenities")?.split(",") || [];
    const updated = current.includes(name)
      ? current.filter((a) => a !== name)
      : [...current, name];
    if (updated.length > 0) params.set("amenities", updated.join(","));
    else params.delete("amenities");
    navigate({ search: params.toString() });
  };

  return (
    <Box
      sx={{
        width: 250,
        flexShrink: 0,
        p: 2,
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant={MUI_TYPOGRAPHY.H6} fontWeight={700} mb={1}>
        Filters
      </Typography>

      <Typography variant={MUI_TYPOGRAPHY.SUBTITLE1} fontWeight={600}>
        Star Rating
      </Typography>
      {[5, 4, 3, 2, 1].map((star) => (
        <FormControlLabel
          key={star}
          control={<Checkbox onChange={() => handleStarChange(star)} />}
          label={`${star} Stars`}
        />
      ))}

      <Divider sx={{ my: 2 }} />

      <Typography variant={MUI_TYPOGRAPHY.SUBTITLE1} fontWeight={600}>
        Amenities
      </Typography>
      {amenities.map((a) => (
        <FormControlLabel
          key={a.name}
          control={<Checkbox onChange={() => handleAmenityToggle(a.name!)} />}
          label={a.name}
        />
      ))}
    </Box>
  );
}
