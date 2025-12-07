import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { MUI_VARIANTS } from "../../../constants/muiTokens";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "Do you really want to proceed?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: 3,
          backdropFilter: "blur(12px) saturate(160%)",
          backgroundColor: theme.palette.customBackgrounds.glass,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 8px 32px rgba(0,0,0,0.05)"
              : "0 8px 32px rgba(0,0,0,0.25)",
          animation: theme.animations.fadeInUp,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
        {title}
      </DialogTitle>

      <DialogContent>
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          color="inherit"
          variant={MUI_VARIANTS.GRADIENT2}
        >
          {cancelLabel}
        </Button>

        <Button
          onClick={onConfirm}
          color="error"
          variant={MUI_VARIANTS.GRADIENT}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
