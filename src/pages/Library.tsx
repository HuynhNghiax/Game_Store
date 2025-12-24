import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchWishlist } from '../redux/wishlistSlice';
import { fetchProducts } from '../redux/productSlice';
import GameCard from '../components/GameCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Library() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);
  const { items: allGames, status } = useAppSelector(state => state.products);

  useEffect(() => {
    if (user) dispatch(fetchWishlist(user.id));
    if (status === 'idle') dispatch(fetchProducts());
  }, [dispatch, user, status]);

  const likedGames = useMemo(() => {
    return allGames.filter(game => wishlistItems.some(item => item.gameId === game.id));
  }, [allGames, wishlistItems]);

  if (!user) return <div className="text-center mt-20">Vui lòng đăng nhập.</div>;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Heart className="text-red-500 fill-current" /> Game Yêu Thích
        </h1>
        <span className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm">
            {likedGames.length} Games
        </span>
      </div>

      {likedGames.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
            <p className="text-gray-500 text-lg mb-4">Chưa có game yêu thích nào 💔</p>
            <Link to="/" className="text-blue-600 font-bold hover:underline">Khám phá ngay</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedGames.map(game => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
      )}
    </div>
  );
}