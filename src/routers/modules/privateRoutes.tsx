import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Loadable } from '../utils';
import ProtectedRoute from '../../components/ProtectedRoute'; // Import Component bảo vệ

const Cart = lazy(() => import('../../pages/Cart'));
const Library = lazy(() => import('../../pages/Library'));
const OrderHistory = lazy(() => import('../../pages/OrderHistory'));
const Success = lazy(() => import('../../pages/Success'));
const Profile = lazy(() => import('../../pages/Profile'));
const ChangePassword = lazy(() => import("../../pages/ChangePassword"));

export const privateRoutes: RouteObject[] = [
  {
    path: 'cart',
    element: <ProtectedRoute>{Loadable(Cart)({})}</ProtectedRoute>
  },
  {
    path: 'library',
    element: <ProtectedRoute>{Loadable(Library)({})}</ProtectedRoute>
  },
  {
    path: 'history',
    element: <ProtectedRoute>{Loadable(OrderHistory)({})}</ProtectedRoute>
  },
  {
    path: 'success',
    element: <ProtectedRoute>{Loadable(Success)({})}</ProtectedRoute>
  },
  {
    path: 'profile',
    element: <ProtectedRoute>{Loadable(Profile)({})}</ProtectedRoute>
  },
  {
    path: "change-password",
    element: <ProtectedRoute>{Loadable(ChangePassword)({})}</ProtectedRoute>
  }
];