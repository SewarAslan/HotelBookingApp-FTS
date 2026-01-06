import * as Yup from "yup";

export const paymentDetailsSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .test("cardNumber", "Card number must be 16 digits", (v) => {
      const digits = (v ?? "").replace(/\s/g, "");
      return digits.length === 16;
    }),

  expiryDate: Yup.string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Format must be MM/YY"),
  cvc: Yup.string()
    .required("CVC is required")
    .matches(/^[0-9]{3,4}$/, "Must be 3 or 4 digits"),
  cardHolder: Yup.string().required("Card holder name is required"),
});
