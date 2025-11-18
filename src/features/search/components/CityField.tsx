import { TextField, useTheme } from "@mui/material";
import { Field } from "formik";

export default function CityField() {
  const theme = useTheme();
  return (
    <Field
      as={TextField}
      name="city"
      label="City"
      placeholder="Enter city name"
      variant="outlined"
      fullWidth
      sx={{
        flexBasis: { xs: "100%", md: "32%" },
        "& .MuiInputBase-input": {
          color: theme.palette.text.primary,
          fontWeight: 400,
        },
        "& .MuiInputLabel-root": {
          color: theme.palette.text.primary,
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          "& fieldset": {
            borderColor: theme.palette.divider,
          },
          "&:hover fieldset": {
            borderColor: theme.palette.divider,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
        },
      }}
    />
  );
}
