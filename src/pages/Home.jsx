import React, { useState, useEffect, useMemo } from 'react';
import GameCard from '../components/GameCard';
import { Play, Info, ChevronRight, Star, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { fetchProducts } from '../redux/productSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { items: games, status } = useSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const featuredGames = games.slice(0, 5); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    if (featuredGames.length > 0) {
        const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
        }, 5000); 
        return () => clearInterval(timer);
    }
  }, [featuredGames.length]);

  const currentGame = featuredGames[currentIndex];

  const genres = useMemo(() => {
    if (!games.length) return [];
    const allGenres = ['All', ...new Set(games.map(game => game.genre))];
    return allGenres.sort();
  }, [games]);

  const filteredGames = useMemo(() => {
    if (selectedGenre === 'All') return games;
    return games.filter(game => game.genre === selectedGenre);
  }, [selectedGenre, games]);

  if (status === 'loading' || !currentGame) {
    return <div className="flex h-[60vh] items-center justify-center"><Loader className="animate-spin text-blue-600" size={48} /></div>;
  }

  if (status === 'failed') {
      return <div className="text-center text-red-500 mt-20">Lỗi tải dữ liệu. Vui lòng kiểm tra Server!</div>;
  }

  return (
    <div className="w-full space-y-10">
      <div className="relative w-full h-[400px] lg:h-[500px] rounded-[32px] overflow-hidden shadow-2xl group">
        <div key={currentGame.id} className="absolute inset-0 animate-fade-in">
           <img src={currentGame.cover} alt={currentGame.name} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0f1221] via-[#0f1221]/60 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#0f1221] via-transparent to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 z-10">
           <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">Featured</span>
              <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold"><Star size={16} fill="currentColor" /> {currentGame.rating}</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg">{currentGame.name}</h1>
           <p className="text-gray-300 line-clamp-2 mb-8 text-lg max-w-xl">{currentGame.desc}</p>
           <div className="flex flex-wrap gap-4">
              <button onClick={() => dispatch(addToCart(currentGame))} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition transform active:scale-95 shadow-lg"><Play size={20} fill="currentColor" /> Mua Ngay ${currentGame.price}</button>
              <Link to={`/game/${currentGame.id}`} className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition"><Info size={20} /> Chi tiết</Link>
           </div>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {featuredGames.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-blue-600 h-8' : 'bg-gray-600 hover:bg-gray-400'}`} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">🔥 Khám phá Kho Game</h2>
           <Link to="/categories" className="text-gray-500 hover:text-blue-600 text-sm font-bold flex items-center gap-1 transition">Xem tất cả <ChevronRight size={16} /></Link>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {genres.map((genre) => (
            <button key={genre} onClick={() => setSelectedGenre(genre)} className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${selectedGenre === genre ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-400 hover:text-blue-600'}`}>{genre}</button>
            ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {filteredGames.slice(0, 8).map(game => <GameCard key={game.id} game={game} />)}
        </div>
      </div>
    </div>
  );
}