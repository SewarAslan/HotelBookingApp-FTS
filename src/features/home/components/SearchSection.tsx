import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Popover,
  IconButton,
  useTheme,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { MUI_TYPOGRAPHY, MUI_VARIANTS } from "../../../constants/muiTokens";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { searchSchema } from "../../../constants/searchSchema";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function SearchSection() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Formik
      initialValues={{
        city: "",
        checkInDate: dayjs(),
        checkOutDate: dayjs().add(1, "day"),
        adults: 2,
        children: 0,
        rooms: 1,
      }}
      validationSchema={searchSchema}
      onSubmit={(values) => {
        const params = new URLSearchParams({
          city: values.city,
          checkIn: values.checkInDate.format("YYYY-MM-DD"),
          checkOut: values.checkOutDate.format("YYYY-MM-DD"),
          adults: String(values.adults),
          children: String(values.children),
          rooms: String(values.rooms),
        });

        navigate(`/search-results?${params.toString()}`);
      }}
    >
      {({ values, setFieldValue }) => {
        const summary = `${values.adults} Adults, ${
          values.children
        } Children, ${values.rooms} Room${values.rooms > 1 ? "s" : ""}`;
        const handleChange = (
          field: "adults" | "children" | "rooms",
          delta: number
        ) => {
          const min = field === "children" ? 0 : 1;
          setFieldValue(field, Math.max(min, values[field] + delta));
        };
        return (
          <Form>
            <Box
              component="section"
              sx={{
                py: theme.spacing(1),
                mt: theme.spacing(1),
                mb: theme.spacing(1),
                gap: theme.spacing(3),
                position: "relative",
                background: "none",
                overflow: "visible",
                transition: "background 0.4s ease",
                animation: theme.animations.fadeInUp,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                elevation={10}
                sx={{
                  p: { xs: 2, md: 4 },
                  width: "100%",
                  maxWidth: 1100,
                  borderRadius: theme.shape.borderRadius,
                  backdropFilter: "blur(6px)",
                  backgroundColor: theme.palette.gradient.tertiary,
                }}
              >
                <Typography
                  variant={MUI_TYPOGRAPHY.H4}
                  sx={{
                    mb: 2,
                    color: theme.palette.secondary.main,
                    textAlign: "center",
                    height: "56px",
                  }}
                >
                  Find Your Perfect Stay
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    justifyContent: "space-between",
                  }}
                >
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
                          borderColor: theme.palette.text.primary,
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.text.primary,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused &.MuiInputLabel-root": {
                          color: theme.palette.primary.main,
                        },
                      },
                    }}
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Check‑in"
                      value={values.checkInDate}
                      onChange={(v) => setFieldValue("checkInDate", v)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                        },
                      }}
                      sx={{ flexBasis: { xs: "48%", md: "20%" } }}
                    />
                    <DatePicker
                      label="Check‑out"
                      value={values.checkOutDate}
                      onChange={(v) => setFieldValue("checkOutDate", v)}
                      minDate={values.checkInDate || undefined}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                        },
                      }}
                      sx={{
                        flexBasis: { xs: "48%", md: "20%" },
                        height: "56px",
                      }}
                    />
                  </LocalizationProvider>

                  <Box sx={{ flexBasis: { xs: "100%", md: "24%" } }}>
                    <Button
                      variant={MUI_VARIANTS.OUTLINED}
                      fullWidth
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      sx={{
                        height: "56px",
                        textTransform: "none",
                        backgroundColor: theme.palette.background.paper,
                        fontWeight: 600,
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {summary}
                    </Button>

                    <Popover
                      open={open}
                      anchorEl={anchorEl}
                      onClose={() => setAnchorEl(null)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      PaperProps={{
                        sx: {
                          p: 2,
                          width: 280,
                          borderRadius: 4,
                          border: "1px solid" + theme.palette.primary.main,
                        },
                      }}
                    >
                      <Typography
                        variant={MUI_TYPOGRAPHY.SUBTITLE1}
                        fontWeight={600}
                        mb={1.5}
                        color={theme.palette.primary.main}
                      >
                        Guests
                      </Typography>

                      {[
                        {
                          label: "Adults",
                          value: values.adults,
                          type: "adults",
                        },
                        {
                          label: "Children",
                          value: values.children,
                          type: "children",
                        },
                        { label: "Rooms", value: values.rooms, type: "rooms" },
                      ].map(({ label, value, type }) => (
                        <Box
                          key={type}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: theme.palette.primary.main,
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              color: theme.palette.primary.main,
                            }}
                          >
                            {label}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              sx={{ color: theme.palette.secondary.main }}
                              onClick={() =>
                                handleChange(
                                  type as "adults" | "children" | "rooms",
                                  -1
                                )
                              }
                              disabled={
                                (type === "adults" && values.adults === 1) ||
                                (type === "children" &&
                                  values.children === 0) ||
                                (type === "rooms" && values.rooms === 1)
                              }
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography
                              sx={{
                                color: theme.palette.primary.main,
                              }}
                            >
                              {value}
                            </Typography>
                            <IconButton
                              size="small"
                              sx={{ color: theme.palette.secondary.main }}
                              onClick={() =>
                                handleChange(
                                  type as "adults" | "children" | "rooms",
                                  1
                                )
                              }
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}

                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => setAnchorEl(null)}
                        sx={{
                          mt: 1.5,
                          textTransform: "uppercase",
                          fontWeight: 600,
                          borderColor: theme.palette.secondary.main,
                          color: theme.palette.secondary.main,
                          height: "56px",
                          "& .MuiOutlinedInput-root": {
                            height: "100%",
                            fontWeight: 600,
                          },
                          "& .MuiInputLabel-root": {
                            top: "-4px",
                          },
                        }}
                      >
                        Apply
                      </Button>
                    </Popover>
                  </Box>

                  <Box
                    sx={{
                      flexBasis: "100%",
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="gradient"
                      size="large"
                      sx={{
                        px: 6,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: "1rem",
                      }}
                    >
                      Search Hotels
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
