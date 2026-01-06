import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  customerName: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain numbers only")
    .length(9, "Phone must be exactly 9 digits")
    .required("Phone number is required"),
  paymentMethod: Yup.string().required("Please select a payment method"),
});
