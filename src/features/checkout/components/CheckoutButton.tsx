import { Box, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useFormikContext } from "formik";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useState, useMemo } from "react";
import { useHotelDetails } from "../../hotel/hooks/useHotelDetails";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

interface UserInfoFormValues {
  customerName: string;
  email: string;
  phone: string;
}

export default function CheckoutButton() {
  const navigate = useNavigate();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const userId = authUser?.userId;
  const { values, isValid } = useFormikContext<UserInfoFormValues>();
  const { items, clearCart } = useCart();
  const [openError, setOpenError] = useState(false);

  const firstHotelId = items[0]?.hotelId;
  const { data: hotel } = useHotelDetails(firstHotelId);

  const { createBooking, status, error } = useCheckout();
  const loading = status === "loading";

  const totalCost = useMemo(() => {
    return items.reduce((sum, item) => {
      const start = dayjs(item.checkInDate);
      const end = dayjs(item.checkOutDate);
      const nights = Math.max(end.diff(start, "day"), 1);
      return sum + (item.price ?? 0) * nights;
    }, 0);
  }, [items]);

  const handleCheckout = async () => {
    if (!isValid || items.length === 0 || !userId) return;

    const bookingIds = await createBooking({ userId, items });

    if (!Array.isArray(bookingIds) || bookingIds.length === 0) {
      setOpenError(true);
      return;
    }

    const bookingDateTime = new Date().toISOString();

    const bookingId = bookingIds[0];

    const summary = {
      customerName: values.customerName,
      email: values.email,
      phone: values.phone,
      hotelName: hotel?.hotelName,
      totalCost,
      bookingDateTime,
      confirmationNumber: bookingId,
      numberOfRooms: items.length,
      items,
    };

    clearCart();

    navigate(`/confirmation?bookingId=${bookingId}`, {
      state: { bookingSummary: summary },
    });
  };

  return (
    <>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="gradient-secondary"
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
