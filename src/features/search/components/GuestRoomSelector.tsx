import {
  Box,
  Button,
  IconButton,
  Typography,
  Popover,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { MUI_TYPOGRAPHY, MUI_VARIANTS } from "../../../constants/muiTokens";

interface GuestRoomSelectorProps {
  values: {
    adults: number;
    children: number;
    rooms: number;
  };
  setFieldValue: (field: string, value: unknown) => void;
}
export default function GuestRoomSelector({
  values,
  setFieldValue,
}: GuestRoomSelectorProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const summary = `${values.adults} Adults, ${values.children} Children, ${
    values.rooms
  } Room${values.rooms > 1 ? "s" : ""}`;

  const handleChange = (field: keyof typeof values, delta: number) => {
    const min = field === "children" ? 0 : 1;
    setFieldValue(field, Math.max(min, (values[field] as number) + delta));
  };

  return (
    <>
      <Button
        variant={MUI_VARIANTS.OUTLINED}
        fullWidth
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          height: "56px",
          textTransform: "none",
          backgroundColor: theme.palette.customBackgrounds.glass,
          fontWeight: 600,
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          fontSize: "10px",
        }}
      >
        {summary}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            p: 2,
            width: 280,
            borderRadius: 4,
            border: `1px solid rgba(255,255,255,0.18)`,
            backgroundColor: theme.palette.customBackgrounds.glass,
            backdropFilter: "blur(12px) saturate(160%)",
            WebkitBackdropFilter: "blur(12px) saturate(160%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Typography
          variant={MUI_TYPOGRAPHY.SUBTITLE1}
          fontWeight={600}
          mb={1.5}
          color={theme.palette.primary.main}
        >
          Guests
        </Typography>

        {[
          {
            label: "Adults",
            value: values.adults,
            type: "adults",
          },
          {
            label: "Children",
            value: values.children,
            type: "children",
          },
          { label: "Rooms", value: values.rooms, type: "rooms" },
        ].map(({ label, value, type }) => (
          <Box
            key={type}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: theme.palette.primary.main,
              mb: 1,
            }}
          >
            <Typography
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              {label}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton
                size="small"
                sx={{ color: theme.palette.secondary.main }}
                onClick={() =>
                  handleChange(type as "adults" | "children" | "rooms", -1)
                }
                disabled={
                  (type === "adults" && values.adults === 1) ||
                  (type === "children" && values.children === 0) ||
                  (type === "rooms" && values.rooms === 1)
                }
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                {value}
              </Typography>
              <IconButton
                size="small"
                sx={{ color: theme.palette.secondary.main }}
                onClick={() =>
                  handleChange(type as "adults" | "children" | "rooms", 1)
                }
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Button
          variant="outlined"
          fullWidth
          onClick={() => setAnchorEl(null)}
          sx={{
            mt: 1.5,
            textTransform: "uppercase",
            fontWeight: 600,
            backgroundColor: theme.palette.primary.main,
            color: "#ffff",
            height: "56px",
            "& .MuiOutlinedInput-root": {
              height: "100%",
              fontWeight: 600,
            },
            "& .MuiInputLabel-root": {
              top: "-4px",
            },
          }}
        >
          Apply
        </Button>
      </Popover>
    </>
  );
}
