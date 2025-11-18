import { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  useTheme,
  Slider,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  const [openStars, setOpenStars] = useState(true);
  const [openAmenities, setOpenAmenities] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);

  // حالة السعر المحلي
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);

  // لمنع الـ reset أثناء السحب
  const isDraggingRef = useRef(false);

  // قراءة القيم من URL عند أي تغيير
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const min = params.has("priceMin") ? Number(params.get("priceMin")) : 0;
    const max = params.has("priceMax") ? Number(params.get("priceMax")) : 300;

    // نحدّث فقط لو ما كنّاش بنسحب (تجنب الفليكر)
    if (!isDraggingRef.current) {
      setPriceRange([min, max]);
    }
  }, [location.search]);

  // دالة تحديث URL آمنة (تتعامل مع 0 بشكل صحيح)
  const updateUrl = (key: string, value: string | number | null) => {
    const params = new URLSearchParams(location.search);

    if (value === null || value === undefined || value === "") {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    const newUrl = `${location.pathname}?${params.toString()}`;
    if (location.search !== `?${params.toString()}`) {
      navigate(newUrl, { replace: true });
    }
  };

  // Star Rating
  const handleStarChange = (_: unknown, value: number | number[]) => {
    const val = typeof value === "number" ? value : 0;
    updateUrl("starRate", val === 0 ? null : val);
  };

  // Amenities
  const handleAmenityToggle = (name: string) => {
    const params = new URLSearchParams(location.search);
    const current = params.get("amenities")?.split(",") || [];
    const updated = current.includes(name)
      ? current.filter((a) => a !== name)
      : [...current, name];

    updateUrl("amenities", updated.length > 0 ? updated.join(",") : null);
  };

  // Clear All
  const handleClearAll = () => {
    const params = new URLSearchParams(location.search);
    [
      "starRate",
      "amenities",
      "priceMin",
      "priceMax",
      "city",
      "checkInDate",
      "checkOutDate",
      "adults",
      "children",
      "rooms",
    ].forEach((key) => params.delete(key));

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // جلب الـ Amenities
  useEffect(() => {
    void (async () => {
      try {
        const res = await apiClient.api.searchResultsAmenitiesList();
        setAmenities(res.data);
      } catch (error) {
        console.error("Failed to fetch amenities", error);
      }
    })();
  }, []);

  // تحديث المصفوفة المختارة للـ Amenities
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedAmenities(params.get("amenities")?.split(",") || []);
  }, [location.search]);

  return (
    <Box
      sx={{
        p: 2,
        minWidth: 260,
        borderRadius: 3,
        backdropFilter: "blur(12px) saturate(160%)",
        backgroundColor: theme.palette.customBackgrounds.glass,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 8px 32px rgba(0,0,0,0.05)"
            : "0 8px 32px rgba(0,0,0,0.25)",
        animation: theme.animations.fadeInUp,
      }}
    >
      {/* Clear All */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <Typography
          onClick={handleClearAll}
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
            "&:hover": { color: theme.palette.secondary.dark },
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

      {/* Star Rating */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant={MUI_TYPOGRAPHY.SUBTITLE1}
            sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
          >
            Star Rating
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.9rem",
              color: theme.palette.primary.dark,
            }}
          >
            {location.search.includes("starRate")
              ? "★".repeat(
                  Number(new URLSearchParams(location.search).get("starRate"))
                ) +
                "☆".repeat(
                  5 -
                    Number(new URLSearchParams(location.search).get("starRate"))
                )
              : "Any Rating"}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => setOpenStars((v) => !v)}
          sx={{
            transform: openStars ? "rotate(180deg)" : "rotate(0)",
            transition: "0.3s",
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Collapse in={openStars}>
        <Slider
          min={0}
          max={5}
          step={1}
          value={
            Number(new URLSearchParams(location.search).get("starRate")) || 0
          }
          onChange={handleStarChange}
          valueLabelDisplay="auto"
          sx={{ mb: 2, color: theme.palette.primary.main }}
        />
      </Collapse>

      <Divider sx={{ my: 2 }} />

      {/* Price Range */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant={MUI_TYPOGRAPHY.SUBTITLE1}
            sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
          >
            Price Range ($)
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.9rem",
              color: theme.palette.primary.dark,
            }}
          >
            ${priceRange[0]} – ${priceRange[1]}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => setOpenPrice((v) => !v)}
          sx={{
            transform: openPrice ? "rotate(180deg)" : "rotate(0)",
            transition: "0.3s",
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Collapse in={openPrice}>
        <Slider
          min={0}
          max={300}
          step={10}
          value={priceRange}
          onChange={(_, newValue) => {
            isDraggingRef.current = true;
            if (Array.isArray(newValue))
              setPriceRange([newValue[0], newValue[1]]);
          }}
          onChangeCommitted={(_, newValue) => {
            isDraggingRef.current = false;
            if (Array.isArray(newValue)) {
              const [min, max] = newValue;
              updateUrl("priceMin", min);
              updateUrl("priceMax", max);
            }
          }}
          valueLabelDisplay="auto"
          sx={{ mb: 2, color: theme.palette.secondary.main }}
        />
      </Collapse>

      <Divider sx={{ my: 2 }} />

      {/* Amenities */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
        >
          Amenities
        </Typography>
        <IconButton
          size="small"
          onClick={() => setOpenAmenities((v) => !v)}
          sx={{
            transform: openAmenities ? "rotate(180deg)" : "rotate(0)",
            transition: "0.3s",
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Collapse in={openAmenities}>
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
                    "&.Mui-checked": { color: theme.palette.primary.dark },
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
            sx={{ color: theme.palette.primary.main, opacity: 0.7 }}
          >
            Loading amenities...
          </Typography>
        )}
      </Collapse>
    </Box>
  );
}
