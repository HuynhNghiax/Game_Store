import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { createOrder } from '../redux/orderSlice';
import { Trash2, CreditCard } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast'; // Đã dùng toast thay alert

export default function Cart() {
  const { items, totalAmount } = useAppSelector(state => state.cart);
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
        toast.error("Vui lòng đăng nhập để thanh toán!");
        navigate('/login');
        return;
    }

    const newOrder = {
        userId: user.id,
        items: items,
        totalAmount: totalAmount,
        date: new Date().toISOString(),
        status: "Completed"
    };

    await dispatch(createOrder(newOrder));
    dispatch(clearCart());
    navigate('/success');
  };

  if (items.length === 0) return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <h2 className="text-3xl text-gray-800 font-bold mb-4">Giỏ hàng đang trống</h2>
        <p className="text-gray-500 mb-6">Bạn chưa chọn game nào cả.</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition">Quay lại mua sắm</Link>
    </div>
  );

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Giỏ hàng ({items.length})</h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-4">
            {items.map(item => (
            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm items-center">
                <img src={item.cover} alt={item.name} className="w-24 h-32 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-xl mb-1 truncate">{item.name}</h3>
                    <div className="flex items-center gap-3">
                        <span className="text-blue-600 font-bold text-lg">${item.price}</span>
                        <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-lg">Qty: {item.quantity}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={20} /></button>
                </div>
            </div>
            ))}
        </div>

        <div className="xl:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tổng kết</h3>
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-500"><span>Tạm tính</span><span>${totalAmount.toFixed(2)}</span></div>
                    <div className="h-px bg-gray-200 my-4"></div>
                    <div className="flex justify-between text-2xl font-bold text-gray-900"><span>Tổng cộng</span><span>${totalAmount.toFixed(2)}</span></div>
                </div>
                <button onClick={handleCheckout} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg transition active:scale-95 flex items-center justify-center gap-2">
                    <CreditCard size={20} /> Thanh toán ngay
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}