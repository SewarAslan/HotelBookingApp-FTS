import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

interface BookingSummary {
  customerName: string;
  email: string;
  phone: string;
  hotelName: string;
  totalCost: number;
  bookingDateTime: string;
  confirmationNumber: string;
  numberOfRooms: number;
}

export default function ConfirmationPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const location = useLocation();
  const state = location.state as { bookingSummary?: BookingSummary } | null;
  const summary = state?.bookingSummary;

  const hasData = Boolean(summary);

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 6,
        textAlign: "center",
        animation: theme.animations.fadeInUp,
      }}
    >
      <Typography
        variant={MUI_TYPOGRAPHY.H4}
        fontWeight={800}
        sx={{ mb: 2, color: theme.palette.primary.main }}
      >
        Booking Confirmed 🎉
      </Typography>

      <Typography
        variant={MUI_TYPOGRAPHY.BODY1}
        sx={{ mb: 3, color: theme.palette.text.secondary }}
      >
        Thank you for booking with <strong>Smart Stays</strong>.
      </Typography>

      {bookingId && (
        <Typography
          variant={MUI_TYPOGRAPHY.BODY1}
          sx={{ mb: 1, color: theme.palette.secondary.main }}
        >
          Booking ID: <strong>{bookingId}</strong>
        </Typography>
      )}

      {hasData ? (
        <Box
          sx={{
            mt: 3,
            p: 3,
            borderRadius: 3,
            backgroundColor: theme.palette.customBackgrounds.glass,
            border: `1px solid ${theme.palette.divider}`,
            textAlign: "left",
          }}
        >
          <Typography
            variant={MUI_TYPOGRAPHY.BODY1}
            sx={{ mb: 1, color: theme.palette.primary.main }}
          >
            Name: <strong>{summary?.customerName}</strong>
          </Typography>

          <Typography
            variant={MUI_TYPOGRAPHY.BODY2}
            sx={{ mb: 1, color: theme.palette.text.secondary }}
          >
            Email: <strong>{summary?.email}</strong>
          </Typography>

          <Typography
            variant={MUI_TYPOGRAPHY.BODY2}
            sx={{ mb: 1, color: theme.palette.text.secondary }}
          >
            Phone: <strong>{summary?.phone}</strong>
          </Typography>

          <Typography
            variant={MUI_TYPOGRAPHY.BODY1}
            sx={{ mt: 2, mb: 1, color: theme.palette.primary.main }}
          >
            Hotel: <strong>{summary?.hotelName}</strong>
          </Typography>

          <Typography
            variant={MUI_TYPOGRAPHY.BODY2}
            sx={{ mb: 1, color: theme.palette.text.secondary }}
          >
            Rooms: <strong>{summary?.numberOfRooms}</strong>
          </Typography>

          <Typography
            variant={MUI_TYPOGRAPHY.BODY1}
            sx={{ mb: 1, color: theme.palette.primary.main }}
          >
            Total Paid: <strong>${summary?.totalCost.toFixed(2)}</strong>
          </Typography>

          <Typography
            variant={MUI_TYPOGRAPHY.BODY2}
            sx={{ mb: 1, color: theme.palette.text.secondary }}
          >
            Date:{" "}
            <strong>
              {summary?.bookingDateTime
                ? new Date(summary.bookingDateTime).toLocaleString()
                : "N/A"}
            </strong>
          </Typography>

          <Typography
            variant={MUI_TYPOGRAPHY.BODY2}
            sx={{ mt: 2, color: theme.palette.secondary.main }}
          >
            Confirmation Number: <strong>{summary?.confirmationNumber}</strong>
          </Typography>
        </Box>
      ) : (
        <Typography
          variant={MUI_TYPOGRAPHY.BODY2}
          sx={{ mt: 3, color: theme.palette.text.secondary }}
        >
          Your booking was submitted, but we couldn't load the full details.
        </Typography>
      )}

      <Box sx={{ mt: 4 }}>
        <Button
          variant="gradient"
          onClick={() => navigate("/")}
          sx={{ px: 5, py: 1.5, borderRadius: 3, fontWeight: 700 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
