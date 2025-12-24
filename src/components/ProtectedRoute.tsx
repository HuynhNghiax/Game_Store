import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface Props {
  children: React.ReactNode; // Định nghĩa kiểu cho children
}

export default function ProtectedRoute({ children }: Props) {
  const { user } = useAppSelector(state => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}