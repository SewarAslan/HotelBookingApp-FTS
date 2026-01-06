import { Field, useFormikContext } from "formik";
import { Box, TextField } from "@mui/material";
import type { PaymentFormValues } from "../types/PaymentFormValues";

export function CardPaymentFields() {
  const {
    errors,
    touched,
    values,
    setFieldValue,
    setFieldTouched,
    validateField,
  } = useFormikContext<PaymentFormValues>();

  return (
    <Box mt={2} display="grid" gap={2} gridTemplateColumns="1fr 1fr">
      <Field name="cardHolder">
        {() => (
          <TextField
            value={values.cardHolder}
            onChange={(e) => {
              const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
              setFieldValue("cardHolder", val);
              setFieldTouched("cardHolder", true, false);
              validateField("cardHolder");
            }}
            label="Card Holder Name"
            fullWidth
            error={touched.cardHolder && Boolean(errors.cardHolder)}
            helperText={
              touched.cardHolder && typeof errors.cardHolder === "string"
                ? errors.cardHolder
                : ""
            }
          />
        )}
      </Field>

      <Field name="cardNumber">
        {() => (
          <TextField
            value={values.cardNumber}
            label="Card Number"
            fullWidth
            inputProps={{ maxLength: 19 }}
            error={touched.cardNumber && Boolean(errors.cardNumber)}
            helperText={
              touched.cardNumber && typeof errors.cardNumber === "string"
                ? errors.cardNumber
                : ""
            }
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              const spaced = raw.replace(/(.{4})/g, "$1 ").trim();
              setFieldValue("cardNumber", spaced);
              setFieldTouched("cardNumber", true, false);
              validateField("cardNumber");
            }}
          />
        )}
      </Field>

      <Field name="expiryDate">
        {() => (
          <TextField
            value={values.expiryDate}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              const slashed =
                raw.length > 2 ? raw.slice(0, 2) + "/" + raw.slice(2, 4) : raw;
              setFieldValue("expiryDate", slashed);
              setFieldTouched("expiryDate", true, false);
              validateField("expiryDate");
            }}
            label="Expiry Date (MM/YY)"
            fullWidth
            inputProps={{ maxLength: 5 }}
            error={touched.expiryDate && Boolean(errors.expiryDate)}
            helperText={
              touched.expiryDate && typeof errors.expiryDate === "string"
                ? errors.expiryDate
                : ""
            }
          />
        )}
      </Field>

      <Field name="cvc">
        {() => (
          <TextField
            value={values.cvc}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              setFieldValue("cvc", raw);
              setFieldTouched("cvc", true, false);
              validateField("cvc");
            }}
            label="CVC"
            fullWidth
            inputProps={{ maxLength: 4 }}
            error={touched.cvc && Boolean(errors.cvc)}
            helperText={
              touched.cvc && typeof errors.cvc === "string" ? errors.cvc : ""
            }
          />
        )}
      </Field>
    </Box>
  );
}
