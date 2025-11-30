import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Success() {
  // Giả lập Key ngẫu nhiên
  const fakeKey = `STEAM-${Math.random().toString(36).substr(2, 5).toUpperCase()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

  return (
    <div className="flex flex-col items-center justify-center mt-20 p-4">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-white mb-2">Thanh toán thành công!</h1>
      <p className="text-gray-400 mb-8">Cảm ơn bạn đã mua hàng. Đây là mã kích hoạt của bạn:</p>
      
      <div className="bg-gray-800 border-2 border-dashed border-yellow-500 p-6 rounded-lg mb-8">
        <code className="text-2xl font-mono text-yellow-400 tracking-widest select-all">
          {fakeKey}
        </code>
      </div>
      
      <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
}