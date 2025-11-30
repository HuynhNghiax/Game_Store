import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import games from '../data'; // Import data game
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { ArrowLeft, ShoppingCart, Star, Calendar, Globe } from 'lucide-react';

export default function GameDetail() {
  // 1. Lấy ID từ đường dẫn URL (ví dụ: /game/0 -> id = "0")
  const { id } = useParams();
  const dispatch = useDispatch();

  // 2. Tìm game trong danh sách dựa vào ID
  // Lưu ý: id lấy từ URL là chuỗi, nên cần đổi sang số (parseInt) hoặc so sánh lỏng (==)
  const game = games.find((g) => g.id == id);

  // 3. Scroll lên đầu trang khi chuyển trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!game) {
    return <div className="text-center text-white mt-20">Không tìm thấy game!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-10">
      {/* Ảnh nền mờ phía sau (Background Blur effect) */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${game.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>

      <div className="container mx-auto p-4 relative z-10">
        {/* Nút quay lại */}
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition">
          <ArrowLeft size={20} className="mr-2" /> Quay lại cửa hàng
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột Trái: Ảnh bìa lớn */}
          <div className="md:col-span-1">
            <img 
              src={game.cover} 
              alt={game.name} 
              className="w-full rounded-lg shadow-2xl border border-gray-700"
            />
          </div>

          {/* Cột Phải: Thông tin chi tiết */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-white">{game.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                   <Calendar size={16} /> {game.release}
                </span>
                <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                   <Star size={16} className="text-yellow-500" /> {game.rating}/100
                </span>
                <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                   <Globe size={16} /> {game.developers}
                </span>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700">
                <p className="text-3xl font-bold text-yellow-400 mb-4">${game.price}</p>
                <button 
                  onClick={() => {
                    dispatch(addToCart(game));
                    alert(`Đã thêm ${game.name} vào giỏ!`);
                  }}
                  className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105"
                >
                  <ShoppingCart size={20} /> Mua Ngay
                </button>
            </div>

            <div>
              <h3 className="text-xl font-bold border-b border-gray-700 pb-2 mb-3">Cốt truyện</h3>
              <p className="text-gray-300 leading-relaxed text-justify">
                {game.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                <div>
                    <span className="font-bold text-white block">Thể loại:</span> {game.genre}
                </div>
                <div>
                    <span className="font-bold text-white block">Hệ máy:</span> {game.platforms}
                </div>
                <div>
                    <span className="font-bold text-white block">Nhà phát hành:</span> {game.publishers}
                </div>
            </div>
          </div>
        </div>

        {/* Phần Thư viện ảnh (Footage) */}
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-4">Hình ảnh trong game</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {game.footage && game.footage.map((imgUrl, index) => (
                    <div key={index} className="overflow-hidden rounded-lg group">
                        <img 
                            src={imgUrl} 
                            alt={`Gameplay ${index}`} 
                            className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}