import {
  Card,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Field, useFormikContext } from "formik";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";

export default function UserInfoSection() {
  const { errors, touched } = useFormikContext<{
    customerName: string;
    email: string;
    phone: string;
  }>();
  const theme = useTheme();
  return (
    <Card
      elevation={3}
      sx={{
        mt: 4,
        borderRadius: 3,
        backgroundColor: theme.palette.customBackgrounds.glass,
        border: `1px solid ${theme.palette.divider}`,
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Typography
          variant={MUI_TYPOGRAPHY.H6}
          fontWeight={800}
          mb={3}
          sx={{ color: theme.palette.primary.main }}
        >
          Contact Information
        </Typography>

        <Stack spacing={2.5}>
          <Field
            as={TextField}
            name="customerName"
            label="Full Name"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
            error={touched.customerName && Boolean(errors.customerName)}
            helperText={touched.customerName && errors.customerName}
          />

          <Field
            as={TextField}
            name="email"
            label="Email Address"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <Field
            as={TextField}
            name="phone"
            label="Phone Number"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIphoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
