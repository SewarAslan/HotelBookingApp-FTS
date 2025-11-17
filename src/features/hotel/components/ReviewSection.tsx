import {
  Box,
  Typography,
  Card,
  CardContent,
  Rating,
  useTheme,
  Stack,
} from "@mui/material";
import { useReviews } from "../hooks/useReviews";
import { STATUS } from "../../../constants/status";
import MessageCard from "../../../components/MessageCard";
import { MUI_COLORS, MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

interface ReviewsSectionProps {
  hotelId: number;
}

export default function ReviewsSection({ hotelId }: ReviewsSectionProps) {
  const theme = useTheme();
  const { data, status, error, refetch } = useReviews(hotelId);

  if (status !== STATUS.SUCCESS) {
    return (
      <MessageCard
        status={status}
        error={error}
        data={data}
        onRetry={refetch}
        message={
          status === STATUS.LOADING
            ? "Loading reviews..."
            : status === STATUS.ERROR
            ? "Failed to load reviews"
            : "No reviews available."
        }
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <MessageCard
        status={STATUS.SUCCESS}
        data={[]}
        message="No reviews available for this hotel."
      />
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      <Typography
        variant={MUI_TYPOGRAPHY.H5}
        fontWeight={900}
        color={theme.palette.primary.main}
        mb={1}
      >
        Guest Reviews
      </Typography>

      <Box
        sx={{
          py: 2,
          maxHeight: 350,
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.palette.primary.light,
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: theme.palette.primary.main,
          },
        }}
      >
        <Stack spacing={2}>
          {data.map((review) => (
            <Card
              key={review.reviewId}
              sx={{
                borderRadius: 3,
                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 3px 10px rgba(0,0,0,0.05)"
                    : "0 3px 10px rgba(0,0,0,0.25)",
                background: theme.palette.customBackgrounds.glass,
                animation: theme.animations.fadeInUp,
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant={MUI_TYPOGRAPHY.SUBTITLE1}
                    color={MUI_COLORS.SECONDARY}
                    fontWeight={600}
                  >
                    {review.customerName ?? "Anonymous"}
                  </Typography>

                  <Rating
                    value={review.rating ?? 0}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                </Stack>

                <Typography
                  variant={MUI_TYPOGRAPHY.BODY2}
                  color="text.secondary"
                  mt={1}
                  lineHeight={1.6}
                >
                  {review.description ?? "No description provided."}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
