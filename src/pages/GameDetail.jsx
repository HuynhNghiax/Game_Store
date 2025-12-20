import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { fetchProducts } from '../redux/productSlice';
import { fetchReviews, deleteReview, updateReview } from '../redux/reviewSlice';
import ReviewForm from "../components/ReviewForm";
import { ArrowLeft, ShoppingBag, Star, Heart, Loader, Pencil, Trash2 } from 'lucide-react';

export default function GameDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Lấy dữ liệu từ store
    const { user } = useSelector(state => state.auth);
    const { items: games, status } = useSelector(state => state.products);
    const { list: reviews } = useSelector(state => state.reviews);

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchProducts());
        dispatch(fetchReviews(id));
    }, [id, status, dispatch]);

    const game = games.find((g) => g.id == id);

    // Hàm xử lý Xóa bình luận
    const handleDelete = (reviewId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đánh giá này không?")) {
            dispatch(deleteReview(reviewId));
        }
    };

    // Hàm xử lý Sửa bình luận
    const handleEdit = (review) => {
        const newComment = prompt("Chỉnh sửa bình luận của bạn:", review.comment);
        if (newComment && newComment.trim() !== "") {
            dispatch(updateReview({
                id: review.id,
                data: { comment: newComment }
            }));
        }
    };

    if (status === 'loading') return <div className="flex h-[50vh] items-center justify-center"><Loader className="animate-spin text-blue-600" size={40} /></div>;
    if (!game) return <div className="text-center text-gray-500 mt-20">Không tìm thấy game!</div>;

    return (
        <div className="w-full relative pb-20">
            {/* Banner Section */}
            <div className="w-full h-[300px] rounded-[32px] overflow-hidden relative mb-8 shadow-md">
                <img src={game.cover} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <Link to="/" className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-800 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white transition font-bold shadow-sm">
                    <ArrowLeft size={18} /> Back
                </Link>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-6">
                    {/* Game Info Headers */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 mb-2">{game.name}</h1>
                            <div className="flex gap-3 text-gray-500 text-sm font-medium">
                                <span className="bg-white border border-gray-200 px-3 py-1 rounded-lg flex items-center gap-2 shadow-sm">
                                    <Star size={14} className="text-yellow-500 fill-yellow-500" /> {game.rating}
                                </span>
                                <span className="bg-white border border-gray-200 px-3 py-1 rounded-lg shadow-sm">{game.genre}</span>
                                <span className="bg-white border border-gray-200 px-3 py-1 rounded-lg shadow-sm">{game.release}</span>
                            </div>
                        </div>
                        <button onClick={() => setIsLiked(!isLiked)} className={`xl:hidden p-3 rounded-2xl border transition flex items-center justify-center ${isLiked ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-gray-400 border-gray-200'}`}>
                            <Heart size={24} className={isLiked ? "fill-red-500" : ""} />
                        </button>
                    </div>

                    <div className="prose max-w-none text-gray-600 leading-relaxed">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">About</h3>
                        <p>{game.desc}</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Gallery</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {game.footage && game.footage.map((img, idx) => (
                                <img key={idx} src={img} className="rounded-2xl hover:opacity-90 transition cursor-pointer h-40 object-cover w-full shadow-sm" alt="" />
                            ))}
                        </div>
                    </div>

                    {/* --- PHẦN BÌNH LUẬN (REVIEWS) --- */}
                    <div className="mt-12 pt-10 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-gray-900">Đánh giá cộng đồng</h3>
                            <div className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
                                {reviews.length} nhận xét
                            </div>
                        </div>

                        {/* Form nhập liệu */}
                        <ReviewForm gameId={id} />

                        {/* Danh sách bình luận */}
                        <div className="mt-10 space-y-6">
                            {reviews.length > 0 ? (
                                [...reviews] // clone mảng để không mutate Redux
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .map((rev) => (
                                    <div key={rev.id} className="group bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-start gap-4">
                                                {/* Avatar Gradient tròn */}
                                                <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner border-2 border-white">
                                                    {rev.user ? rev.user.charAt(0).toUpperCase() : "U"}
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold text-gray-900 text-base">{rev.user || "Người dùng"}</p>
                                                        {rev.userId === user?.id && (
                                                            <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md font-bold uppercase">Bạn</span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-gray-400 font-medium">
                                                        {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString('vi-VN') : "Gần đây"}
                                                    </p>
                                                    <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                                        {rev.comment}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Rating & Action Buttons */}
                                            <div className="flex flex-col items-end gap-3">
                                                <div className="flex text-yellow-400 bg-yellow-50/50 px-2 py-1 rounded-lg">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "text-gray-200"} />
                                                    ))}
                                                </div>

                                                {/* Nút sửa/xóa - Chỉ hiện khi là chủ nhân bình luận */}
                                                {rev.userId === user?.id && (
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <button
                                                            onClick={() => handleEdit(rev)}
                                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                                            title="Sửa bình luận"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(rev.id)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                                            title="Xóa bình luận"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400 font-medium">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Section */}
                <div>
                    <div className="bg-white p-6 rounded-[32px] border border-gray-200 shadow-lg sticky top-4">
                        <img src={game.cover} alt="" className="w-full h-48 object-cover rounded-2xl mb-6 shadow-md" />
                        <div className="flex justify-between items-end mb-6">
                            <div><p className="text-gray-400 line-through text-sm">$99.99</p><p className="text-3xl font-bold text-gray-900">${game.price}</p></div>
                            <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded border border-red-100">-50%</span>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => dispatch(addToCart(game))} className="flex-1 bg-gray-900 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition active:scale-95">
                                <ShoppingBag size={20} /> Add to Cart
                            </button>
                            <button onClick={() => setIsLiked(!isLiked)} className={`w-16 rounded-2xl flex items-center justify-center border transition active:scale-95 ${isLiked ? 'bg-red-50 text-red-500 border-red-200 shadow-md' : 'bg-white border-gray-200 text-gray-400 hover:border-gray-400'}`}>
                                <Heart size={24} className={isLiked ? "fill-red-500" : ""} />
                            </button>
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