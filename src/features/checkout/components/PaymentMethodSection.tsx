import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
  FormHelperText,
} from "@mui/material";
import { Field, useFormikContext, type FieldProps } from "formik";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import type { PaymentFormValues } from "../types/PaymentFormValues";
import { CardPaymentFields } from "./CardPaymentFields";

export default function PaymentMethodSection() {
  const { values, errors, touched, handleChange } =
    useFormikContext<PaymentFormValues>();

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
            <RadioGroup
              {...field}
              value={values.paymentMethod}
              onChange={handleChange}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label={
                  <Typography display="flex" alignItems="center" gap={1}>
                    <LocalAtmIcon /> Cash on Arrival
                  </Typography>
                }
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label={
                  <Typography display="flex" alignItems="center" gap={1}>
                    <CreditCardIcon /> Credit / Debit Card
                  </Typography>
                }
              />
            </RadioGroup>
          )}
        </Field>
        {values.paymentMethod === "card" && (
          <>
            <CardPaymentFields />
          </>
        )}
        {touched.paymentMethod && typeof errors.paymentMethod === "string" && (
          <FormHelperText error>{errors.paymentMethod}</FormHelperText>
        )}
      </CardContent>
    </Card>
  );
}
