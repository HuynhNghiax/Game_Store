import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0f172a] text-white space-y-8 overflow-hidden relative">
      
      {/* Hiệu ứng nền mờ ảo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[100px] rounded-full"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="relative mb-4">
            <Ghost size={120} className="text-blue-400 animate-bounce" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/30 blur-xl rounded-full"></div>
        </div>
        
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
            404
        </h1>
        
        <h2 className="text-3xl font-bold text-gray-200 mb-4">
            Oops! Trang này không tồn tại.
        </h2>
        
        <p className="text-gray-400 max-w-md text-lg mb-8">
            Có vẻ như trang bạn đang tìm kiếm đã bị người ngoài hành tinh bắt cóc hoặc link bị hỏng.
        </p>

        <Link 
            to="/" 
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition shadow-lg shadow-blue-500/30 transform hover:-translate-y-1"
        >
            <Home size={20} /> Quay về Trang chủ
        </Link>
      </div>
    </div>
  );
}