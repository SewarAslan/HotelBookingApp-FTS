import React, { useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Container,
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import MessageCard from "../../../components/MessageCard";
import { STATUS } from "../../../constants/status";
import {
  MUI_BREAKPOINTS,
  MUI_COLORS,
  MUI_TYPOGRAPHY,
} from "../../../constants/muiTokens";

interface CarouselSectionProps<T> {
  sectionTitle: string;
  useDataHook: () => {
    data: T[] | null;
    status: string;
    error: null | string;
    refetch: () => void;
  };
  CardComponent: React.ComponentType<{ data: T }>;
  getKey?: (item: T, index: number) => string | number;
}

const CarouselSection = <T,>({
  sectionTitle,
  useDataHook,
  CardComponent,
  getKey,
}: CarouselSectionProps<T>) => {
  const theme = useTheme();
  const carouselRef = useRef<HTMLDivElement>(null);

  const { data, status, error, refetch } = useDataHook();

  const scroll = (dir: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.clientWidth || 300;
    const scrollAmount = dir === "left" ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const shouldRenderList =
    status === STATUS.SUCCESS && Array.isArray(data) && data.length > 0;

  return (
    <Box
      component="section"
      sx={{
        py: theme.spacing(2),
        mt: theme.spacing(1),
        mb: theme.spacing(1),
        position: "relative",
        animation: theme.animations.fadeInUp,
      }}
    >
      <Container maxWidth={MUI_BREAKPOINTS.XL}>
        <Typography
          variant={MUI_TYPOGRAPHY.H5}
          fontWeight={700}
          color={MUI_COLORS.PRIMARY}
          sx={{
            mb: 1,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {sectionTitle}
        </Typography>

        {status !== STATUS.SUCCESS ? (
          <MessageCard
            status={status}
            error={error}
            data={data}
            message={`Loading ${sectionTitle.toLowerCase()}...`}
            onRetry={refetch}
          />
        ) : (
          shouldRenderList && (
            <Box
              sx={{
                position: "relative",
                "&:hover .scroll-btn": {
                  opacity: 1,
                  pointerEvents: "auto",
                },
              }}
            >
              {/* Arrows */}
              <IconButton
                className="scroll-btn"
                onClick={() => scroll("left")}
                aria-label="scroll left"
                sx={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  opacity: 0,
                  pointerEvents: "none",
                  backdropFilter: "blur(8px) saturate(160%)",
                  WebkitBackdropFilter: "blur(8px) saturate(160%)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: theme.palette.secondary.dark,
                  transition: "opacity 0.3s ease, background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                  },
                }}
              >
                <ChevronLeftRoundedIcon sx={{ fontSize: 40 }} />
              </IconButton>

              {/* Outer box with fade */}
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "100% 100%",
                  WebkitMaskSize: "100% 100%",
                }}
              >
                <Box
                  ref={carouselRef}
                  sx={{
                    display: "flex",
                    gap: 3,
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    pt: 1,
                    pb: 3,
                    px: 4,
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                    "& > *": {
                      flex: "0 0 auto",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-6px) scale(1.02)",
                        zIndex: 2,
                      },
                    },
                  }}
                >
                  {data.map((item, index) => (
                    <CardComponent
                      key={getKey?.(item, index) ?? index}
                      data={item}
                    />
                  ))}
                </Box>
              </Box>

              <IconButton
                className="scroll-btn"
                onClick={() => scroll("right")}
                aria-label="scroll right"
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  opacity: 0,
                  pointerEvents: "none",
                  backdropFilter: "blur(8px) saturate(160%)",
                  WebkitBackdropFilter: "blur(8px) saturate(160%)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: theme.palette.secondary.dark,
                  transition: "opacity 0.3s ease, background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                  },
                }}
              >
                <ChevronRightRoundedIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          )
        )}
      </Container>
    </Box>
  );
};

export default CarouselSection;
