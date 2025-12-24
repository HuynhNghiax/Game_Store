import { useRoutes, RouteObject } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

// Import các modules con
import { authRoutes } from './modules/authRoutes';
import { publicRoutes } from './modules/publicRoutes';
import { privateRoutes } from './modules/privateRoutes';

export default function AppRouter() {
  const routes: RouteObject[] = [
    // 1. Auth Routes (Nằm ngoài Layout)
    ...authRoutes,

    // 2. Main Routes (Nằm trong Layout)
    {
      path: '/',
      element: <MainLayout />,
      children: [
        ...publicRoutes,
        ...privateRoutes
      ]
    }
  ];

  return useRoutes(routes);
}