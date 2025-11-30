import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Cart() {
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch(clearCart());
    navigate('/success');
  };

  if (items.length === 0) return (
    <div className="text-center mt-20">
        <h2 className="text-2xl text-white font-bold">Giỏ hàng trống!</h2>
        <Link to="/" className="text-yellow-500 underline mt-4 block">Quay lại mua sắm</Link>
    </div>
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-white">Giỏ hàng của bạn</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột trái: List sản phẩm */}
        <div className="md:col-span-2 space-y-4">
            {items.map(item => (
            <div key={item.id} className="flex gap-4 bg-gray-800 p-4 rounded-lg items-center">
                <img src={item.cover} alt={item.name} className="w-20 h-28 object-cover rounded" />
                <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{item.name}</h3>
                    <p className="text-yellow-500 font-bold">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-gray-400 text-sm">Số lượng: {item.quantity}</span>
                    </div>
                </div>
                
                <button 
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-400 p-2 hover:bg-gray-700 rounded-full transition"
                >
                <Trash2 size={20} />
                </button>
            </div>
            ))}
        </div>

        {/* Cột phải: Tổng tiền */}
        <div className="md:col-span-1">
            <div className="bg-gray-800 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Tóm tắt đơn hàng</h3>
                <div className="flex justify-between text-lg mb-4 text-gray-300">
                    <span>Tạm tính:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-yellow-400 mb-6">
                    <span>Tổng cộng:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                </div>
                
                <button 
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded text-lg transition shadow-lg shadow-green-900/50"
                >
                Thanh toán ngay
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}