import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
} from "@mui/material";
import { Field, useFormikContext, type FieldProps } from "formik";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

export default function PaymentMethodSection() {
  const { errors, touched } = useFormikContext<{ paymentMethod: string }>();
  const theme = useTheme();

  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 3,
        backgroundColor: theme.palette.customBackgrounds.glass,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={800}
          mb={2}
          color={theme.palette.primary.main}
        >
          Payment Method
        </Typography>

        <Field name="paymentMethod">
          {({ field }: FieldProps) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="card"
                control={<Radio />}
                label={
                  <Typography display="flex" alignItems="center" gap={1}>
                    <CreditCardIcon /> Credit / Debit Card
                  </Typography>
                }
              />

              <FormControlLabel
                value="cash"
                control={<Radio />}
                label={
                  <Typography display="flex" alignItems="center" gap={1}>
                    <LocalAtmIcon /> Cash on Arrival
                  </Typography>
                }
              />
            </RadioGroup>
          )}
        </Field>

        {touched.paymentMethod && errors.paymentMethod && (
          <Typography color="error" variant="caption">
            {errors.paymentMethod}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
