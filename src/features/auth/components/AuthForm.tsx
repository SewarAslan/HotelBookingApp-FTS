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
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, #f3e8ff, #ede9fe)"
            : "linear-gradient(135deg, #2a1840, #3c2060)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            theme.palette.mode === "light"
              ? "radial-gradient(circle at top right, rgba(125, 64, 165, 0.6), transparent 70%)"
              : "radial-gradient(circle at top right, rgba(124,58,237,0.2), transparent 70%)",
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
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.54)"
              : "rgba(25,25,35,0.7)",
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
            src="data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%2235%2035%20189%20122%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20aria-label%3D%22Hotel%20booking%20S-key%20logo%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22lavenderGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23C4B5FD%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23A78BFA%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Ccircle%20cx%3D%2296%22%20cy%3D%2296%22%20r%3D%2256%22%20stroke%3D%22url(%23lavenderGrad)%22%20stroke-width%3D%2210%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M120%2078c0-12-10-22-28-22-18%200-28%208-28%2018%200%2010%208%2014%2024%2018l6%201c18%204%2026%209%2026%2020%200%2012-12%2020-30%2020s-30-8-30-22%22%20stroke%3D%22url(%23lavenderGrad)%22%20stroke-width%3D%2210%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%2F%3E%3Crect%20x%3D%22136%22%20y%3D%2291%22%20width%3D%2288%22%20height%3D%2210%22%20rx%3D%225%22%20fill%3D%22url(%23lavenderGrad)%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%2291%22%20width%3D%228%22%20height%3D%2218%22%20rx%3D%223%22%20fill%3D%22url(%23lavenderGrad)%22%2F%3E%3Crect%20x%3D%22196%22%20y%3D%2291%22%20width%3D%228%22%20height%3D%2212%22%20rx%3D%223%22%20fill%3D%22url(%23lavenderGrad)%22%2F%3E%3C%2Fsvg%3E"
            sx={{
              width: 60,
              mb: 1,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
          <Typography variant="h5" fontWeight={700} color="primary">
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
                variant="gradient"
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
