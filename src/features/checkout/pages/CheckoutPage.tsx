import {
  Box,
  Container,
  Typography,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import ItemsSection from "../components/ItemsSection";
import UserInfoSection from "../components/UserInfoSection";
import CheckoutButton from "../components/CheckoutButton";
import { validationSchema } from "../../../constants/validationSchema";
import { useAuthActions } from "../../auth";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useHotelDetails } from "../../hotel/hooks/useHotelDetails";
import { useState } from "react";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

export default function CheckoutPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { authUser } = useAuthActions();
  const { items, clearCart } = useCart();
  const { createBooking, status, error } = useCheckout();

  const isEmpty = items.length === 0;
  const item = items[0];
  const { data: hotel } = useHotelDetails(item?.hotelId ?? 0);

  const [openError, setOpenError] = useState(false);

  const handleCheckout = async (values: {
    customerName: string;
    email?: string;
    phone?: string;
  }) => {
    if (items.length === 0) return;

    const start = dayjs(item.checkInDate);
    const end = dayjs(item.checkOutDate);
    const nights = end.diff(start, "day");
    const totalCost = (item.price as number) * nights;

    const payload = {
      customerName: values.customerName,
      hotelName: hotel?.hotelName ?? "",
      roomNumber: String(item.roomId ?? ""),
      roomType: item.roomType ?? "",
      bookingDateTime: new Date().toISOString(),
      totalCost: totalCost,
      paymentMethod: "visa",
    };

    const ok = await createBooking(payload);

    if (ok) {
      clearCart();
      const bookingId = Math.floor(10000000 + Math.random() * 90000000);
      navigate(`/confirmation?bookingId=${bookingId}`);
    } else {
      setOpenError(true);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ py: 4, animation: theme.animations.fadeInUp }}
    >
      <Typography
        variant={MUI_TYPOGRAPHY.H4}
        color={theme.palette.primary.main}
        fontWeight={700}
        textAlign="center"
        mb={3}
      >
        Checkout
      </Typography>

      {isEmpty ? (
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
            variant={MUI_TYPOGRAPHY.H6}
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
      ) : (
        <Formik
          initialValues={{
            customerName: authUser?.givenName
              ? `${authUser.givenName} ${authUser.familyName ?? ""}`.trim()
              : "",
            email: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleCheckout}
        >
          {({ isValid, values }) => (
            <Form>
              <ItemsSection items={items} />
              <UserInfoSection />

              <CheckoutButton
                loading={status === "loading"}
                disabled={!isValid || items.length === 0}
                onCheckout={() => handleCheckout(values)}
              />

              <Snackbar
                open={openError}
                autoHideDuration={4000}
                onClose={() => setOpenError(false)}
              >
                <Alert severity="error" variant="filled">
                  {error || "Failed to complete booking"}
                </Alert>
              </Snackbar>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
}
