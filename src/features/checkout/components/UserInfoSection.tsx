import { Box, Card, TextField, Typography, useTheme } from "@mui/material";
import { Field } from "formik";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

export default function UserInfoSection() {
  const theme = useTheme();

  return (
    <Card
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.customBackgrounds.glass,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant={MUI_TYPOGRAPHY.H6}
        fontWeight={700}
        sx={{ mb: 2, color: theme.palette.secondary.main }}
      >
        Contact Information
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Field
          as={TextField}
          name="customerName"
          label="Full Name"
          variant="outlined"
          fullWidth
        />

        <Field
          as={TextField}
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
        />

        <Field
          as={TextField}
          name="phone"
          label="Phone"
          variant="outlined"
          fullWidth
        />
      </Box>
    </Card>
  );
}
