import { Box, TextField, Typography } from "@mui/material";
import { Field, useFormikContext } from "formik";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

export default function UserInfoSection() {
  const { errors, touched } = useFormikContext<{
    customerName: string;
    email: string;
    phone: string;
  }>();

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.1)",
        mt: 3,
      }}
    >
      <Typography variant={MUI_TYPOGRAPHY.H6} fontWeight={700} mb={2}>
        Contact Information
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Field
          as={TextField}
          name="customerName"
          label="Full Name"
          variant="outlined"
          fullWidth
          error={touched.customerName && Boolean(errors.customerName)}
          helperText={touched.customerName && errors.customerName}
        />

        <Field
          as={TextField}
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />

        <Field
          as={TextField}
          name="phone"
          label="Phone"
          variant="outlined"
          fullWidth
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone}
        />
      </Box>
    </Box>
  );
}
