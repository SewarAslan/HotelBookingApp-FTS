import { Snackbar, Alert, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../store/snackbarSlice";
import type { RootState } from "../store/store";

export default function AppSnackbar() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { open, message, severity } = useSelector(
    (state: RootState) => state.snackbar
  );

  const handleClose = () => dispatch(hideSnackbar());

  const getGradient = () => {
    switch (severity) {
      case "success":
        return "linear-gradient(135deg, #81c784cc, #388e3ccc)";
      case "error":
        return "linear-gradient(135deg, #e57373cc, #d32f2fcc)";
      case "warning":
        return "linear-gradient(135deg, #ffb74dcc, #f57c00cc)";
      case "info":
      default:
        return "linear-gradient(135deg, #64b5f6cc, #1976d2cc)";
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionProps={{ timeout: 500 }}
      sx={{
        "& .MuiPaper-root": {
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          background: getGradient(),
          boxShadow:
            theme.palette.mode === "light"
              ? "0 8px 32px rgba(0,0,0,0.1)"
              : "0 8px 32px rgba(0,0,0,0.4)",
          borderRadius: 3,
          color: theme.palette.getContrastText(theme.palette.background.paper),
          px: 2,
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        icon={false}
        sx={{
          fontWeight: 600,
          letterSpacing: "0.3px",
          borderRadius: 3,
          background: "transparent",
          color: "inherit",
          "& .MuiAlert-message": {
            fontSize: "1rem",
            textAlign: "center",
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
