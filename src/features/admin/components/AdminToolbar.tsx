import { Box, TextField, Button, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

interface AdminToolbarProps {
  onSearch: (query: string) => void;
  onCreate: () => void;
}

export default function AdminToolbar({
  onSearch,
  onCreate,
}: AdminToolbarProps) {
  const theme = useTheme();
  const [value, setValue] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 2,
        alignItems: "center",
        animation: theme.animations.fadeInUp,
      }}
    >
      <TextField
        placeholder="Search by name..."
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ flex: 1 }}
      />

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={() => onSearch(value)}
        sx={{ height: 56 }}
      >
        Search
      </Button>

      <Button
        variant="gradient-primary"
        startIcon={<AddIcon />}
        onClick={onCreate}
        sx={{ height: 56 }}
      >
        Create
      </Button>
    </Box>
  );
}
