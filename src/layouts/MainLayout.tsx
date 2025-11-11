import { Box, Container, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.palette.customBackgrounds.gradient,
        display: "flex",
        flexDirection: "column",
        transition: "background 0.5s ease",
        overflowX: "hidden",
      }}
    >
      <Header />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          py: { xs: 3, sm: 4, md: 6 },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            flex: 1,
            px: { xs: 2, sm: 3, md: 4 },
            width: "100%",
            animation: theme.animations.fadeInUp,
          }}
        >
          <Outlet />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
