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
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { ROUTES } from "../../../constants/routes";
import { Tooltip } from "@mui/material";

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
  const navigate = useNavigate();
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        width: {
          xs: "100%",
          md: 260,
        },
        flexShrink: 0,
        height: {
          xs: 64,
          md: "100vh",
        },

        borderRight: `1px solid ${theme.palette.divider}`,
        borderRadius: 3,
        backdropFilter: "blur(12px) saturate(160%)",
        backgroundColor: theme.palette.customBackgrounds.glass,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 8px 32px rgba(0,0,0,0.05)"
            : "0 8px 32px rgba(0,0,0,0.25)",
        animation: theme.animations.fadeInUp,
        flexDirection: {
          xs: "row",
          md: "column",
        },
        alignItems: {
          xs: "center",
          md: "stretch",
        },
        justifyContent: {
          xs: "space-around",
          md: "flex-start",
        },
        py: {
          xs: 1,
          md: 3,
        },
        px: { xs: 1, md: 2 },
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
            sx={{
              letterSpacing: 0.4,
              cursor: "pointer",
            }}
            onClick={() => navigate(ROUTES.ADMIN)}
          >
            Admin Panel
          </Typography>
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, display: { xs: "none", md: "block" } }}
        >
          Manage cities, hotels & rooms
        </Typography>
      </Box>

      <Divider sx={{ mx: 2, mb: 1, display: { xs: "none", md: "block" } }} />

      <List
        sx={{
          display: "flex",
          flexDirection: {
            xs: "row",
            md: "column",
          },
          p: 0,
        }}
      >
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
              px: {
                xs: 1,
                md: 2,
              },
              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
              alignItems: "center",
              transition: "all 0.3s",
              color: theme.palette.secondary.main,
              "&.active": {
                bgcolor:
                  theme.palette.mode === "light"
                    ? "rgba(255,140,66,0.1)"
                    : "rgba(255,181,107,0.12)",
                color: theme.palette.secondary.dark,
                fontWeight: 600,
              },
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <Tooltip
              title={item.label}
              placement="bottom"
              arrow
              disableHoverListener={false}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 20,
                }}
              >
                {item.icon}
              </Box>
            </Tooltip>

            <ListItemText
              sx={{ display: { xs: "none", md: "block" } }}
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
