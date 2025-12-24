import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react'; 
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Game } from '../types'; // Import Interface

interface Props {
  game: Game; // Định nghĩa props game
}

export default function GameCard({ game }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);

  const isLiked = wishlistItems.some(item => item.gameId === game.id);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
        alert("Vui lòng đăng nhập để thêm yêu thích!");
        navigate('/login');
        return;
    }
    dispatch(toggleWishlist({ userId: user.id, gameId: game.id }));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(game));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img src={game.cover} alt={game.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        
        <button 
            onClick={handleLike}
            className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition ${
                isLiked ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-400 hover:text-red-500'
            }`}
        >
           <Heart size={18} className={isLiked ? "fill-current" : ""} />
        </button>

        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
            {game.genre}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-1 text-yellow-500 mb-1">
             <Star size={12} fill="currentColor" />
             <span className="text-xs font-bold text-gray-600">{game.rating || 4.5}</span>
          </div>

          <Link to={`/game/${game.id}`} className="block">
            <h3 className="text-gray-900 font-bold text-base mb-1 line-clamp-1 hover:text-blue-600 transition-colors">{game.name}</h3>
          </Link>
          
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
             <span className="text-lg font-bold text-gray-900">${game.price}</span>
             <button onClick={handleAddToCart} className="flex items-center gap-2 bg-gray-900 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                <ShoppingBag size={16} /> <span>Thêm</span>
             </button>
          </div>
      </div>
    </div>
  );
}