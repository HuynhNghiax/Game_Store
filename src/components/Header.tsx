import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { Game } from '../types'; // Import type Game

export default function Header() {
  const quantity = useAppSelector(state => state.cart.totalQuantity);
  const { user } = useAppSelector(state => state.auth);
  const { items: games } = useAppSelector(state => state.products);
  
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Game[]>([]); // Định nghĩa mảng Game
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null); // Ref thẻ Div
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm.trim()) { setSuggestions([]); return; }
    const delayDebounceFn = setTimeout(() => {
      const filtered = games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, games]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
        setShowSuggestions(false);
        navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  return (
    <header className="flex items-center justify-between gap-6 mb-8 relative z-50">
      <div className="flex-1 max-w-lg relative" ref={searchRef}>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm game..." 
              className="w-full bg-white text-gray-800 pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition shadow-sm"
              value={searchTerm} 
              onChange={handleChange}
              onKeyDown={handleSearch}
              onFocus={() => { if(suggestions.length > 0) setShowSuggestions(true); }}
            />
            {searchTerm && (
                <button 
                    onClick={() => { setSearchTerm(''); setSuggestions([]); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                    <X size={16} />
                </button>
            )}
        </div>

        {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                <div className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50">
                    Gợi ý nhanh
                </div>
                {suggestions.map((game) => (
                    <Link 
                        key={game.id} 
                        to={`/game/${game.id}`}
                        onClick={() => setShowSuggestions(false)}
                        className="flex items-center gap-3 p-3 hover:bg-blue-50 transition border-b border-gray-100 last:border-0"
                    >
                        <img src={game.cover} alt="" className="w-10 h-10 object-cover rounded-md" />
                        <div>
                            <h4 className="font-bold text-gray-800 text-sm truncate">{game.name}</h4>
                            <span className="text-xs text-blue-600 font-bold">${game.price}</span>
                        </div>
                    </Link>
                ))}
            </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="p-2 text-gray-500 hover:bg-white hover:text-blue-600 rounded-full transition relative">
           <ShoppingBag size={20} />
           {quantity > 0 && (
             <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {quantity}
             </span>
           )}
        </Link>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              {user ? (
                <>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-800">{user.name}</p>
                    <button 
                      onClick={() => dispatch(logout())} 
                      className="text-xs text-red-500 hover:underline font-medium"
                    >
                      Đăng xuất
                    </button>
                  </div>

                  <div
                    onClick={() => navigate('/profile')}
                    className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold border border-blue-200 uppercase cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
                    title="Xem hồ sơ"
                  >
                    {user.name.charAt(0)}
                  </div>
                </>
              ) : (
                <Link to="/login" className="text-sm font-bold text-blue-600 hover:underline px-2">
                  Đăng nhập
                </Link>
              )}
        </div>
      </div>
    </header>
  );
}