import { Container, Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import GallerySection from "../features/hotel/components/GallerySection";
import HotelInfoSection from "../features/hotel/components/HotelInfoSection";
import AvailableRoomsSection from "../features/hotel/components/AvailableRoomsSection";
import ReviewsSection from "../features/hotel/components/ReviewSection";

export default function HotelDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { search } = useLocation();

  const params = new URLSearchParams(search);
  const checkInDate = params.get("checkInDate");
  const checkOutDate = params.get("checkOutDate");

  if (!id) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* ================= MAIN 2-COLUMN LAYOUT ================= */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          mb: 4,
        }}
      >
        {/* ---------- LEFT COLUMN (Info + Map) ---------- */}
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

        {/* ---------- RIGHT COLUMN (Gallery + Rooms) ---------- */}
        <Box
          sx={{
            flex: "1 1 550px",
            maxWidth: { md: "62%" },
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <GallerySection hotelId={+id} sectionTitle="Photo Gallery" />
          <AvailableRoomsSection
            hotelId={+id}
            checkInDate={checkInDate!}
            checkOutDate={checkOutDate!}
          />
        </Box>
      </Box>
    </Container>
  );
}
