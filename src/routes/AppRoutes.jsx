import { Routes, Route } from "react-router-dom";
import Home from "../pages/user/Home";
import EventsList from "../pages/user/EventsList";
import EventDetails from "../pages/user/EventDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MyBookings from "../pages/user/MyBookings";
import MyPayments from "../pages/user/MyPayments";
import Dashboard from "../pages/admin/Dashboard";
import ManageEvents from "../pages/admin/ManageEvents";
import ViewBookings from "../pages/admin/ViewBookings";
import ViewPayments from "../pages/admin/ViewPayments";
import ViewUsers from "../pages/admin/ViewUsers";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import MainLayout from "../components/layout/MainLayout";
import UserDashboard from "../pages/user/UserDashboard";
import BookingPage from "../components/booking/BookingPage";
import PaymentPage from "../components/payment/PaymentPage";
import PaymentSuccess from "../components/payment/PaymentSuccess";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected user routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/booking/:eventId" element={<BookingPage />} />
          <Route path="/payment/:bookingId" element={<PaymentPage />} />
          <Route path="/payment-success/:bookingId" element={<PaymentSuccess />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/my-payments" element={<MyPayments />} />
          <Route path="/me" element={<UserDashboard />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/admin/bookings" element={<ViewBookings />} />
          <Route path="/admin/payments" element={<ViewPayments />} />
          <Route path="/admin/users" element={<ViewUsers />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}