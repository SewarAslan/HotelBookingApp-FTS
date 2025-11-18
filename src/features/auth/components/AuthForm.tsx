import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { loginSchema } from "../../../constants/authSchemas";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { PLACEHOLDERS } from "../../../constants/placeHolders";
import { ThemeToggleButton } from "../../../components/ThemeToggleButton";

interface AuthFormProps {
  title: string;
  onSubmit: (values: { username: string; password: string }) => void;
  isLoading: boolean;
  error?: string | null;
}

const initialValues = { username: "", password: "" };

export default function AuthForm({
  title,
  onSubmit,
  isLoading,
  error,
}: AuthFormProps) {
  const [animateIn, setAnimateIn] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        background: theme.palette.gradient.tertiary,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 50,
          right: 50,
          zIndex: 10,
          backdropFilter: "blur(20px)",
          backgroundColor: theme.palette.customBackgrounds.glass,
          boxShadow: theme.shadows[3],
          borderRadius: 14,
        }}
      >
        <ThemeToggleButton />
      </Box>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top right, rgba(255, 255, 255, 0.6), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <Card
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: 400,
          width: "100%",
          p: { xs: 3, sm: 4 },
          backdropFilter: "blur(20px)",
          backgroundColor: theme.palette.customBackgrounds.glass,
          boxShadow: theme.shadows[3],
          borderRadius: 4,

          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(16px)",
          animation: theme.animations.fadeInUp,
          transition: "all 0.5s ease",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mb={2}
        >
          <Box
            component="img"
            alt="Hotel Booking Logo"
            src={PLACEHOLDERS.LOGO}
            sx={{
              width: 60,
              mb: 1,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
          <Typography variant="h6" fontWeight={700} color="primary">
            {title}
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, values, errors, touched }) => (
            <Form>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                margin="normal"
                value={values.username}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <Box textAlign="right" mb={1}>
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontWeight: 500,
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              {error && (
                <Typography
                  color="error"
                  variant="body2"
                  textAlign="center"
                  sx={{ mt: 1 }}
                >
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                type="submit"
                variant="gradient-primary"
                disabled={isLoading}
                sx={{
                  mt: 2,
                  py: 1.2,
                  borderRadius: theme.shape.borderRadius,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                {isLoading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </Form>
          )}
        </Formik>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ mt: 2, color: theme.palette.text.secondary }}
        >
          Not a member?{" "}
          <Link
            href="#"
            sx={{
              fontWeight: 600,
              color: theme.palette.secondary.main,
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            Join us now!
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}
