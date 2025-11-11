import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string()
    .required("username is required!")
    .min(3, "username is too short!"),
  password: Yup.string()
    .required("password is required!")
    .min(3, "password is too short!"),
});
