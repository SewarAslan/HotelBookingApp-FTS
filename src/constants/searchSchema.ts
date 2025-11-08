import * as Yup from "yup";

export const searchSchema = Yup.object().shape({
  city: Yup.string().required("City is required"),
  checkInDate: Yup.date().nullable().required("Check-in is required"),
  checkOutDate: Yup.date()
    .nullable()
    .min(Yup.ref("checkInDate"), "Check-out must be after check-in")
    .required("Check-out is required"),
  adults: Yup.number().min(1).required(),
  children: Yup.number().min(0).required(),
  rooms: Yup.number().min(1).required(),
});
