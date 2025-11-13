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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <GallerySection hotelId={+id} />
        <HotelInfoSection hotelId={+id} />
        <AvailableRoomsSection hotelId={+id} />
        <ReviewsSection hotelId={+id} />
      </Box>
    </Container>
  );
}
