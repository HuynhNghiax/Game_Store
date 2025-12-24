import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="h-[60vh] w-full flex flex-col items-center justify-center text-center space-y-6">
      <CheckCircle size={100} className="text-green-500 animate-bounce" />
      <h1 className="text-4xl font-bold text-gray-800">Thanh toán thành công!</h1>
      <p className="text-gray-500 text-lg">Cảm ơn bạn đã mua hàng. Game đã được thêm vào thư viện.</p>
      <div className="flex gap-4">
        <Link to="/" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition">
           Về trang chủ
        </Link>
        <Link to="/history" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition">
           Xem lịch sử mua
        </Link>
      </div>
    </div>
  );
}