import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentStudent, isAdmin } = useApp();

  if (!currentStudent) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;

