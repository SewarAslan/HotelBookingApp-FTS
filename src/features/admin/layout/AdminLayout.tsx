import { Box, Container, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AdminSidebar from "../components/AdminSidebar";
import { ROUTES } from "../../../constants/routes";
import { useAuthActions } from "../../auth";

function getPageTitle(pathname: string) {
  if (pathname.startsWith(ROUTES.ADMIN_CITIES)) return "Manage Cities";
  if (pathname.startsWith(ROUTES.ADMIN_HOTELS)) return "Manage Hotels";
  if (pathname.startsWith(ROUTES.ADMIN_ROOMS)) return "Manage Rooms";
  return "Admin Dashboard";
}

export default function AdminLayout() {
  const theme = useTheme();
  const location = useLocation();
  const { authUser } = useAuthActions();
  const title = getPageTitle(location.pathname);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
      }}
    >
      <AdminSidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: 3,
        }}
      >
        <Container maxWidth="xl" sx={{ animation: theme.animations.fadeInUp }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="text.primary"
            sx={{ mb: 3 }}
          >
            {title}
          </Typography>

          {location.pathname === ROUTES.ADMIN ? (
            <Box>
              <Typography variant="body1" color="text.secondary">
                Welcome {authUser?.givenName + " " + authUser?.familyName} you
                can manage (cities, hotels, rooms)
              </Typography>
            </Box>
          ) : (
            <Outlet />
          )}
        </Container>
      </Box>
    </Box>
  );
}
