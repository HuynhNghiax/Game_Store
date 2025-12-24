import React, { Suspense } from 'react';
import { Loader } from 'lucide-react';

// 1. Màn hình chờ
export const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen w-full bg-gray-50">
    <Loader className="animate-spin text-blue-600" size={40} />
  </div>
);

// 2. Hàm bọc Lazy Component
export const Loadable = (Component: React.ComponentType<any>) => (props: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);