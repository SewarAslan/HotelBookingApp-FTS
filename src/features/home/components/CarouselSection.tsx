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
  getKey?: (item: T, index: number) => undefined | number;
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
        py: theme.spacing(4),
        mt: theme.spacing(4),
        mb: theme.spacing(3),
        gap: theme.spacing(3),
        position: "relative",
        background: "transparent",
        overflow: "hidden",
        transition: "background 0.4s ease",
        animation: theme.animations.fadeInUp,
      }}
    >
      <Container maxWidth={MUI_BREAKPOINTS.XL}>
        <Typography
          variant={MUI_TYPOGRAPHY.H5}
          fontWeight={700}
          color={MUI_COLORS.PRIMARY}
          sx={{
            mb: 3,
            textAlign: { xs: "center", sm: "left" },
            animation: theme.animations.fadeInUp,
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
                  bgcolor: "transparent",
                  color: theme.palette.brand.violet,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "rgba(167,139,250,0.08)"
                        : "rgba(167,139,250,0.15)",
                  },
                }}
              >
                <ChevronLeftRoundedIcon sx={{ fontSize: 40 }} />
              </IconButton>

              <Box sx={{ overflow: "visible" }}>
                <Box
                  ref={carouselRef}
                  sx={{
                    display: "flex",
                    gap: 3,
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    py: 3,
                    px: 4,
                    animation: theme.animations.fadeInUp,
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
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
                  bgcolor: "transparent",
                  color: theme.palette.brand.violet,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "rgba(167,139,250,0.08)"
                        : "rgba(167,139,250,0.15)",
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
