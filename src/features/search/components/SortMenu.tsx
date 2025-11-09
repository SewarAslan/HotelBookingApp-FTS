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
    params.set("sort", event.target.value as string);
    navigate({ search: params.toString() });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
      <FormControl
        variant={MUI_VARIANTS.OUTLINED}
        size="small"
        sx={{ minWidth: 180, background: theme.palette.background.paper }}
      >
        <InputLabel>Sort by</InputLabel>
        <Select value={currentSort} onChange={handleChange} label="Sort by">
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="price_asc">Price (Low → High)</MenuItem>
          <MenuItem value="price_desc">Price (High → Low)</MenuItem>
          <MenuItem value="rating_desc">Rating</MenuItem>
          <MenuItem value="discount_desc">Discount</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
