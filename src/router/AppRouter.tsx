import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../features/home/pages/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";

import { ROUTES } from "../constants/routes";
import MainLayout from "../layouts/MainLayout";
import SearchResultsPage from "../pages/SearchResultsPage";
import HotelDetailsPage from "../pages/HotelDetailsPage";
import AppSnackbar from "../components/AppSnackbar";
import CheckoutPage from "../features/checkout/pages/CheckoutPage";
import ConfirmationPage from "../features/checkout/pages/ConfirmationPage";
import AdminLayout from "../features/admin/layout/AdminLayout";
import AdminCitiesPage from "../features/admin/pages/AdminCitiesPage";
import AdminRoomsPage from "../features/admin/pages/AdminRoomsPage";
import AdminHotelsPage from "../features/admin/pages/AdminHotelsPage";
import AdminHomePage from "../features/admin/pages/AdminHomePage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route
          element={
            <>
              <AppSnackbar />
              <MainLayout />
            </>
          }
        >
          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute allowedRoles={["User", "Admin"]}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.RESULTS}
            element={
              <ProtectedRoute allowedRoles={["User", "Admin"]}>
                <SearchResultsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CHECKOUT}
            element={
              <ProtectedRoute allowedRoles={["User"]}>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CONFIRMATION}
            element={
              <ProtectedRoute allowedRoles={["User"]}>
                <ConfirmationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN}
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />

            <Route path="cities" element={<AdminCitiesPage />} />
            <Route path="hotels" element={<AdminHotelsPage />} />
            <Route path="rooms" element={<AdminRoomsPage />} />
          </Route>

          <Route
            path="/hotel/:id"
            element={
              <ProtectedRoute allowedRoles={["User", "Admin"]}>
                <HotelDetailsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
