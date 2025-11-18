import { useRef } from "react";
import { Box, IconButton, useTheme, Container } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useHotelGallery } from "../hooks/useHotelGallery";
import { STATUS } from "../../../constants/status";
import MessageCard from "../../../components/MessageCard";
import type { Theme } from "@mui/material/styles";

interface Props {
  hotelId: number;
  sectionTitle?: string;
}

export default function GallerySection({ hotelId }: Props) {
  const theme = useTheme();
  const carouselRef = useRef<HTMLDivElement>(null);

  const { data, status, error, refetch } = useHotelGallery(hotelId);

  const scroll = (dir: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;
    const width = container.clientWidth + 10 || 300;
    const scrollAmount = dir === "left" ? -width : width;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const shouldRender = status === STATUS.SUCCESS && data?.length;

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        animation: theme.animations.fadeInUp,
      }}
    >
      <Container maxWidth="lg">
        {status !== STATUS.SUCCESS ? (
          <MessageCard
            status={status}
            error={error}
            data={data}
            message="Loading gallery..."
            onRetry={refetch}
          />
        ) : (
          shouldRender && (
            <Box
              sx={{
                position: "relative",
                "&:hover .scroll-btn": {
                  opacity: 1,
                  pointerEvents: "auto",
                },
              }}
            >
              {/* Left arrow */}
              <IconButton
                className="scroll-btn"
                onClick={() => scroll("left")}
                aria-label="scroll left"
                sx={arrowStyles("left", theme)}
              >
                <ChevronLeftRoundedIcon sx={{ fontSize: 40 }} />
              </IconButton>

              {/* Image track */}
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  ref={carouselRef}
                  sx={{
                    display: "flex",
                    gap: 3,
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    px: 1,
                    pb: 2,
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                    "& > *": {
                      flex: "0 0 100%",
                      width: "100%",
                      height: { xs: 240, sm: 340, md: 420 },
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: 4,
                      transition: "transform 0.3s ease",
                      position: "relative",
                      "& > img": {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      },
                    },
                  }}
                >
                  {data.map((img) => (
                    <Box
                      key={img.id}
                      component="img"
                      src={img.url ?? "/placeholder.jpg"}
                      alt={`Image ${img.id}`}
                    />
                  ))}
                </Box>
              </Box>

              <IconButton
                className="scroll-btn"
                onClick={() => scroll("right")}
                aria-label="scroll right"
                sx={arrowStyles("right", theme)}
              >
                <ChevronRightRoundedIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          )
        )}
      </Container>
    </Box>
  );
}

const arrowStyles = (side: "left" | "right", theme: Theme) => ({
  position: "absolute",
  [side]: 0,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  opacity: 0,
  pointerEvents: "none",
  backdropFilter: "blur(8px) saturate(160%)",
  WebkitBackdropFilter: "blur(8px) saturate(160%)",
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: theme.palette.text.primary,
  transition: "opacity 0.3s ease, background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
});
