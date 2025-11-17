import React from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  useTheme,
  Card,
} from "@mui/material";
import { UI_IMAGES } from "../constants/UI_IMAGES";
import { STATUS } from "../constants/status";
import {
  MUI_COLORS,
  MUI_TYPOGRAPHY,
  MUI_VARIANTS,
} from "../constants/muiTokens";

interface MessageCardProps {
  status: string;
  message?: string;
  error?: string | null;
  data?: unknown | unknown[] | null;
  onRetry?: () => void;
}

const MessageCard = React.memo(
  ({ status, message, error, data, onRetry }: MessageCardProps) => {
    const theme = useTheme();

    if (status === STATUS.LOADING) {
      return (
        <Card
          elevation={0}
          sx={{
            height: 260,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.primary.main,
            gap: 2,
            animation: theme.animations.fadeInUp,
            background: "transparent",
          }}
        >
          <CircularProgress
            color={MUI_COLORS.PRIMARY}
            size={42}
            thickness={4}
          />
          <Typography
            variant={MUI_TYPOGRAPHY.BODY2}
            color={"text." + MUI_COLORS.SECONDARY}
            fontWeight={500}
            sx={{ mt: 1 }}
          >
            {message || "Loading..."}
          </Typography>
        </Card>
      );
    }

    if (status === STATUS.ERROR) {
      return (
        <Card
          elevation={0}
          sx={{
            height: 260,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            textAlign: "center",
            color: theme.palette.error.main,
            background: "transparent",
            animation: theme.animations.fadeInUp,
          }}
        >
          <Box
            component="img"
            src={UI_IMAGES.error}
            alt="error"
            sx={{ width: 80, height: 80, objectFit: "contain" }}
          />
          <Typography
            variant={MUI_TYPOGRAPHY.BODY2}
            color={"text." + MUI_COLORS.SECONDARY}
            sx={{ mt: 0.5 }}
          >
            {error || "Something went wrong."}
          </Typography>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant={MUI_VARIANTS.GRADIENT}
              sx={{
                mt: 1,
                px: 3,
                py: 0.8,
                fontWeight: 600,
                borderRadius: theme.shape.borderRadius,
              }}
            >
              Retry
            </Button>
          )}
        </Card>
      );
    }

    if (status === STATUS.SUCCESS && Array.isArray(data) && data.length === 0) {
      return (
        <Card
          elevation={0}
          sx={{
            height: 260,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            textAlign: "center",
            color: theme.palette.text.secondary,
            background: "transparent",
            animation: theme.animations.fadeInUp,
          }}
        >
          <Box
            component="img"
            src={UI_IMAGES.empty}
            alt="empty"
            sx={{ width: 80, height: 80, objectFit: "contain" }}
          />
          <Typography variant={MUI_TYPOGRAPHY.BODY2} sx={{ mt: 0.5 }}>
            {message || "No data available."}
          </Typography>
        </Card>
      );
    }

    return null;
  }
);

MessageCard.displayName = "MessageCard";
export default MessageCard;
