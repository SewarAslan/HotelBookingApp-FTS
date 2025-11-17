import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  customerName: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
});
