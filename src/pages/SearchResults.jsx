import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import games from '../data';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || ''; // Lấy từ khóa từ URL
  const dispatch = useDispatch();

  // Lọc tất cả game trùng tên
  const results = useMemo(() => {
    if (!query) return [];
    return games.filter(game => 
        game.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">
        Kết quả tìm kiếm cho: <span className="text-yellow-500">"{query}"</span>
      </h1>
      
      {results.length === 0 ? (
        <div className="text-center text-gray-400 mt-20 text-xl">
          Không tìm thấy game nào! Thử từ khóa khác xem sao.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((game) => (
            <div key={game.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-yellow-500 transition group flex flex-col h-full">
                <Link to={`/game/${game.id}`} className="relative h-48 block overflow-hidden">
                    <img 
                        src={game.cover} 
                        alt={game.name} 
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
                    />
                </Link>
                <div className="p-4 flex flex-col flex-1">
                    <Link to={`/game/${game.id}`}>
                        <h3 className="font-bold text-white text-lg mb-2 hover:text-yellow-400 truncate">{game.name}</h3>
                    </Link>
                    <p className="text-yellow-400 font-bold text-xl mt-auto">${game.price}</p>
                    <button 
                        onClick={() => {
                            dispatch(addToCart(game));
                            alert(`Đã thêm ${game.name} vào giỏ!`);
                        }}
                        className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
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