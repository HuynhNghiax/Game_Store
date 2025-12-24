import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Loadable } from '../utils'; // Import từ file utils vừa tạo

const Login = lazy(() => import('../../pages/Login'));
const Register = lazy(() => import('../../pages/Register'));
const ForgotPassword = lazy(() => import('../../pages/ForgotPassword'));

export const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: Loadable(Login)({})
  },
  {
    path: '/register',
    element: Loadable(Register)({})
  },
  {
    path: '/forgot-password',
    element: Loadable(ForgotPassword)({})
  }
];