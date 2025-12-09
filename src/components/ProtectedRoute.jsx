import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const { user } = useSelector(state => state.auth);

  if (!user) {
    // Nếu chưa đăng nhập, chuyển hướng về Login
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, cho phép truy cập
  return children;
}