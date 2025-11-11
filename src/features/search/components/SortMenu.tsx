import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
  type SelectChangeEvent,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { MUI_VARIANTS } from "../../../constants/muiTokens";

export default function SortMenu() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const currentSort = params.get("sort") || "";

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const currentParams = new URLSearchParams(location.search);
    if (value) currentParams.set("sort", value);
    else currentParams.delete("sort");
    navigate(`${location.pathname}?${currentParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
      <FormControl
        variant={MUI_VARIANTS.OUTLINED}
        size="small"
        sx={{
          minWidth: 180,
          borderRadius: 2,
          backdropFilter: "blur(12px) saturate(160%)",
          WebkitBackdropFilter: "blur(12px) saturate(160%)",
          backgroundColor: theme.palette.customBackgrounds.glass,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 4px 20px rgba(0, 0, 0, 0.06)"
              : "0 4px 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        <InputLabel>Sort by</InputLabel>
        <Select
          value={currentSort}
          onChange={handleChange}
          label="Sort by"
          MenuProps={{
            PaperProps: {
              sx: {
                mt: 1,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 4px 20px rgba(0,0,0,0.05)"
                    : "0 4px 20px rgba(0,0,0,0.35)",
              },
            },
          }}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="priceAsc">Price (Low → High)</MenuItem>
          <MenuItem value="priceDesc">Price (High → Low)</MenuItem>
          <MenuItem value="ratingDesc">Rating</MenuItem>
          <MenuItem value="discountDesc">Discount</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
