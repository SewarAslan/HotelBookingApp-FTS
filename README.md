# 🏨 Hotel Booking App – Full Frontend System

A modern and responsive hotel booking platform built with **React + TypeScript**, powerful theming using **Material UI**, UI documentation using **Storybook**, and component testing with **Vitest**.

This project includes user authentication, admin management, CRUD dialogs, form validation, and a fully customized design system.

---

## 🌐 Live Demo

> **Test Credentials (for the reviewer / mentor)**

### 👤 User Login

```
username: user
password: user
```

### 🛠 Admin Login

```
username: admin
password: admin
```

---

## 📁 GitHub Repository

🔗 **Frontend Repository:**
[https://github.com/SewarAslan/HotelBookingApp-FTS](https://github.com/SewarAslan/HotelBookingApp-FTS)

🔗 **Backend Repository:**
[https://github.com/SewarAslan/HotelBookingAppBE-FTS](https://github.com/SewarAslan/HotelBookingAppBE-FTS)

---

Here’s a clean, ready-to-paste version:

---

## 🔗 Backend Integration Overview

- Added and integrated the following API endpoints:

  - **POST `/api/bookings`** – creates a new booking, validates input, attaches room pricing, generates a unique `bookingId`, and persists data in `bookings.json`.
  - **GET `/api/bookings/:id`** – returns full booking details including linked hotel and room information.
  - **GET `/api/hotels/featured`** — Returns hotels tagged as `featured`.
  - **GET `/api/hotels/trending`** — Returns hotels tagged as `trending`.

- Unified and aligned all data structures across the app:

  - Mapped **CartItem → BookingRequest → BookingResponse → ConfirmationSummary** to ensure consistent data flow.
  - Linked hotel and room models (`hotelId`, `roomId`, pricing, names) so booking results reflect accurate relational data.
  - Normalized booking fields (check-in, check-out, status, bookingDate, totalCost) for consistent frontend usage.

- Implemented a stable end-to-end booking flow:

  - Checkout creates one or multiple bookings.
  - Backend returns real `bookingId` values.

---

# 🚀 Features

## 👤 User Features

- Browse available hotels
- View room details
- Filter & search
- Book rooms with real-time validation
- Display booking summary
- Responsive layout
- Fully themed UI + gradients + animations

## 🛠 Admin Features

- CRUD operations for:
  ✔ Cities
  ✔ Hotels
  ✔ Rooms
- Reusable Admin Dialogs
- Secure login
- Admin-only routes

---

# 🎨 Design System & Theming

A custom Material UI theme with:

- Light / Dark mode supported
- Custom primary / secondary colors
- Gradient backgrounds
- Glass effects
- Shadow system
- Font family: Inter + Tajawal
- Customized typography scale
- Unified rounded shapes system

---

# 🧪 Testing (Vitest + RTL)

Testing is focused mainly on **form components** and validation logic:

### ✔ Tested Components:

- `AuthForm`
- `AdminFormDialog`
- `ConfirmDialog`

### ✔ Covered Behaviors:

- Required field validation
- Minimum length validation
- Supporting Yup schema
- Submit handlers
- OnClose / OnConfirm logic
- Rendering states (loading, errors)

### ▶️ Run Tests

```
npm run test
```

Watch mode:

```
npx vitest
```

---

# 📚 Storybook

Storybook is used to document and visually test UI components.

### ✔ Stories Included:

- **ConfirmDialog** (with multiple variations)
- **ThemeToggleButton**

### ▶️ Run Storybook

```
npm run storybook
```

📌 Includes interactive controls + themed decorators.

---

# 🏗 Project Structure

```
src/
 ├── api/
 ├── components/
 ├── features/
 │    └── admin/
 ├── constants/
 ├── pages/
 ├── styles/
 ├── tests/
 └── App.tsx
```

---

# ▶️ How to Run the Project Locally

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Start the development server

```
npm run dev
```

### 3️⃣ Run tests

```
npm run test
```

### 4️⃣ Run Storybook

```
npm run storybook
```

---

# 👩🏻‍💻 Author

**Sewar Aslan – Frontend Developer**
