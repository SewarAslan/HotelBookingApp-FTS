import { Box, Button, CircularProgress } from "@mui/material";

interface CheckoutButtonProps {
  loading: boolean;
  disabled: boolean;
  onCheckout: () => void;
}

export default function CheckoutButton({
  loading,
  disabled,
  onCheckout,
}: CheckoutButtonProps) {
  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <Button
        variant="gradient"
        onClick={onCheckout}
        disabled={disabled || loading}
        sx={{
          px: 6,
          py: 1.5,
          borderRadius: 3,
          fontWeight: 700,
          minWidth: 200,
        }}
      >
        {loading ? (
          <CircularProgress size={26} sx={{ color: "white" }} />
        ) : (
          "Complete Booking"
        )}
      </Button>
    </Box>
  );
}
