import { useTheme } from "@mui/material";
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
  const theme = useTheme();
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
          popper: {
            sx: {
              "& .MuiPaper-root": {
                borderRadius: 4,
                border: `1px solid rgba(255,255,255,0.18)`,
                backgroundColor: "rgba(255, 255, 255, 0.89)",
                backdropFilter: "blur(12px) saturate(160%)",
                WebkitBackdropFilter: "blur(12px) saturate(160%)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              },
              "& .MuiPickersCalendarHeader-label": {
                fontSize: "1rem",
                fontWeight: "bold",
                color: theme.palette.primary.main,
              },

              "& .MuiPickersArrowSwitcher-button": {
                color: theme.palette.primary.main,
              },

              "& .MuiDayCalendar-weekDayLabel": {
                color: theme.palette.secondary.main,
                fontWeight: 600,
              },

              "& .MuiPickersDay-root": {
                color: "#222",
                fontSize: "0.9rem",
                borderRadius: "10px",
              },

              "& .Mui-selected": {
                color: "#fff ",
              },
            },
          },
        }}
        sx={{
          flexBasis: { xs: "48%", md: "20%" },
        }}
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
            error: Boolean(errors?.checkOutDate),
            helperText: errors?.checkOutDate,
          },
          popper: {
            sx: {
              "& .MuiPaper-root": {
                borderRadius: 4,
                border: `1px solid rgba(255,255,255,0.18)`,
                backgroundColor: "rgba(255, 255, 255, 0.89)",
                backdropFilter: "blur(12px) saturate(160%)",
                WebkitBackdropFilter: "blur(12px) saturate(160%)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              },
              "& .MuiPickersCalendarHeader-label": {
                fontSize: "1rem",
                fontWeight: "bold",
                color: theme.palette.primary.main,
              },

              "& .MuiPickersArrowSwitcher-button": {
                color: theme.palette.primary.main,
              },

              "& .MuiDayCalendar-weekDayLabel": {
                color: theme.palette.secondary.main,
                fontWeight: 600,
              },

              "& .MuiPickersDay-root": {
                color: "#222",
                fontSize: "0.9rem",
                borderRadius: "10px",
              },

              "& .Mui-selected": {
                color: "#fff ",
              },
            },
          },
        }}
        sx={{ flexBasis: { xs: "48%", md: "20%" } }}
      />
    </LocalizationProvider>
  );
}
