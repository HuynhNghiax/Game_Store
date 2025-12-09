import React, { useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import GameCard from '../components/GameCard';
import { Search, Frown } from 'lucide-react';

export default function SearchResults() {
  const dispatch = useDispatch();
  const { items: games, status } = useSelector(state => state.products);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const results = useMemo(() => {
    if (!query) return [];
    return games.filter(game => game.name.toLowerCase().includes(query.toLowerCase().trim()));
  }, [query, games]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8">
         <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Search size={24} /></div>
         <div>
            <h1 className="text-2xl font-bold text-gray-800">Kết quả tìm kiếm</h1>
            <p className="text-gray-500 text-sm">Tìm thấy <span className="text-gray-900 font-bold">{results.length}</span> game cho từ khóa <span className="text-blue-600 font-bold">"{query}"</span></p>
         </div>
      </div>
      
      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4"><Frown size={40} className="text-gray-400" /></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy game nào!</h2>
          <p className="text-gray-500 mb-6">Thử tìm từ khóa khác xem sao...</p>
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition">Quay về trang chủ</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      )}
    </div>
  );
}