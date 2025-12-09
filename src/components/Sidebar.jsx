import React from 'react';
// QUAN TRỌNG: Phải import 'History' ở dòng dưới đây
import { Home, LayoutGrid, Heart, ShoppingBag, LogIn, LogOut, Gamepad2, History } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.auth); 
  
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { icon: Home, label: 'Trang chủ', path: '/' },
    { icon: LayoutGrid, label: 'Thể loại', path: '/categories' },
    { icon: Heart, label: 'Thư viện', path: '/library' },
    { icon: History, label: 'Lịch sử mua', path: '/history' }, // Dùng icon History ở đây
    { icon: ShoppingBag, label: 'Giỏ hàng', path: '/cart' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <aside className="flex flex-col h-full p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Gamepad2 size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900">
            GameStore
        </span>
      </div>

      {/* Menu Chính */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.path) 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer User */}
      <div className="pt-6 border-t border-gray-200 mt-auto">
         {user ? (
             <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium w-full"
             >
                <LogOut size={20} />
                <span>Đăng xuất</span>
             </button>
         ) : (
             <Link 
                to="/login" 
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium"
             >
                <LogIn size={20} />
                <span>Đăng nhập</span>
             </Link>
         )}
      </div>
    </aside>
  );
}