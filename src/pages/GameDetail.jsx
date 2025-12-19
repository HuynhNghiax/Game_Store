import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { fetchProducts } from '../redux/productSlice';
// --- THAY ĐỔI 1: Import thêm action và form ---
import { fetchReviews } from '../redux/reviewSlice';
import ReviewForm from "../components/ReviewForm";
import { ArrowLeft, ShoppingBag, Star, Heart, Loader } from 'lucide-react';

export default function GameDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Lấy dữ liệu sản phẩm
    const { items: games, status } = useSelector(state => state.products);
    // --- THAY ĐỔI 2: Lấy danh sách reviews từ store ---
    const { list: reviews } = useSelector(state => state.reviews);

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchProducts());
        // --- THAY ĐỔI 3: Gọi fetch reviews mỗi khi id thay đổi ---
        dispatch(fetchReviews(id));
    }, [id, status, dispatch]);

    const game = games.find((g) => g.id == id);

    if (status === 'loading') return <div className="flex h-[50vh] items-center justify-center"><Loader className="animate-spin text-blue-600" size={40} /></div>;
    if (!game) return <div className="text-center text-gray-500 mt-20">Không tìm thấy game!</div>;

    return (
        <div className="w-full relative pb-20"> {/* Thêm padding bottom cho thoáng trang */}
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
                        <button onClick={() => setIsLiked(!isLiked)} className={`xl:hidden p-3 rounded-2xl border transition flex items-center justify-center ${isLiked ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-gray-400 border-gray-200'}`}><Heart size={24} className={isLiked ? "fill-red-500" : ""} /></button>
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

                    {/* --- THAY ĐỔI 4: PHẦN BÌNH LUẬN (REVIEWS) --- */}
                    <div className="mt-12 pt-10 border-t border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá từ cộng đồng</h3>

                        {/* Form để user nhập bình luận */}
                        <ReviewForm gameId={id} />

                        {/* Danh sách bình luận hiển thị bên dưới */}
                        <div className="mt-8 space-y-4">
                            {reviews.length > 0 ? (
                                reviews.map((rev) => (
                                    <div key={rev.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition hover:shadow-md">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                                    {rev.user.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 leading-none">{rev.user}</p>
                                                    <span className="text-[10px] text-gray-400">{new Date(rev.createdAt).toLocaleDateString('vi-VN')}</span>
                                                </div>
                                            </div>
                                            <div className="flex text-yellow-400 bg-yellow-50 px-2 py-1 rounded-lg">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "text-gray-200"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed ml-1">
                                            {rev.comment}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                                    <p className="text-gray-400 italic">Chưa có bình luận nào. Hãy là người đầu tiên đánh giá!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Cột Sidebar bên phải */}
                <div>
                    <div className="bg-white p-6 rounded-[32px] border border-gray-200 shadow-lg sticky top-4">
                        <img src={game.cover} alt="" className="w-full h-48 object-cover rounded-2xl mb-6 shadow-md" />
                        <div className="flex justify-between items-end mb-6">
                            <div><p className="text-gray-400 line-through text-sm">$99.99</p><p className="text-3xl font-bold text-gray-900">${game.price}</p></div>
                            <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded border border-red-100">-50%</span>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => dispatch(addToCart(game))} className="flex-1 bg-gray-900 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition active:scale-95"><ShoppingBag size={20} /> Add to Cart</button>
                            <button onClick={() => setIsLiked(!isLiked)} className={`w-16 rounded-2xl flex items-center justify-center border transition active:scale-95 ${isLiked ? 'bg-red-50 text-red-500 border-red-200 shadow-md' : 'bg-white border-gray-200 text-gray-400 hover:border-gray-400'}`}><Heart size={24} className={isLiked ? "fill-red-500" : ""} /></button>
                        </div>
                        <div className="mt-6 space-y-3 text-sm text-gray-500 font-medium">
                            <div className="flex justify-between"><span>Developer</span><span className="text-gray-900">{game.developers}</span></div>
                            <div className="flex justify-between"><span>Publisher</span><span className="text-gray-900">{game.publishers}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}