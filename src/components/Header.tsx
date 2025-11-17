import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Drawer,
  ListItemText,
  useTheme,
  useMediaQuery,
  ListItemButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { useAuthActions } from "../features/auth/hooks";
import { MUI_TYPOGRAPHY } from "../constants/muiTokens";

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout, authUser } = useAuthActions();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const links = [
    { label: "Home", path: "/" },
    { label: "Search", path: "/results" },
  ];

  if (authUser?.userType === "Admin") {
    links.push({ label: "Admin", path: "/admin" });
  }

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        zIndex: theme.zIndex.drawer + 1,
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        backgroundColor:
          theme.palette.customBackgrounds?.glass ??
          theme.palette.background.paper,
        borderBottom: `1px solid rgba(255,255,255,0.18)`,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant={MUI_TYPOGRAPHY.H6}
          fontWeight={800}
          sx={{
            background: theme.palette.primary.main,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
            fontFamily: "Poppins, sans-serif",
          }}
          onClick={() => handleNavigate("/")}
        >
          Smart Stays
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {links.map(({ label, path }) => (
              <Button
                key={label}
                onClick={() => handleNavigate(path)}
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  fontWeight: 700,
                  color:
                    location.pathname === path
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                  textTransform: "none",
                  position: "relative",
                  "&:hover": {
                    color: theme.palette.secondary.main,
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    width: location.pathname === path ? "100%" : "0%",
                    height: "2px",
                    background: theme.palette.secondary.main,
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": { width: "100%" },
                }}
              >
                {label}
              </Button>
            ))}

            <ThemeToggleButton />

            <Tooltip title="Account settings">
              <IconButton onClick={handleOpenUserMenu} size="small">
                <Avatar
                  sx={{
                    bgcolor: "transparent",
                    border: `2px solid ${theme.palette.secondary.main}`,
                    color: theme.palette.secondary.main,
                  }}
                >
                  {authUser?.givenName &&
                    authUser?.familyName &&
                    `${authUser.givenName[0].toUpperCase()}${authUser.familyName[0].toUpperCase()}`}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: 2,
                  minWidth: 220,
                  backgroundColor: theme.palette.customBackgrounds.glass,
                  backdropFilter: "blur(12px) saturate(160%)",
                  WebkitBackdropFilter: "blur(12px) saturate(160%)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 8px 30px rgba(0,0,0,0.06)"
                      : "0 8px 30px rgba(0,0,0,0.35)",
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography
                  fontWeight={700}
                  color={theme.palette.secondary.main}
                >
                  {authUser?.givenName &&
                    authUser?.familyName &&
                    `${authUser.givenName} ${authUser.familyName}`}
                </Typography>
                <Typography
                  variant={MUI_TYPOGRAPHY.BODY2}
                  color={theme.palette.primary.main}
                >
                  {authUser?.userType}
                </Typography>
              </Box>

              <Divider />

              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleCloseUserMenu();
                }}
                sx={{ color: theme.palette.error.main }}
              >
                <ListItemIcon>
                  <LogoutIcon color="error" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontWeight: 600,
                    color: "error.main",
                  }}
                />
              </MenuItem>
            </Menu>
          </Box>
        )}

        {/* 📱 Mobile Menu Button */}
        {isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ThemeToggleButton />
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* 📱 Drawer (Mobile) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 220,
            background: theme.palette.background.paper,
            p: 2,
          },
        }}
      >
        {links.map(({ label, path }) => (
          <ListItemButton
            key={label}
            onClick={() => handleNavigate(path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              backgroundColor:
                location.pathname === path
                  ? theme.palette.action.selected
                  : "transparent",
              "&:hover": { backgroundColor: theme.palette.action.hover },
            }}
          >
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                fontWeight: 600,
                color:
                  location.pathname === path
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
              }}
            />
          </ListItemButton>
        ))}

        <Divider sx={{ my: 1 }} />

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            mt: 1,
            color: theme.palette.error.main,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <LogoutIcon sx={{ mr: 1 }} />
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>
      </Drawer>
    </AppBar>
  );
}
