import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ user, loading, children }) {
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  // If user is not logged in and trying to access a protected route
  if (!user && !(location.pathname.includes('login') || location.pathname.includes('register'))) {
    return <Navigate to='/auth/login' />;
  }

  // If user is logged in and trying to access login/register
  if (user && (location.pathname.includes('login') || location.pathname.includes('register'))) {
    return <Navigate to='/dashboard' />;
  }

  // Render the nested content
  return <>{children}</>;
}

export default CheckAuth;
