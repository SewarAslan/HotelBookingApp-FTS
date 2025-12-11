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
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { useAuthActions } from "../features/auth/hooks";
import { useCart } from "../features/checkout/hooks/useCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  MUI_COLORS,
  MUI_TYPOGRAPHY,
  MUI_VARIANTS,
} from "../constants/muiTokens";

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout, authUser } = useAuthActions();
  const { count } = useCart();

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
        zIndex: theme.zIndex.drawer,
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        backgroundColor:
          theme.palette.customBackgrounds?.glass ??
          theme.palette.background.paper,
        borderBottom: `1px solid rgba(255,255,255,0.18)`,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 8px 24px rgba(0, 0, 0, 0.05)"
            : "0 8px 24px rgba(0, 0, 0, 0.35)",
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
          variant="h6"
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
                  fontWeight: 700,
                  textTransform: "none",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  position: "relative",
                  color:
                    location.pathname === path
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                  "&:hover": {
                    color: theme.palette.secondary.main,
                    backgroundColor: "transparent",
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
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {label}
              </Button>
            ))}

            {authUser?.userType !== "Admin" && (
              <Tooltip title="Go to Cart">
                <IconButton onClick={() => navigate("/checkout")}>
                  {" "}
                  <Badge badgeContent={count} color={MUI_COLORS.SECONDARY}>
                    {" "}
                    <ShoppingCartOutlinedIcon color={MUI_COLORS.PRIMARY} />{" "}
                  </Badge>{" "}
                </IconButton>
              </Tooltip>
            )}

            <ThemeToggleButton />

            <Tooltip title="Account settings">
              <IconButton onClick={handleOpenUserMenu} size="small">
                <Avatar
                  sx={{
                    bgcolor: "transparent",
                    border: `2px solid ${theme.palette.secondary.main}`,
                    color: theme.palette.secondary.main,
                    fontWeight: 600,
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
                  border: `1px solid ${
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,0.05)"
                      : "rgba(255,255,255,0.08)"
                  }`,
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
                  {authUser?.givenName && authUser?.familyName
                    ? `${authUser.givenName} ${authUser.familyName}`
                    : ""}
                </Typography>
                <Typography variant="body2" color={theme.palette.primary.main}>
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

        {isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="Cart">
              <IconButton onClick={() => navigate("/checkout")}>
                <Badge badgeContent={count} color={MUI_COLORS.SECONDARY}>
                  <ShoppingCartOutlinedIcon color={MUI_COLORS.PRIMARY} />
                </Badge>
              </IconButton>
            </Tooltip>
            <ThemeToggleButton />
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: "75vw",
            maxWidth: 320,
            background: "rgba(255, 255, 255, 0.9)",
            zIndex: theme.zIndex.drawer + 4,
            p: 0,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Avatar
            sx={{
              bgcolor: theme.palette.secondary.main,
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {authUser?.givenName?.[0]}
            {authUser?.familyName?.[0]}
          </Avatar>

          <Box>
            <Typography
              fontWeight={700}
              color={theme.palette.primary.main}
              variant={MUI_TYPOGRAPHY.H5}
            >
              {authUser?.givenName} {authUser?.familyName}
            </Typography>
            <Typography
              variant={MUI_TYPOGRAPHY.H6}
              color={theme.palette.secondary.main}
            >
              {authUser?.userType}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          {links.map(({ label, path }) => (
            <ListItemButton
              key={label}
              onClick={() => handleNavigate(path)}
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                py: 1.6,
                color: theme.palette.primary.main,
                backgroundColor:
                  location.pathname === path
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              />
            </ListItemButton>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant={MUI_VARIANTS.GRADIENT}
            color="error"
            sx={{
              borderRadius: 2,
              py: 1.2,
              fontWeight: 700,
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}
