import { Box, Container, Typography, useTheme } from "@mui/material";
// import ItemsSection from "../components/ItemsSection";
// import UserInfoSection from "../components/UserInfoSection";
// import CheckoutButton from "../components/CheckoutButton";
import { useCart } from "../hooks/useCart";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

export default function CheckoutPage() {
  const theme = useTheme();
  const { items } = useCart();

  const isEmpty = !items || items.length === 0;

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        animation: theme.animations.fadeInUp,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          mb: 3,
          textAlign: "center",
          color: theme.palette.primary.main,
        }}
      >
        Checkout
      </Typography>

      {isEmpty && (
        <Box
          sx={{
            py: 6,
            textAlign: "center",
            backgroundColor: theme.palette.customBackgrounds.glass,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 8px 24px rgba(0,0,0,0.06)"
                : "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          <Typography
            variant={MUI_TYPOGRAPHY.H5}
            sx={{
              color: theme.palette.secondary.dark,
              fontWeight: 700,
              mb: 2,
            }}
          >
            Your cart is empty
          </Typography>

          <Typography
            variant={MUI_TYPOGRAPHY.BODY2}
            sx={{ color: theme.palette.text.secondary, mb: 4 }}
          >
            Add some rooms to your cart before proceeding to checkout.
          </Typography>
        </Box>
      )}

      {!isEmpty && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* <ItemsSection items={items} /> */}

          {/* <UserInfoSection /> */}

          {/* <CheckoutButton items={items} /> */}
        </Box>
      )}
    </Container>
  );
}
