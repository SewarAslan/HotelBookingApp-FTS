import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "../../../api/client";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useReceiptPdf } from "../hooks/useReceiptPdf";
import type { CartItem } from "../../../store/cartSlice";

interface BookingSummary {
  customerName: string;
  email: string;
  phone: string;
  hotelName: string;
  totalCost: number;
  bookingDateTime: string;
  confirmationNumber: string;
  numberOfRooms: number;
  items: CartItem[];
}
interface BookingApiResponse {
  bookingId: number;
  hotelId: number;
  roomId: number;
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  price: number;
  status: string;
  bookingDate: string;
  hotel?: {
    hotelName: string;
  };
}

interface LocationState {
  bookingSummary?: BookingSummary;
}

export default function ConfirmationPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const { generatePDF } = useReceiptPdf();

  const location = useLocation();
  const state = location.state as LocationState | null;
  const summaryFromState = state?.bookingSummary ?? null;

  const [bookingData, setBookingData] = useState<BookingSummary | null>(
    summaryFromState
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBooking() {
      if (!bookingId || summaryFromState) return;

      try {
        setLoading(true);
        const res = await apiClient.api.getBooking(Number(bookingId));
        const b = res.data as BookingApiResponse;

        setBookingData({
          customerName: "",
          email: "",
          phone: "",
          hotelName: b.hotel?.hotelName ?? "",
          totalCost: b.price ?? 0,
          bookingDateTime: b.bookingDate,
          confirmationNumber: b.bookingId.toString(),
          numberOfRooms: 1,
          items: [],
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [bookingId, summaryFromState]);

  const final = bookingData;

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 6,
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: theme.animations.fadeInUp,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900 }}>
        <Typography
          variant={MUI_TYPOGRAPHY.H2}
          sx={{
            letterSpacing: 2,
            textTransform: "uppercase",
            color: theme.palette.secondary.main,
            textAlign: "center",
            mb: 1,
          }}
        >
          Thank you for your booking
        </Typography>

        <Typography
          variant={MUI_TYPOGRAPHY.H4}
          fontWeight={800}
          sx={{
            mb: 2,
            textAlign: "center",
            color: theme.palette.primary.main,
          }}
        >
          Booking Confirmed
        </Typography>

        {bookingId && (
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Chip
              icon={
                <ConfirmationNumberOutlinedIcon
                  fontSize="small"
                  sx={{ color: theme.palette.primary.main }}
                />
              }
              label={`Booking ID: ${bookingId}`}
              variant="outlined"
              sx={{
                fontWeight: 600,
                borderRadius: 999,
                borderColor: theme.palette.primary.main,
              }}
            />
          </Box>
        )}

        <Card
          elevation={3}
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: theme.palette.customBackgrounds.glass,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            sx={{
              flexBasis: { xs: "100%", md: "40%" },
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 60%, ${theme.palette.background.default} 100%)`,
              color: theme.palette.getContrastText(theme.palette.primary.main),
            }}
          >
            <Box>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <CheckCircleOutlineIcon
                  sx={{
                    fontSize: 52,
                    color: theme.palette.background.paper,
                  }}
                />
              </Box>

              <Typography
                variant={MUI_TYPOGRAPHY.H6}
                fontWeight={700}
                textAlign="center"
                sx={{ color: theme.palette.background.paper }}
              >
                Your stay is all set!
              </Typography>

              {final && (
                <Typography
                  variant={MUI_TYPOGRAPHY.BODY2}
                  sx={{
                    mt: 1.5,
                    textAlign: "center",
                    opacity: 0.9,
                    color: theme.palette.background.paper,
                  }}
                >
                  A confirmation email has been sent to{" "}
                  <strong>{final.email}</strong>. We&apos;re excited to welcome
                  you at <strong>{final.hotelName}</strong>.
                </Typography>
              )}
            </Box>

            {final && (
              <Box>
                <Divider
                  sx={{
                    borderColor: "rgba(255,255,255,0.4)",
                    mb: 1.5,
                  }}
                />
                <Stack spacing={0.5}>
                  <Typography
                    variant={MUI_TYPOGRAPHY.CAPTION}
                    sx={{ color: theme.palette.background.paper }}
                  >
                    Guest
                  </Typography>
                  <Typography
                    variant={MUI_TYPOGRAPHY.BODY1}
                    fontWeight={700}
                    sx={{ color: theme.palette.background.paper }}
                  >
                    {final.customerName}
                  </Typography>
                </Stack>
              </Box>
            )}
          </Box>

          <CardContent
            sx={{
              flex: 1,
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {loading && !final && (
              <Box
                sx={{
                  py: 6,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CircularProgress />
                <Typography
                  variant={MUI_TYPOGRAPHY.BODY2}
                  color="text.secondary"
                >
                  Loading booking details...
                </Typography>
              </Box>
            )}

            {final && (
              <>
                <Stack spacing={2.2}>
                  <Box>
                    <Typography
                      variant={MUI_TYPOGRAPHY.CAPTION}
                      color="text.secondary"
                    >
                      Hotel
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <HotelOutlinedIcon
                        fontSize="small"
                        sx={{ color: theme.palette.secondary.main }}
                      />
                      <Typography
                        variant={MUI_TYPOGRAPHY.BODY1}
                        fontWeight={700}
                      >
                        {final.hotelName}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography
                      variant={MUI_TYPOGRAPHY.CAPTION}
                      color="text.secondary"
                    >
                      Guest Contact
                    </Typography>
                    <Stack spacing={0.5}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <EmailOutlinedIcon
                          fontSize="small"
                          sx={{ color: theme.palette.secondary.main }}
                        />
                        <Typography variant={MUI_TYPOGRAPHY.BODY2}>
                          {final.email}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <PhoneIphoneOutlinedIcon
                          fontSize="small"
                          sx={{ color: theme.palette.secondary.main }}
                        />
                        <Typography variant={MUI_TYPOGRAPHY.BODY2}>
                          {final.phone}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography
                      variant={MUI_TYPOGRAPHY.CAPTION}
                      color="text.secondary"
                    >
                      Stay Details
                    </Typography>
                    <Stack spacing={0.8} sx={{ mt: 0.5 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <MeetingRoomOutlinedIcon
                          fontSize="small"
                          sx={{ color: theme.palette.secondary.main }}
                        />
                        <Typography variant={MUI_TYPOGRAPHY.BODY2}>
                          Rooms: <strong>{final.numberOfRooms}</strong>
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <CalendarMonthOutlinedIcon
                          fontSize="small"
                          sx={{ color: theme.palette.secondary.main }}
                        />
                        <Typography variant={MUI_TYPOGRAPHY.BODY2}>
                          Date:{" "}
                          <strong>
                            {new Date(final.bookingDateTime).toLocaleString()}
                          </strong>
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography
                      variant={MUI_TYPOGRAPHY.CAPTION}
                      color="text.secondary"
                    >
                      Total Paid
                    </Typography>
                    <Typography
                      variant={MUI_TYPOGRAPHY.H6}
                      fontWeight={800}
                      sx={{ color: theme.palette.primary.main, mt: 0.5 }}
                    >
                      ${final.totalCost.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ mt: 3, textAlign: "right" }}>
                  <Button
                    variant="gradient-secondary"
                    onClick={() => {
                      if (!final) return;

                      const pdfData = {
                        ...final,
                        items: final.items.map((item) => ({
                          roomType: item.roomType!,
                          roomId: item.roomId,
                          checkInDate: item.checkInDate!,
                          checkOutDate: item.checkOutDate!,
                          price: item.price,
                        })),
                      };

                      generatePDF(pdfData);
                    }}
                  >
                    Download Receipt (PDF)
                  </Button>
                </Box>
              </>
            )}

            {!loading && !final && (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography
                  variant={MUI_TYPOGRAPHY.BODY1}
                  color="text.secondary"
                >
                  We couldn&apos;t find booking details for this confirmation.
                </Typography>
                <Button
                  variant="gradient-primary"
                  sx={{ mt: 2, borderRadius: 3, px: 4 }}
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
