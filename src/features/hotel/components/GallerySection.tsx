import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useHotelGallery } from "../hooks/useHotelGallery";
import { STATUS } from "../../../constants/status";
import MessageCard from "../../../components/MessageCard";

interface GallerySectionProps {
  hotelId: number;
}

export default function GallerySection({ hotelId }: GallerySectionProps) {
  const { data, status, error, refetch } = useHotelGallery(hotelId);
  const theme = useTheme();

  // responsive cols
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const cols = isXs ? 2 : isSm ? 3 : 4;

  // 🟢 استخدم MessageCard للحالات الثلاث:
  if (status !== STATUS.SUCCESS) {
    return (
      <MessageCard
        status={status}
        error={error}
        data={data}
        onRetry={refetch}
        message={
          status === STATUS.LOADING
            ? "Loading gallery..."
            : status === STATUS.ERROR
            ? "Failed to load gallery"
            : "No images available."
        }
      />
    );
  }

  // 🟣 عند النجاح
  if (!data || data.length === 0) {
    return (
      <MessageCard
        status={STATUS.SUCCESS}
        data={[]}
        message="No images available for this hotel."
      />
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" mb={2}>
        Picture Gallery
      </Typography>

      <ImageList
        variant="masonry"
        cols={cols}
        gap={8}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          animation: theme.animations.fadeInUp,
        }}
      >
        {data.map((photo) => (
          <ImageListItem key={photo.id}>
            <img
              src={photo.url ?? "/placeholder.jpg"}
              alt={`Photo ${photo.id}`}
              loading="lazy"
              style={{
                width: "100%",
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
