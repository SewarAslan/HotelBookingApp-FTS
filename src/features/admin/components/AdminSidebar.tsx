import {
  Box,
  Divider,
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
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

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
        borderRadius: 3,
        backdropFilter: "blur(12px) saturate(160%)",
        backgroundColor: theme.palette.customBackgrounds.glass,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 8px 32px rgba(0,0,0,0.05)"
            : "0 8px 32px rgba(0,0,0,0.25)",
        animation: theme.animations.fadeInUp,
        display: "flex",
        flexDirection: "column",
        py: 3,
        px: 1,
        mx: 1,
      }}
    >
      <Box sx={{ px: 2.5, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DashboardCustomizeIcon color="primary" />
          <Typography
            variant="h6"
            fontWeight={700}
            color={theme.palette.primary.main}
            sx={{ letterSpacing: 0.4 }}
          >
            Admin Panel
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
          Manage cities, hotels & rooms
        </Typography>
      </Box>

      <Divider sx={{ mx: 2, mb: 1 }} />

      <List>
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
              py: 1.2,
              px: 2,
              transition: "all 0.3s",
              "&.active": {
                bgcolor:
                  theme.palette.mode === "light"
                    ? "rgba(255,140,66,0.1)"
                    : "rgba(255,181,107,0.12)",
                color: theme.palette.secondary.main,
                fontWeight: 600,
              },
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            {item.icon}
            <ListItemText
              primary={
                <Typography
                  fontSize="0.9rem"
                  fontWeight={500}
                  color={theme.palette.secondary.main}
                >
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
