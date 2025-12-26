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
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
      <div className="w-64 shrink-0 bg-white border-r border-gray-200 z-20 hidden md:block">
          <Sidebar />
      </div>

      <main className="flex-1 flex flex-col h-full relative">
         <div 
            ref={scrollRef} 
            id="main-scroll-container" 
            className="flex-1 overflow-y-auto p-8 scroll-smooth"
         >
             <div className="max-w-7xl mx-auto p-8 w-full">
                 <Header />
                 <div className="mt-6 animate-fade-in pb-10">
                     <Outlet />
                 </div>
             </div>
                <Footer />

         </div>
      </main>
    </div>
  );
}