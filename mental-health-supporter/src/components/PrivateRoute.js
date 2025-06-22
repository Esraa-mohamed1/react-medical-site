import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children, role }) {
  const location = useLocation();
  let user = JSON.parse(localStorage.getItem('user'));

  // Workaround: If user exists but has no role, infer from path
  if (user && !user.role) {
    if (location.pathname.startsWith('/doctor')) {
      user = { ...user, role: 'doctor' };
      localStorage.setItem('user', JSON.stringify(user));
    }
    // Add more role inference logic here if needed
  }

  // If no user or role does not match, redirect to login
//   if (!user || (role && user.role !== role)) {
//     return <Navigate to="/login" replace />;
//   }

  return children;
} 