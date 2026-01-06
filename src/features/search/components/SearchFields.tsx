import { Box, Button, IconButton, useTheme } from "@mui/material";
import { Field, type FormikHelpers } from "formik";
import { MUI_VARIANTS } from "../../../constants/muiTokens";
import { TextField } from "@mui/material";
import DateRangeFields from "./DateRangeFields";
import GuestRoomSelector from "./GuestRoomSelector";
import type { SearchValues } from "./SearchForm";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFieldsProps {
  values: SearchValues;
  setFieldValue: FormikHelpers<SearchValues>["setFieldValue"];
  compact?: boolean;
  errors?: Record<string, string>;
}

export default function SearchFields({
  values,
  setFieldValue,
  compact = false,
  errors,
}: SearchFieldsProps) {
  const theme = useTheme();

  return (
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
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        }}
      />

      <DateRangeFields
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
      />

      <Box
        sx={{
          flexBasis: { xs: "100%", md: "24%" },
          display: "flex",
          gap: 1,
          alignItems: "flex-end",
        }}
      >
        <GuestRoomSelector values={values} setFieldValue={setFieldValue} />

        {compact && (
          <>
            <IconButton
              type="submit"
              size="large"
              color="primary"
              sx={{
                borderRadius: 4,
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                height: "50px",
                width: "50px",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              type="button"
              onClick={() => {
                setFieldValue("city", "");
                setFieldValue("checkInDate", null);
                setFieldValue("checkOutDate", null);
                setFieldValue("adults", 2);
                setFieldValue("children", 0);
                setFieldValue("rooms", 1);
              }}
              sx={{
                borderRadius: 4,
                backgroundColor: theme.palette.secondary.main,
                color: "#fff",
                height: "50px",
                width: "50px",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
            >
              ✕
            </IconButton>
          </>
        )}
      </Box>

      {!compact && (
        <Box
          sx={{
            flexBasis: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 1,
            gap: 2,
          }}
        >
          <Button
            type="button"
            onClick={() => {
              setFieldValue("city", "");
              setFieldValue("checkInDate", null);
              setFieldValue("checkOutDate", null);
              setFieldValue("adults", 2);
              setFieldValue("children", 0);
              setFieldValue("rooms", 1);
            }}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 3,
              fontWeight: 600,
              backgroundColor: theme.palette.secondary.main,
              color: "#fff",
              height: "48px",
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            Clear
          </Button>

          <Button
            type="submit"
            variant={MUI_VARIANTS.GRADIENT}
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              height: "48px",
            }}
          >
            Search Hotels
          </Button>
        </Box>
      )}
    </Box>
  );
}
