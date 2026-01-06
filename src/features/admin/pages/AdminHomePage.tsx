import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { useAuthActions } from "../../auth";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";
import { useAdminAnalytics } from "../hooks/useAdminAnalytics";
import StatCard from "../components/StatCard";
import BookingStatusChart from "../components/BookingStatusChart";
import RevenueLineChart from "../components/RevenueLineChart";

import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PaidIcon from "@mui/icons-material/Paid";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { STATUS } from "../../../constants/status";
export default function AdminHomePage() {
  const { authUser } = useAuthActions();
  const theme = useTheme();
  const { analytics, status } = useAdminAnalytics();

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant={MUI_TYPOGRAPHY.H2}
          color={theme.palette.secondary.main}
        >
          Welcome {authUser?.givenName} {authUser?.familyName}
        </Typography>

        <Typography
          color={theme.palette.secondary.dark}
          variant={MUI_TYPOGRAPHY.H6}
        >
          Here you can See Your Analytics.
        </Typography>
      </Box>

      {status === STATUS.SUCCESS && analytics && (
        <>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              mt: 4,
            }}
          >
            <Box
              sx={{
                flexBasis: {
                  xs: "100%",
                  sm: "calc(50% - 24px)",
                  md: "calc(25% - 24px)",
                },
                maxWidth: {
                  xs: "100%",
                  sm: "calc(50% - 24px)",
                  md: "calc(25% - 24px)",
                },
              }}
            >
              <StatCard
                title="Total Bookings"
                value={analytics.totalBookings}
                icon={<BookOnlineIcon />}
              />
            </Box>

            <Box
              sx={{
                flexBasis: {
                  xs: "100%",
                  sm: "calc(50% - 24px)",
                  md: "calc(25% - 24px)",
                },
                maxWidth: {
                  xs: "100%",
                  sm: "calc(50% - 24px)",
                  md: "calc(25% - 24px)",
                },
              }}
            >
              <StatCard
                title="Total Revenue"
                value={`$${analytics.totalRevenue}`}
                icon={<PaidIcon />}
                color={theme.palette.success.main}
              />
            </Box>

            <Box
              sx={{
                flexBasis: {
                  xs: "100%",
                  sm: "calc(50% - 24px)",
                  md: "calc(25% - 24px)",
                },
                maxWidth: {
                  xs: "100%",
                  sm: "calc(50% - 24px)",
                  md: "calc(25% - 24px)",
                },
              }}
            >
              <StatCard
                title="Confirmed"
                value={
                  analytics.statusChart.find((s) => s.name === "Confirmed")
                    ?.value ?? 0
                }
                icon={<CheckCircleIcon />}
                color={theme.palette.info.main}
              />
            </Box>

            <Box
              sx={{
                flexBasis: {
                  xs: "100%",
                  sm: "calc(50% - 24px)",
                  md: "calc(25% - 24px)",
                },
                maxWidth: {
                  xs: "100%",
                  sm: "calc(50% - 24px)",
                  md: "calc(25% - 24px)",
                },
              }}
            >
              <StatCard
                title="Cancelled"
                value={
                  analytics.statusChart.find((s) => s.name === "Cancelled")
                    ?.value ?? 0
                }
                icon={<CancelIcon />}
                color={theme.palette.error.main}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              mt: 6,
              width: "100%",
              alignItems: "stretch",
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <Box
              sx={{
                flexBasis: {
                  xs: "100%",
                  md: "35%",
                },
                maxWidth: {
                  xs: "100%",
                  md: "35%",
                },
              }}
            >
              <BookingStatusChart data={analytics.statusChart} />
            </Box>

            <Box
              sx={{
                flexBasis: {
                  xs: "100%",
                  md: "65%",
                },
                maxWidth: {
                  xs: "100%",
                  md: "65%",
                },
              }}
            >
              <RevenueLineChart data={analytics.revenueChart} />
            </Box>
          </Box>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Card
              sx={{
                p: 2,
                minWidth: 250,
                backgroundColor: theme.palette.customBackgrounds.glass,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color={theme.palette.primary.main}
                >
                  Most Booked Hotel
                </Typography>
                <Typography color={theme.palette.secondary.main}>
                  Hotel ID: {analytics.mostBookedHotel?.hotelId}
                </Typography>
                <Typography color={theme.palette.secondary.main}>
                  Bookings: {analytics.mostBookedHotel?.bookings}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </>
      )}
    </Box>
  );
}
