import { Box, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useFormikContext } from "formik";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useState } from "react";
import { useHotelDetails } from "../../hotel/hooks/useHotelDetails";

export default function CheckoutButton() {
  const navigate = useNavigate();

  // 🔹 من Formik (UserInfoSection)
  const { values, isValid } = useFormikContext<{
    customerName: string;
    email: string;
    phone: string;
  }>();

  const { items, clearCart } = useCart();

  const { createBooking, status, error } = useCheckout();

  const [openError, setOpenError] = useState(false);
  const { data: hotel } = useHotelDetails(items[0].hotelId);

  const handleCheckout = async () => {
    if (!isValid || items.length === 0) return;

    const item = items[0];

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
      navigate("/confirmation");
    } else {
      setOpenError(true);
    }
  };

  const loading = status === "loading";

  return (
    <>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="gradient"
          onClick={handleCheckout}
          disabled={!isValid || items.length === 0 || loading}
          sx={{
            px: 6,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 700,
            minWidth: 200,
          }}
        >
          {loading ? (
            <CircularProgress size={26} sx={{ color: "white" }} />
          ) : (
            "Complete Booking"
          )}
        </Button>
      </Box>

      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled">
          {error || "Failed to complete booking. Try again."}
        </Alert>
      </Snackbar>
    </>
  );
}
