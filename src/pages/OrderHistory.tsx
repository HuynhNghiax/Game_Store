import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchUserOrders } from '../redux/orderSlice';
import { Package, Download, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrderHistory() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { orders } = useAppSelector(state => state.orders);

  useEffect(() => {
    if (user) dispatch(fetchUserOrders(user.id));
  }, [dispatch, user]);

  if (!user) return <div className="text-center mt-20">Vui lòng đăng nhập.</div>;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
        <Package className="text-blue-600" /> Kho Game Đã Mua
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-20 bg-white rounded-2xl border border-gray-200">
            Bạn chưa mua game nào cả.
        </div>
      ) : (
        <div className="space-y-6">
            {orders.map((order) => (
                <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                        <div className="text-sm text-gray-500">
                            Ngày mua: <span className="font-bold text-gray-700">{new Date(order.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle size={12} /> Đã thanh toán
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <img src={item.cover} alt="" className="w-16 h-20 object-cover rounded-lg shadow-sm" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-800 text-sm truncate">{item.name}</h4>
                                    <Link to={`/game/${item.id}`} className="text-xs text-blue-500 hover:underline">Xem chi tiết</Link>
                                </div>
                                <button 
                                    onClick={() => alert(`Đang tải xuống ${item.name}... 0%`)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition shadow-md active:scale-95 shrink-0"
                                >
                                    <Download size={16} /> Cài đặt
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}