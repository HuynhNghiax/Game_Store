import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Gamepad2, Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import games from '../data'; // Import data để tìm kiếm

export default function Navbar() {
  const quantity = useSelector(state => state.cart.totalQuantity);
  const navigate = useNavigate();

  // State quản lý tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null); // Để xử lý click ra ngoài thì đóng gợi ý

  // --- LOGIC 1: Gợi ý sau 3 giây (Debounce) ---
  useEffect(() => {
    // Nếu ô tìm kiếm trống, xóa gợi ý
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    // Tạo bộ đếm thời gian 3 giây (3000ms)
    const delayDebounceFn = setTimeout(() => {
      console.log("Đang tìm kiếm gợi ý cho:", searchTerm);
      
      const filtered = games.filter(game => 
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Chỉ lấy tối đa 5 game để gợi ý
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    }, 3000); 

    // Cleanup: Nếu người dùng gõ tiếp trong lúc đang đếm, hủy bộ đếm cũ
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // --- LOGIC 2: Nhấn Enter để xem tất cả ---
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false); // Tắt gợi ý
      navigate(`/search?q=${searchTerm}`); // Chuyển sang trang kết quả
    }
  };

  // Ẩn gợi ý khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-yellow-500 font-bold text-2xl shrink-0">
          <Gamepad2 size={32} /> GameStore
        </Link>
        
        {/* --- THANH TÌM KIẾM Ở GIỮA --- */}
        <div className="relative w-full max-w-lg" ref={searchRef}>
          <div className="relative">
            <input 
              type="text"
              placeholder="Tìm kiếm game (Enter để xem tất cả)..."
              className="w-full bg-gray-900 text-white pl-10 pr-10 py-2 rounded-full border border-gray-600 focus:outline-none focus:border-yellow-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => { if(suggestions.length > 0) setShowSuggestions(true); }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            {searchTerm && (
              <X 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white" 
                size={16} 
                onClick={() => { setSearchTerm(''); setSuggestions([]); }}
              />
            )}
          </div>

          {/* --- MENU GỢI Ý (DROPDOWN) --- */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl overflow-hidden z-50">
               <div className="text-xs text-gray-400 p-2 bg-gray-900 border-b border-gray-700">
                  Gợi ý nhanh (Top 5):
               </div>
               {suggestions.map(game => (
                 <Link 
                    key={game.id} 
                    to={`/game/${game.id}`}
                    onClick={() => setShowSuggestions(false)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-700 transition border-b border-gray-700 last:border-0"
                 >
                    <img src={game.cover} alt="" className="w-10 h-10 object-cover rounded" />
                    <div>
                      <p className="font-bold text-sm text-white">{game.name}</p>
                      <p className="text-xs text-yellow-500">${game.price}</p>
                    </div>
                 </Link>
               ))}
            </div>
          )}
        </div>
        
        {/* Giỏ hàng */}
        <Link to="/cart" className="relative text-white hover:text-yellow-400 transition shrink-0">
          <ShoppingCart size={28} />
          {quantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {quantity}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}