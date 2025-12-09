import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchWishlist } from '../redux/wishlistSlice'; 
import Sidebar from './Sidebar';
import Header from './Header'; 

export default function MainLayout() {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);
  
  // Kết nối Redux để lấy user và gọi action
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  // 1. Tự động tải danh sách yêu thích (Wishlist) nếu User đã đăng nhập
  // Giúp icon trái tim hiển thị đúng trạng thái (đỏ/trắng) ngay khi vào app
  useEffect(() => {
    if (user) {
        dispatch(fetchWishlist(user.id));
    }
  }, [user, dispatch]);

  // 2. Xử lý cuộn trang: Tự động cuộn lên đầu khung nội dung khi chuyển trang
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
      
      {/* Sidebar: Cố định bên trái, nền trắng, viền mỏng */}
      <div className="w-64 shrink-0 bg-white border-r border-gray-200 z-20">
          <Sidebar />
      </div>

      {/* Main Content: Khu vực nội dung bên phải */}
      <main className="flex-1 flex flex-col h-full relative">
         
         {/* Khung cuộn chính (Scroll Container) */}
         <div 
            ref={scrollRef} 
            id="main-scroll-container" // ID này dùng để các trang con gọi tới nếu cần
            className="flex-1 overflow-y-auto p-8 scroll-smooth"
         >
            {/* Giới hạn chiều rộng nội dung để dễ nhìn trên màn hình lớn */}
            <div className="max-w-7xl mx-auto">
                <Header /> 
                
                {/* Nơi hiển thị các trang con (Home, Cart, Library...) */}
                <div className="mt-6 animate-fade-in pb-10">
                    <Outlet />
                </div>
            </div>
         </div>
      </main>
    </div>
  );
}