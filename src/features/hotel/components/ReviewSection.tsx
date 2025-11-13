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

interface ReviewsSectionProps {
  hotelId: number;
}

export default function ReviewsSection({ hotelId }: ReviewsSectionProps) {
  const theme = useTheme();
  const { data, status, error, refetch } = useReviews(hotelId);

  // 🟡 الحالات العامة
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

  // 🟢 الحالة الناجحة
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Guest Reviews
      </Typography>

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
              background: theme.palette.background.paper,
              animation: theme.animations.fadeInUp,
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1" fontWeight={600}>
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
                variant="body2"
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
  );
}
