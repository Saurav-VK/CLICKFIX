import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import Dashboard from '../pages/DashBoard/DashBoard';
import Layout from '../Layout';
import VehiclePage from '../pages/VehiclePage/VehiclePage';
import ServiceCenterPage from '../pages/ServiceCenterPage/ServiceCenterPage';
import ProfileUpdates from '../pages/ProfileUpdates/ProfileUpdates';
import BookingHistory from '../pages/BookingHistory/BookingHistory';
import InvoiceHistory from '../pages/InvoiceHistory/InvoiceHistory';
import BookingForm from '../pages/BookingForm/BookingForm';
import PaymentPage from '../pages/PaymentPage/PaymentPage';
import AdminDashboard from '../pages/AdminDashboard/AdminDashBoard';
import { VehicleProvider } from '../context_providers/VehicleProvider';
import InvoicePage from '../pages/InvoicePage/InvoicePage';
import BookingsAdminPage from '../pages/AdminPages/BookingsAdminPage/BookingsAdminPage';
import AdminUserPage from '../pages/AdminPages/AdminUserPage/AdminUserPage';
import InvoiceAdminPage from '../pages/AdminPages/InvoiceAdminPage/InvoiceAdminPage';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import MechanicsAdminPage from '../pages/AdminPages/MechanicsAdminPage/MechanicsAdminPage';
import ServiceCenterAdminPage from '../pages/AdminPages/ServiceCentersAdminPage/ServiceCentersAdminPage';
import ServiceTypeAdminPage from '../pages/AdminPages/ServiceTypesAdminPage/ServiceTypesAdminPage';
import VehicleAdminPage from '../pages/AdminPages/VehicleAdminPage/VehicleAdminPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<WelcomePage />} />

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<BookingsAdminPage />} />
          <Route path="users" element={<AdminUserPage />} />
          <Route path="mechanics" element={<MechanicsAdminPage/>}/>
          <Route path="service-centers" element={<ServiceCenterAdminPage/>}/>
          <Route path="servicetypes" element={<ServiceTypeAdminPage/>}/>
          <Route path="invoice" element = {<InvoiceAdminPage/>}/>
          <Route path="view-invoice" element={<InvoicePage />} />
          <Route path = "vehicles" element = {<VehicleAdminPage />} />
        </Route>
      </Route>

      {/* User Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/home" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="vehicle" element={<VehicleProvider><VehiclePage /></VehicleProvider>} />
          <Route path="service-center" element={<ServiceCenterPage />} />
          <Route path="profile" element={<ProfileUpdates />} />
          <Route path="booking-history" element={<BookingHistory />} />
          <Route path="invoice-history" element={<InvoiceHistory />} />
          <Route path="book-service" element={<BookingForm />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="invoice" element={<InvoicePage />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;