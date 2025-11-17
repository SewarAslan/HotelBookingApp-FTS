import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../store/snackbarSlice";
import type { RootState } from "../store/store";

export default function AppSnackbar() {
  const dispatch = useDispatch();

  const { open, message, severity } = useSelector(
    (state: RootState) => state.snackbar
  );

  const handleClose = () => dispatch(hideSnackbar());
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
          background:
            severity === "success"
              ? "linear-gradient(135deg, #4caf4fa7, #2e7d3297)"
              : severity === "error"
              ? "linear-gradient(135deg, #e57373cc, #d32f2fcc)"
              : severity === "warning"
              ? "linear-gradient(135deg, #ffb74dcc, #f57c00cc)"
              : "linear-gradient(135deg, #64b5f6cc, #1976d2cc)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          borderRadius: 3,
          color: "white",
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
