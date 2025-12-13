import { TextField, Button, useTheme, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { MUI_VARIANTS } from "../../../constants/muiTokens";

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
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        px: 3,
        py: 2,
        mb: 3,
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
      <TextField
        placeholder="Search by name..."
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          flex: 1,
          minWidth: { xs: "100%", sm: 260 },
        }}
      />

      <Button
        variant={MUI_VARIANTS.OUTLINED}
        startIcon={<SearchIcon />}
        onClick={() => onSearch(value)}
        sx={{
          height: 56,
          flex: { xs: "1 1 100%", sm: "0 0 auto" },
        }}
      >
        Search
      </Button>

      <Button
        variant={MUI_VARIANTS.GRADIENT2}
        startIcon={<AddIcon />}
        onClick={onCreate}
        sx={{
          height: 56,
          flex: { xs: "1 1 100%", sm: "0 0 auto" },
        }}
      >
        Create
      </Button>
    </Paper>
  );
}
