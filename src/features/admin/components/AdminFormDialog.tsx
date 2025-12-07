import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  useTheme,
} from "@mui/material";
import { Formik, Form } from "formik";
import { MUI_VARIANTS } from "../../../constants/muiTokens";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "textarea" | "select";
  options?: { label: string; value: string | number }[];
}

interface AdminFormDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  initialValues: Record<string, unknown>;
  validationSchema: unknown;
  onSubmit: (values: Record<string, unknown>) => void;
  submitLabel?: string;
}

export default function AdminFormDialog({
  open,
  onClose,
  title,
  fields,
  initialValues,
  validationSchema,
  onSubmit,
  submitLabel = "Save",
}: AdminFormDialogProps) {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: 3,
          backdropFilter: "blur(12px) saturate(160%)",
          backgroundColor: theme.palette.customBackgrounds.glass,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 8px 32px rgba(0,0,0,0.05)"
              : "0 8px 32px rgba(0,0,0,0.25)",
          animation: theme.animations.fadeInUp,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          color: theme.palette.primary.main,
        }}
      >
        {title}
      </DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <DialogContent dividers>
              <Box display="flex" flexDirection="column" gap={2}>
                {fields.map((field) => {
                  if (field.type === "select") {
                    return (
                      <TextField
                        key={field.name}
                        select
                        fullWidth
                        label={field.label}
                        name={field.name}
                        value={values[field.name] as string | ""}
                        onChange={handleChange}
                        error={
                          touched[field.name] && Boolean(errors[field.name])
                        }
                        helperText={touched[field.name] && errors[field.name]}
                      >
                        {field.options?.map((opt) => (
                          <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    );
                  }

                  return (
                    <TextField
                      key={field.name}
                      fullWidth
                      multiline={field.type === "textarea"}
                      minRows={field.type === "textarea" ? 3 : undefined}
                      type={field.type === "number" ? "number" : "text"}
                      label={field.label}
                      name={field.name}
                      value={values[field.name] as string | ""}
                      onChange={handleChange}
                      error={touched[field.name] && Boolean(errors[field.name])}
                      helperText={touched[field.name] && errors[field.name]}
                    />
                  );
                })}
              </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button
                onClick={onClose}
                variant={MUI_VARIANTS.GRADIENT2}
                color="inherit"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={MUI_VARIANTS.GRADIENT}
                sx={{ px: 4 }}
              >
                {submitLabel}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
