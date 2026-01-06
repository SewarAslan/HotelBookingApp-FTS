import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  useTheme,
} from "@mui/material";
import { useState } from "react";

export default function ConfirmationDialog({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: (code: string) => void;
}) {
  const [code, setCode] = useState("");
  const theme = useTheme();
  const handleConfirm = () => {
    if (/^\d{6}$/.test(code)) {
      onSuccess(code);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: 3,
          backdropFilter: "blur(12px) saturate(160%)",
          backgroundColor: "rgba(255, 255, 255, 0.89)",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 8px 32px rgba(0,0,0,0.05)"
              : "0 8px 32px rgba(0,0,0,0.25)",
          animation: theme.animations.fadeInUp,
        },
      }}
    >
      <DialogTitle color={theme.palette.primary.main}>
        Enter Confirmation Code
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="6-digit code"
          value={code}
          onChange={(e) =>
            setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="gradient-secondary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="gradient-primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
