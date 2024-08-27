import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import HomePage from "./pages/Home/HomePage";
import DoctorList from "./pages/DoctorList/DoctorList";
import AppointmentBookingForm from "./pages/Appointment/AppointmentBookingForm";
import AppointmentDashboard from "./pages/PatientDashboard/AppointmentDashboard";
import AppointmentManagement from "./pages/AppointmentManagement/AppointmentManagement";
import ChatPage from "./components/ChatPage";

const App = () => {
  const authUser = useStoreState((state) => state.user.user);
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [setUser]);

  const handleRoleRedirect = (allowedRoles, Component) => {
    if (!authUser) {
      return <Navigate to="/login" />;
    } else if (allowedRoles.includes(authUser.role)) {
      return Component;
    } else {
      return <Navigate to="/" />;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container">
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to={"/"} /> : <Register />}
        />

        {/* Protected Routes for All Authenticated Users */}
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />

        {/* Patient-Specific Routes */}
        <Route
          path="/doctors"
          element={handleRoleRedirect(["patient"], <DoctorList />)}
        />
        <Route
          path="/appointments/book"
          element={handleRoleRedirect(["patient"], <AppointmentBookingForm />)}
        />
        <Route
          path="/appointments"
          element={handleRoleRedirect(["patient"], <AppointmentDashboard />)}
        />

        {/* Doctor-Specific Routes */}
        <Route
          path="/doctor/appointments"
          element={handleRoleRedirect(["doctor"], <AppointmentManagement />)}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
