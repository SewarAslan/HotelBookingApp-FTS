import { Box, Card, CardContent, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AdminSidebar from "../components/AdminSidebar";
import { ROUTES } from "../../../constants/routes";

function getPageTitle(pathname: string) {
  if (pathname.startsWith(ROUTES.ADMIN_CITIES)) return "Manage Cities";
  if (pathname.startsWith(ROUTES.ADMIN_HOTELS)) return "Manage Hotels";
  if (pathname.startsWith(ROUTES.ADMIN_ROOMS)) return "Manage Rooms";
  return "Admin Dashboard";
}

export default function AdminLayout() {
  const theme = useTheme();
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        bgcolor: "transparent",
      }}
    >
      <AdminSidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          px: { xs: 2, sm: 3, md: 5 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "xl",
            borderRadius: 3,
            background: theme.palette.customBackgrounds.glass,
            animation: theme.animations.fadeInUp,
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                px: 2,
              }}
            >
              <Typography
                variant="h4"
                fontWeight={800}
                color={theme.palette.primary.main}
                sx={{ mb: 3 }}
              >
                {title}
              </Typography>
            </Box>
            <Outlet />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
