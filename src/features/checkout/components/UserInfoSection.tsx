import { Box, Card, TextField, Typography, useTheme } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useAuthActions } from "../../auth/hooks";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";
import { validationSchema } from "../../../constants/validationSchema";

export default function UserInfoSection() {
  const theme = useTheme();
  const { authUser } = useAuthActions();

  const initialValues = {
    customerName: authUser?.givenName
      ? `${authUser?.givenName} ${authUser?.familyName ?? ""}`.trim()
      : "",
    email: "",
    phone: "",
  };

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

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ errors, touched }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Field
                as={TextField}
                name="customerName"
                label="Full Name"
                variant="outlined"
                fullWidth
                error={touched.customerName && Boolean(errors.customerName)}
                helperText={touched.customerName ? errors.customerName : ""}
              />

              <Field
                as={TextField}
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email ? errors.email : ""}
              />

              <Field
                as={TextField}
                name="phone"
                label="Phone"
                variant="outlined"
                fullWidth
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone ? errors.phone : ""}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
