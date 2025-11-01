import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../../constants/authSchemas";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-100 via-violet-200 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-purple-100 to-violet-200 opacity-30 blur-2xl pointer-events-none" />

      <div
        className={`relative z-10 w-full max-w-md space-y-8 bg-white/30 backdrop-blur-xl p-8 rounded-2xl shadow-xl ring-1 ring-white/30 transition-all duration-700 ease-out ${
          animateIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="text-center">
          <img
            alt="Hotel Booking Logo"
            src="data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%2235%2035%20189%20122%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20aria-label%3D%22Hotel%20booking%20S-key%20logo%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22lavenderGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23C4B5FD%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23A78BFA%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Ccircle%20cx%3D%2296%22%20cy%3D%2296%22%20r%3D%2256%22%20stroke%3D%22url(%23lavenderGrad)%22%20stroke-width%3D%2210%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M120%2078c0-12-10-22-28-22-18%200-28%208-28%2018%200%2010%208%2014%2024%2018l6%201c18%204%2026%209%2026%2020%200%2012-12%2020-30%2020s-30-8-30-22%22%20stroke%3D%22url(%23lavenderGrad)%22%20stroke-width%3D%2210%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%2F%3E%3Crect%20x%3D%22136%22%20y%3D%2291%22%20width%3D%2288%22%20height%3D%2210%22%20rx%3D%225%22%20fill%3D%22url(%23lavenderGrad)%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%2291%22%20width%3D%228%22%20height%3D%2218%22%20rx%3D%223%22%20fill%3D%22url(%23lavenderGrad)%22%2F%3E%3Crect%20x%3D%22196%22%20y%3D%2291%22%20width%3D%228%22%20height%3D%2212%22%20rx%3D%223%22%20fill%3D%22url(%23lavenderGrad)%22%2F%3E%3C%2Fsvg%3E"
            className="mx-auto h-16 w-auto mb-2 sm:h-18 md:h-20 lg:h-24 transition-transform duration-500 ease-in-out hover:scale-105"
          />

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-violet-800">
            {title}
          </h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1 text-violet-800"
              >
                Username
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className="block w-full rounded-lg border border-violet-200 bg-white/70 px-3 py-2 text-violet-900 placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
                placeholder="Enter your username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-rose-500 text-sm mt-1"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-violet-800"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm font-semibold text-purple-400 hover:text-purple-600 transition"
                >
                  Forgot password?
                </a>
              </div>
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="mt-2 block w-full rounded-lg border border-violet-200 bg-white/70 px-3 py-2 text-violet-900 placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
                placeholder="••••••"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-rose-500 text-sm mt-1"
              />
            </div>

            {error && (
              <div className="text-rose-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-400 transition focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </Form>
        </Formik>

        <p className="mt-6 text-center text-sm text-violet-700">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold text-purple-400 hover:text-purple-600 transition"
          >
            Join us now!
          </a>
        </p>
      </div>
    </div>
  );
}
