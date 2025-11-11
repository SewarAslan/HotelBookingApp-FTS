import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface DateRangeFieldsProps {
  values: {
    checkInDate: Dayjs;
    checkOutDate: Dayjs;
  };
  setFieldValue: (field: string, value: Dayjs) => void;
}

export default function DateRangeFields({
  values,
  setFieldValue,
}: DateRangeFieldsProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Check-in"
        value={values.checkInDate}
        onChange={(v: Dayjs | null) =>
          setFieldValue("checkInDate", v || values.checkInDate)
        }
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "outlined",
          },
        }}
        sx={{ flexBasis: { xs: "48%", md: "20%" } }}
      />

      <DatePicker
        label="Check-out"
        value={values.checkOutDate}
        onChange={(v: Dayjs | null) =>
          setFieldValue("checkOutDate", v || values.checkOutDate)
        }
        minDate={values.checkInDate.add(1, "day")}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "outlined",
          },
        }}
        sx={{ flexBasis: { xs: "48%", md: "20%" } }}
      />
    </LocalizationProvider>
  );
}
