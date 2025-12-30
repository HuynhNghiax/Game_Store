import React from 'react';
import {Home, LayoutGrid, Heart, ShoppingBag, LogIn, LogOut, Gamepad2, History} from 'lucide-react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../redux/hooks'; // Hook TS
import {logout} from '../redux/authSlice';


export default function Sidebar() {

    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {user} = useAppSelector(state => state.auth);

    const isActive = (path: string) =>
        location.pathname === path || location.pathname.startsWith(path + '/');

    const menuItems = [
        {icon: Home, label: 'Trang chủ', path: '/'},
        {icon: LayoutGrid, label: 'Thể loại', path: '/categories'},
        {icon: Heart, label: 'Thư viện', path: '/library'},
        {icon: History, label: 'Lịch sử mua', path: '/history'},
        {icon: ShoppingBag, label: 'Giỏ hàng', path: '/cart'},
    ];

    return (
        <nav className="w-full bg-white">

            <div className="flex items-center -ml-6">
                {menuItems.map((item) => {
                    const active = isActive(item.path);

                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`relative flex items-center gap-2.5 px-6 py-3
                            text-sm font-medium transition-colors
                            ${active
                                ? 'text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'}
                        `}
                        >
                            <item.icon size={20}/>
                            <span>{item.label}</span>

                            {active && (
                                <span
                                    className="absolute bottom-0 left-6 right-6 h-0.5 bg-blue-600 rounded-t-full"/>
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
