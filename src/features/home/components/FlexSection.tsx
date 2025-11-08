import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import MessageCard from "../../../components/MessageCard";
import { STATUS } from "../../../constants/status";
import {
  MUI_BREAKPOINTS,
  MUI_COLORS,
  MUI_TYPOGRAPHY,
} from "../../../constants/muiTokens";

interface FlexSectionProps<T> {
  sectionTitle: string;
  useDataHook: () => {
    data: T[] | null;
    status: string;
    error: string | null;
    refetch: () => void;
  };
  CardComponent: React.ComponentType<{ data: T }>;
  getKey?: (item: T, index: number) => undefined | number;
  gap?: number;
  minWidth?: number;
  maxWidth?: number;
}

const FlexSection = <T,>({
  sectionTitle,
  useDataHook,
  CardComponent,
  getKey,
  gap = 24,
  minWidth = 180,
  maxWidth = 260,
}: FlexSectionProps<T>) => {
  const theme = useTheme();
  const { data, status, error, refetch } = useDataHook();

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
        backgroundColor: "transparent",
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
            animation: `${theme.animations.fadeInUp} 0.6s ease`,
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
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "stretch",
                gap: `${gap}px`,
                animation: `${theme.animations.fadeInUp} 0.8s ease`,
              }}
            >
              {data.map((item, index) => (
                <Box
                  key={getKey?.(item, index) ?? index}
                  sx={{
                    flex: `1 1 ${minWidth}px`,
                    maxWidth: `${maxWidth}px`,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CardComponent data={item} />
                </Box>
              ))}
            </Box>
          )
        )}
      </Container>
    </Box>
  );
};

export default React.memo(FlexSection) as typeof FlexSection;
