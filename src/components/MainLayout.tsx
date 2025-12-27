import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchWishlist } from '../redux/wishlistSlice';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
export default function MainLayout() {
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null); // Ref Element

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (user) {
        dispatch(fetchWishlist(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

    return (
        <div className="h-screen bg-gray-50 text-gray-800 flex flex-col">
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto scroll-smooth"
            >
                <div className="bg-white border-b border-gray-200 w-full">

                    <div className="max-w-7xl mx-auto px-8">
                        <Header />
                        <Sidebar />
                    </div>
                </div>

                <main className="max-w-7xl mx-auto p-8 w-full min-h-[calc(100vh-200px)]">
                    <div className="animate-fade-in pb-10">
                        <Outlet />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}