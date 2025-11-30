import React, { useState, useMemo } from 'react'; // Import useState, useMemo
import games from '../data';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown } from 'lucide-react'; // Import icon mới

export default function Home() {
  const dispatch = useDispatch();

  // --- 1. KHAI BÁO STATE QUẢN LÝ BỘ LỌC ---
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
  const [selectedGenre, setSelectedGenre] = useState('All'); // Thể loại đang chọn
  const [sortOption, setSortOption] = useState('default'); // Kiểu sắp xếp (giá thấp-cao, đánh giá...)

  // --- 2. TẠO DANH SÁCH THỂ LOẠI TỰ ĐỘNG (Để hiện trong menu Dropdown) ---
  // Lấy tất cả genre từ data -> xóa trùng lặp -> thêm lựa chọn "All"
  const allGenres = ['All', ...new Set(games.map(game => game.genre))];

  // --- 3. LOGIC LỌC VÀ SẮP XẾP (QUAN TRỌNG NHẤT) ---
  // Sử dụng useMemo để tối ưu hiệu năng (chỉ tính toán lại khi state thay đổi)
  const filteredGames = useMemo(() => {
    let result = [...games]; // Copy mảng gốc để không làm hỏng dữ liệu

    // Bước A: Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      result = result.filter(game => 
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Bước B: Lọc theo thể loại (Genre)
    if (selectedGenre !== 'All') {
      result = result.filter(game => game.genre === selectedGenre);
    }

    // Bước C: Sắp xếp (Sort)
    switch (sortOption) {
      case 'price-asc': // Giá thấp đến cao
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc': // Giá cao đến thấp
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'rating': // Đánh giá cao nhất
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [searchTerm, selectedGenre, sortOption]); // Chạy lại khi 3 biến này thay đổi

  
  // --- 4. GIAO DIỆN ---
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 border-l-4 border-yellow-500 pl-4 text-white">
        Kho Game Bản Quyền
      </h1>

      {/* --- THANH CÔNG CỤ TÌM KIẾM & LỌC --- */}
      <div className="bg-gray-800 p-4 rounded-lg mb-8 flex flex-col md:flex-row gap-4 items-center shadow-lg">
        
        {/* Ô tìm kiếm */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Tìm tên game (ví dụ: Elden Ring)..."
            className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-yellow-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Bộ lọc Thể loại */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="text-yellow-500" size={20} />
          <select 
            className="bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 focus:border-yellow-500 cursor-pointer w-full"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {allGenres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'All' ? 'Tất cả thể loại' : genre}
              </option>
            ))}
          </select>
        </div>

        {/* Bộ lọc Sắp xếp */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <ArrowUpDown className="text-yellow-500" size={20} />
          <select 
            className="bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 focus:border-yellow-500 cursor-pointer w-full"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="rating">Đánh giá cao nhất</option>
          </select>
        </div>
      </div>

      {/* --- DANH SÁCH GAME (Render biến filteredGames thay vì games) --- */}
      {filteredGames.length === 0 ? (
        <div className="text-center text-gray-400 mt-10 text-xl">
            Không tìm thấy game nào phù hợp! 😢
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
            <div key={game.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 transition duration-300 group flex flex-col h-full border border-gray-700 hover:border-yellow-500/50">
                
                <Link to={`/game/${game.id}`} className="relative overflow-hidden h-56 block cursor-pointer">
                    <img 
                    src={game.cover} 
                    alt={game.name} 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
                    />
                    <span className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded border border-gray-600 backdrop-blur-md">
                        {game.genre}
                    </span>
                    {/* Hiển thị điểm Rating nếu cao */}
                    {game.rating >= 90 && (
                        <span className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                            HOT 🔥
                        </span>
                    )}
                </Link>
                
                <div className="p-4 flex flex-col flex-1">
                <Link to={`/game/${game.id}`} className="hover:text-yellow-400 transition mb-1">
                    <h3 className="font-bold text-lg text-white line-clamp-1" title={game.name}>{game.name}</h3>
                </Link>
                
                <p className="text-xs text-gray-400 mb-4 line-clamp-1">{game.platforms}</p>

                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-700">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through decoration-red-500 decoration-2">
                            ${(parseFloat(game.price) * 1.2).toFixed(2)}
                        </span>
                        <p className="text-yellow-400 font-bold text-xl">
                            ${game.price}
                        </p>
                    </div>
                    <div className="flex gap-1 text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded items-center">
                        <span>⭐ {game.rating}</span>
                    </div>
                </div>
                
                <button 
                    onClick={() => {
                        dispatch(addToCart(game));
                        alert(`Đã thêm ${game.name} vào giỏ!`);
                    }}
                    className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-2 rounded transition shadow-lg"
                >
                    Thêm vào giỏ
                </button>
                </div>
            </div>
            ))}
        </div>
      )}
    </div>
  );
}