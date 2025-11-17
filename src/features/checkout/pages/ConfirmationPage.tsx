import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "../../../api/client";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";
import type { BookingDetailsDto } from "../../../api/Api";

export default function ConfirmationPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { search } = useLocation();

  const params = new URLSearchParams(search);
  const bookingId = Number(params.get("bookingId"));

  const [booking, setBooking] = useState<BookingDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) return;

    async function fetchBooking() {
      try {
        const res = await apiClient.api.getBooking(bookingId);
        setBooking(res.data);
      } catch (err) {
        console.error("Failed to fetch booking info:", err);
      } finally {
        setLoading(false);
      }
    }

    void fetchBooking();
  }, [bookingId]);

  if (!bookingId) {
    return (
      <Typography color="error" textAlign="center" mt={4}>
        Invalid booking reference.
      </Typography>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 6,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!booking) {
    return (
      <Typography color="error" textAlign="center" mt={4}>
        Booking not found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 6,
        textAlign: "center",
        animation: theme.animations.fadeInUp,
      }}
    >
      <Typography
        variant={MUI_TYPOGRAPHY.H4}
        fontWeight={700}
        color={theme.palette.success.main}
        mb={3}
      >
        🎉 Booking Confirmed!
      </Typography>

      <Card
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: theme.palette.customBackgrounds.glass,
          border: `1px solid ${theme.palette.divider}`,
          textAlign: "left",
        }}
      >
        <Typography variant={MUI_TYPOGRAPHY.H6} fontWeight={700} mb={2}>
          Booking Details
        </Typography>

        <Typography variant="body1">
          <strong>Booking ID:</strong> {bookingId}
        </Typography>

        <Typography variant="body1">
          <strong>Hotel:</strong> {booking.hotelName}
        </Typography>

        <Typography variant="body1">
          <strong>Room:</strong> {booking.roomType} (#{booking.roomNumber})
        </Typography>

        <Typography variant="body1">
          <strong>Total Cost:</strong> ${booking.totalCost}
        </Typography>

        <Typography variant="body1">
          <strong>Date:</strong>{" "}
          {booking.bookingDateTime
            ? new Date(booking.bookingDateTime).toLocaleString()
            : "N/A"}
        </Typography>
      </Card>

      <Button
        variant="gradient"
        sx={{ mt: 4, px: 4, py: 1.5, fontWeight: 700, borderRadius: 3 }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Box>
  );
}
