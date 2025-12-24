import React, { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { Loader } from 'lucide-react'; // Icon xoay xoay

// --- 1. LAZY IMPORT (Chỉ tải khi cần dùng) ---

// Auth
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
// const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));

// Public
const Home = lazy(() => import('../pages/Home'));
const GameDetail = lazy(() => import('../pages/GameDetail'));
const Categories = lazy(() => import('../pages/Categories'));
const SearchResults = lazy(() => import('../pages/SearchResults'));
// const NotFound = lazy(() => import('../pages/NotFound'));

// Private
const Cart = lazy(() => import('../pages/Cart'));
const Library = lazy(() => import('../pages/Library'));
const OrderHistory = lazy(() => import('../pages/OrderHistory'));
const Success = lazy(() => import('../pages/Success'));

// --- 2. COMPONENT LOADING (Hiệu ứng khi chờ tải trang) ---
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen w-full bg-gray-50">
    <Loader className="animate-spin text-blue-600" size={40} />
  </div>
);

// Hàm bọc Lazy Component vào Suspense
const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

export default function AppRouter() {
  const elements = useRoutes([
    // --- AUTH ROUTES ---
    { path: '/login', element: Loadable(Login)({}) },
    { path: '/register', element: Loadable(Register)({}) },
    // { path: '/forgot-password', element: Loadable(ForgotPassword)({}) },

    // --- MAIN LAYOUT ---
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: Loadable(Home)({}) },
        { path: 'game/:id', element: Loadable(GameDetail)({}) },
        { path: 'categories', element: Loadable(Categories)({}) },
        { path: 'search', element: Loadable(SearchResults)({}) },
        
        // --- PRIVATE ROUTES ---
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
      ]
    },

    // --- 404 ---
    // { path: '*', element: Loadable(NotFound)({}) }
  ]);

  return elements;
}