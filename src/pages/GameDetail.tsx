import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToCart } from '../redux/cartSlice';
import { fetchProducts } from '../redux/productSlice';
import { ArrowLeft, ShoppingBag, Star, Heart, Loader } from 'lucide-react';
import { toggleWishlist } from '../redux/wishlistSlice';
import toast from 'react-hot-toast';

export default function GameDetail() {
  const { id } = useParams<{ id: string }>(); // TypeScript: id là string
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items: games, status } = useAppSelector(state => state.products);
  const { user } = useAppSelector(state => state.auth);
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  // So sánh string với string hoặc number với string
  const game = games.find((g) => g.id.toString() === id);

  const isLiked = game ? wishlistItems.some(item => item.gameId === game.id) : false;

  const handleLike = () => {
    if (!user) {
        toast.error("Vui lòng đăng nhập!");
        navigate('/login');
        return;
    }
    if (game) {
        dispatch(toggleWishlist({ userId: user.id, gameId: game.id }));
    }
  };

  if (status === 'loading') return <div className="flex h-[50vh] items-center justify-center"><Loader className="animate-spin text-blue-600" size={40} /></div>;
  if (!game) return <div className="text-center text-gray-500 mt-20">Không tìm thấy game!</div>;

  return (
    <div className="w-full relative">
      <div className="w-full h-[300px] rounded-[32px] overflow-hidden relative mb-8 shadow-md">
          <img src={game.cover} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
          <Link to="/" className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-800 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white transition font-bold shadow-sm"><ArrowLeft size={18} /> Back</Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
              <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2">{game.name}</h1>
                    <div className="flex gap-3 text-gray-500 text-sm font-medium">
                        <span className="bg-white border border-gray-200 px-3 py-1 rounded-lg flex items-center gap-2 shadow-sm"><Star size={14} className="text-yellow-500 fill-yellow-500" /> {game.rating}</span>
                        <span className="bg-white border border-gray-200 px-3 py-1 rounded-lg shadow-sm">{game.genre}</span>
                        <span className="bg-white border border-gray-200 px-3 py-1 rounded-lg shadow-sm">{game.release}</span>
                    </div>
                  </div>
                  <button onClick={handleLike} className={`xl:hidden p-3 rounded-2xl border transition flex items-center justify-center ${isLiked ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-gray-400 border-gray-200'}`}><Heart size={24} className={isLiked ? "fill-red-500" : ""} /></button>
              </div>
              <div className="prose max-w-none text-gray-600 leading-relaxed"><h3 className="text-xl font-bold text-gray-900 mb-2">About</h3><p>{game.desc}</p></div>
              <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Gallery</h3>
                  <div className="grid grid-cols-2 gap-4">
                      {game.footage && game.footage.map((img, idx) => (
                          <img key={idx} src={img} className="rounded-2xl hover:opacity-90 transition cursor-pointer h-40 object-cover w-full shadow-sm" alt="" />
                      ))}
                  </div>
              </div>
          </div>
          <div>
              <div className="bg-white p-6 rounded-[32px] border border-gray-200 shadow-lg sticky top-4">
                  <img src={game.cover} alt="" className="w-full h-48 object-cover rounded-2xl mb-6 shadow-md" />
                  <div className="flex justify-between items-end mb-6">
                      <div><p className="text-gray-400 line-through text-sm">$99.99</p><p className="text-3xl font-bold text-gray-900">${game.price}</p></div>
                      <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded border border-red-100">-50%</span>
                  </div>
                  <div className="flex gap-3">
                      <button onClick={() => { dispatch(addToCart(game)); toast.success("Đã thêm vào giỏ!"); }} className="flex-1 bg-gray-900 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition active:scale-95"><ShoppingBag size={20} /> Add to Cart</button>
                      <button onClick={handleLike} className={`w-16 rounded-2xl flex items-center justify-center border transition active:scale-95 ${isLiked ? 'bg-red-50 text-red-500 border-red-200 shadow-md' : 'bg-white border-gray-200 text-gray-400 hover:border-gray-400'}`}><Heart size={24} className={isLiked ? "fill-red-500" : ""} /></button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}