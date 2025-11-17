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
import type { FilterAmenityDto } from "../../../api/Api";
import { useNavigate, useLocation } from "react-router-dom";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

export default function FiltersSidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [amenities, setAmenities] = useState<FilterAmenityDto[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const updateUrl = (key: string, value: string | null) => {
    const currentParams = new URLSearchParams(location.search);
    if (value && value.trim() !== "") currentParams.set(key, value);
    else currentParams.delete(key);
    navigate(`${location.pathname}?${currentParams.toString()}`, {
      replace: true,
    });
  };

  const handleStarChange = (star: number) => {
    const currentParams = new URLSearchParams(location.search);
    const currentStar = currentParams.get("starRate");
    const newValue = currentStar === String(star) ? null : String(star);
    updateUrl("starRate", newValue);
  };

  const handleAmenityToggle = (name: string) => {
    const currentParams = new URLSearchParams(location.search);
    const existing = currentParams.get("amenities")?.split(",") || [];
    const updated = existing.includes(name)
      ? existing.filter((a) => a !== name)
      : [...existing, name];
    updateUrl("amenities", updated.length > 0 ? updated.join(",") : null);
  };
  const handleClearAll = () => {
    const params = new URLSearchParams(location.search);

    params.delete("starRate");
    params.delete("amenities");

    params.delete("city");
    params.delete("checkInDate");
    params.delete("checkOutDate");
    params.delete("adults");
    params.delete("children");
    params.delete("rooms");

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  useEffect(() => {
    async function fetchAmenities() {
      try {
        const res = await apiClient.api.searchResultsAmenitiesList();
        setAmenities(res.data);
      } catch (error) {
        console.error("Failed to fetch amenities", error);
      }
    }
    void fetchAmenities();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const amenitiesFromUrl = params.get("amenities")?.split(",") || [];
    setSelectedAmenities(amenitiesFromUrl);
  }, [location.search]);

  return (
    <Box
      sx={{
        p: 2,
        minWidth: 240,
        borderRadius: 3,
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        backgroundColor: theme.palette.customBackgrounds.glass,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 8px 32px rgba(0,0,0,0.05)"
            : "0 8px 32px rgba(0,0,0,0.25)",
        animation: theme.animations.fadeInUp,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 1,
        }}
      >
        <Typography
          onClick={() => handleClearAll()}
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "color 0.3s ease",
            "&:hover": {
              color: theme.palette.secondary.dark,
              textDecoration: "underline",
            },
          }}
        >
          Clear All
        </Typography>
      </Box>

      <Typography
        variant={MUI_TYPOGRAPHY.H5}
        sx={{ mb: 1, color: theme.palette.secondary.main, fontWeight: 700 }}
      >
        Filters
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Typography
        variant={MUI_TYPOGRAPHY.SUBTITLE1}
        sx={{ mb: 1, color: theme.palette.primary.main, fontWeight: 500 }}
      >
        Star Rating
      </Typography>
      {[5, 4, 3, 2, 1].map((star) => (
        <FormControlLabel
          key={star}
          control={
            <Checkbox
              checked={
                new URLSearchParams(location.search).get("starRate") ===
                String(star)
              }
              onChange={() => handleStarChange(star)}
              sx={{
                color: theme.palette.primary.dark,
                "&.Mui-checked": {
                  color: theme.palette.primary.dark,
                },
              }}
            />
          }
          label={
            <Typography sx={{ color: theme.palette.primary.main }}>
              {`${star} Stars`}
            </Typography>
          }
        />
      ))}

      <Divider sx={{ my: 2 }} />

      <Typography
        variant="subtitle1"
        sx={{ mb: 1, color: theme.palette.primary.main, fontWeight: 500 }}
      >
        Amenities
      </Typography>

      {amenities.length > 0 ? (
        amenities.map((a) => (
          <FormControlLabel
            key={a.name}
            control={
              <Checkbox
                checked={selectedAmenities.includes(a.name || "")}
                onChange={() => handleAmenityToggle(a.name || "")}
                color="secondary"
                sx={{
                  color: theme.palette.primary.dark,
                  "&.Mui-checked": {
                    color: theme.palette.primary.dark,
                  },
                }}
              />
            }
            label={
              <Typography sx={{ color: theme.palette.primary.main }}>
                {a.name}
              </Typography>
            }
          />
        ))
      ) : (
        <Typography
          variant={MUI_TYPOGRAPHY.BODY2}
          sx={{ color: theme.palette.primary.main }}
        >
          Loading amenities...
        </Typography>
      )}
    </Box>
  );
}
