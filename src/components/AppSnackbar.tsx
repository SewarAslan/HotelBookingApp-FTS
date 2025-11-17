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
    >
      <Alert severity={severity} onClose={handleClose} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
