import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HotelIcon from "@mui/icons-material/Hotel";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Cities", to: "/admin/cities", icon: <LocationCityIcon /> },
  { label: "Hotels", to: "/admin/hotels", icon: <HotelIcon /> },
  { label: "Rooms", to: "/admin/rooms", icon: <MeetingRoomIcon /> },
];

export default function AdminSidebar() {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      sx={{
        width: 260,
        flexShrink: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
        bgcolor:
          theme.palette.mode === "light"
            ? theme.palette.background.paper
            : "#111827",
        display: "flex",
        flexDirection: "column",
        py: 2,
      }}
    >
      <Box sx={{ px: 2, mb: 2 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          color="primary"
          sx={{ letterSpacing: 0.4 }}
        >
          Admin Panel
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Manage cities, hotels & rooms
        </Typography>
      </Box>

      <List sx={{ mt: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            sx={{
              gap: 1.5,
              mb: 0.5,
              borderRadius: 2,
              mx: 1,
              "&.active": {
                bgcolor:
                  theme.palette.mode === "light"
                    ? "rgba(255,140,66,0.08)"
                    : "rgba(255,181,107,0.12)",
                color: theme.palette.primary.main,
              },
            }}
          >
            {item.icon}
            <ListItemText
              primary={
                <Typography fontWeight={600} fontSize="0.9rem">
                  {item.label}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
