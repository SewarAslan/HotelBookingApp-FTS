import { Container, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import GallerySection from "../features/hotel/components/GallerySection";
import HotelInfoSection from "../features/hotel/components/HotelInfoSection";
import AvailableRoomsSection from "../features/hotel/components/AvailableRoomsSection";
import ReviewsSection from "../features/hotel/components/ReviewSection";

export default function HotelDetailsPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          mb: 4,
        }}
      >
        <Box
          sx={{
            flex: "1 1 350px",
            maxWidth: { md: "35%" },
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <HotelInfoSection hotelId={+id} />
          <ReviewsSection hotelId={+id} />
        </Box>

        <Box
          sx={{
            flex: "1 1 550px",
            maxWidth: { md: "60%" },
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <GallerySection hotelId={+id} sectionTitle="Photo Gallery" />
          <AvailableRoomsSection hotelId={+id} />
        </Box>
      </Box>
    </Container>
  );
}
