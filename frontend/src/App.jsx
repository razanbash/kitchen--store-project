import { Routes, Route } from "react-router-dom";
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
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard" element={<ManagerDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="kitchens" element={<KitchensPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
