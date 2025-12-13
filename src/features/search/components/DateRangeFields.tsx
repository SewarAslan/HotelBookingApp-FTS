import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface DateRangeFieldsProps {
  values: {
    checkInDate: Dayjs | null;
    checkOutDate: Dayjs | null;
  };
  setFieldValue: (field: string, value: Dayjs | null) => void;
  errors?: {
    checkInDate?: string;
    checkOutDate?: string;
  };
}

export default function DateRangeFields({
  values,
  setFieldValue,
  errors,
}: DateRangeFieldsProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Check-in"
        value={values.checkInDate}
        onChange={(v) => setFieldValue("checkInDate", v)}
        minDate={dayjs()}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "outlined",
            error: Boolean(errors?.checkInDate),
            helperText: errors?.checkInDate,
          },
        }}
        sx={{ flexBasis: { xs: "48%", md: "20%" } }}
      />

      <DatePicker
        label="Check-out"
        value={values.checkOutDate}
        onChange={(v) => setFieldValue("checkOutDate", v)}
        minDate={values.checkInDate?.add(1, "day")}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "outlined",
            error: Boolean(errors?.checkInDate),
            helperText: errors?.checkInDate,
          },
        }}
        sx={{ flexBasis: { xs: "48%", md: "20%" } }}
      />
    </LocalizationProvider>
  );
}
