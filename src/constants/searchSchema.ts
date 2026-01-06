import dayjs, { Dayjs } from "dayjs";
import * as Yup from "yup";

export const searchSchema = Yup.object().shape({
  city: Yup.string().notRequired(),

  checkInDate: Yup.mixed().nullable().notRequired(),

  checkOutDate: Yup.mixed()
    .nullable()
    .test(
      "check-out-after-check-in",
      "Check-out must be after check-in",
      function (value) {
        const inDate = this.parent.checkInDate;

        if (!inDate || !value) return true;
        return dayjs(value as Dayjs).isAfter(dayjs(inDate as Dayjs));
      }
    )
    .notRequired(),

  adults: Yup.number().min(1).required(),
  children: Yup.number().min(0).required(),
  rooms: Yup.number().min(1).required(),
});
