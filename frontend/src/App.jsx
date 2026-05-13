import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import LandingPage from "./components/landing/LandingPage.jsx";
import Navbar from "./components/shared/Navbar.jsx";
import Footer from "./components/shared/Footer.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import UserDashboard from "./components/Dashboard/UserDashboard.jsx";
import ManagerDashboard from "./components/Dashboard/ManagerDashboard.jsx";
import Profile from "./components/Dashboard/Profile.jsx";
import KitchensPage from "./components/Kitchens/KitchensPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import ProtectRoute from "./components/ProtectRoute.jsx";
import FeedbackPage from "./Pages/FeedbackPage.jsx";
import ModeratorDashboard from "./components/Dashboard/ModeratorDashboard.jsx";
import ReservationPage from "./Pages/ReservationsPage.jsx";
import UserReservations from "./Pages/User.reservation.jsx";
import SystemAnalytics from "./Pages/SystemAnalytice.jsx";
import ManageUsersPage from "./Pages/MangeUsersPage.jsx";

import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/contact" element={<ContactPage />} />

        <Route path="/feedback" element={<FeedbackPage />} />

        <Route path="/reservations" element={<ReservationPage />} />

        <Route path="/my-reservations" element={<UserReservations />} />

        <Route
          path="/dashboard"
          element={
            <ProtectRoute>
              <UserDashboard />
            </ProtectRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          }
        />

        <Route
          path="/kitchens"
          element={
            <ProtectRoute>
              <KitchensPage />
            </ProtectRoute>
          }
        />

        <Route
          path="/managerDashboard"
          element={
            <ProtectRoute>
              <ManagerDashboard />
            </ProtectRoute>
          }
        />

        <Route
          path="/moderator"
          element={
            <ProtectRoute>
              <ModeratorDashboard />
            </ProtectRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectRoute>
              <SystemAnalytics />
            </ProtectRoute>
          }
        />

        <Route
          path="/manage-users"
          element={
            <ProtectRoute>
              {user?.role === "manager" ? (
                <ManageUsersPage />
              ) : (
                <Navigate to="/" />
              )}
            </ProtectRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
