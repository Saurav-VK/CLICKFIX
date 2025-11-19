import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  // Admin access: no token required, but role must be 'admin'
  if (allowedRoles.includes('admin')) {
    if (userRole !== 'admin') {
      return <Navigate to="/" replace />;
    }
  }

  // User access: token required and role must be 'user'
  if (allowedRoles.includes('user')) {
    if (!token || userRole !== 'user') {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
