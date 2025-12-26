import React, { useState } from "react";
import { Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { postReview } from "../redux/reviewSlice";
import { Link } from "react-router-dom";

interface ReviewFormProps {
    gameId: number | string;
}

export default function ReviewForm({ gameId }: ReviewFormProps) {
    const dispatch = useAppDispatch();

    // Lấy thông tin từ Redux Store với Type an toàn
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const { list: reviews } = useAppSelector((state) => state.reviews);

    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState<string>("");

    // Xác định tên hiển thị
    const displayName =
        user?.username ||
        user?.name ||
        user?.email?.split("@")[0] ||
        "Người dùng";

    // Kiểm tra xem user hiện tại đã đánh giá chưa
    const hasReviewed = reviews.some(
        (rev) => String(rev.userId) === String(user?.id) && String(rev.productId) === String(gameId)
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim() || !user) return;

        dispatch(
            postReview({
                productId: gameId,
                userId: user.id,
                user: displayName,
                rating,
                comment,
                createdAt: new Date().toISOString(),
            })
        );

        setComment("");
        setRating(5);
    };

    // 1. Nếu chưa đăng nhập
    if (!isAuthenticated) {
        return (
            <div className="mt-6 p-8 bg-gradient-to-br from-gray-50 to-blue-50/30 border-2 border-dashed border-gray-200 rounded-[32px] text-center">
                <p className="text-gray-500 mb-4 font-medium text-lg">
                    Chia sẻ ý kiến của bạn về tựa game này
                </p>
                <Link
                    to="/login"
                    className="inline-block bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-lg"
                >
                    Đăng nhập để đánh giá
                </Link>
            </div>
        );
    }

    // 2. Nếu đã đánh giá rồi (Nếu bạn muốn hiện form LUÔN LUÔN thì xóa đoạn if này)
    if (hasReviewed) {
        return (
            <div className="mt-6 p-6 bg-green-50/50 border border-green-100 rounded-[32px] flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    ✓
                </div>
                <p className="text-green-700 font-bold">
                    Bạn đã gửi đánh giá cho tựa game này. Cảm ơn đóng góp của bạn!
                </p>
            </div>
        );
    }

    // 3. Form bình luận
    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-100/50 relative"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {(user?.username || user?.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm font-black text-gray-900 leading-none">
                            {displayName}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">Đang viết đánh giá</p>
                    </div>
                </div>

                <div className="flex gap-1.5 bg-gray-50 px-3 py-2 rounded-2xl border border-gray-100">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={18}
                            onClick={() => setRating(star)}
                            className={`cursor-pointer transition-all duration-300 ${
                                star <= rating
                                    ? "text-yellow-400 fill-yellow-400 scale-110"
                                    : "text-gray-300 hover:text-yellow-200"
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="relative group">
        <textarea
            className="w-full bg-gray-50/80 border-2 border-transparent text-gray-800 p-5 rounded-[24px] text-sm min-h-[120px] focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 placeholder:text-gray-400 shadow-inner"
            placeholder="Hãy để lại cảm nhận của bạn về tựa game này..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        />
            </div>

            <div className="flex justify-end mt-4">
                <button
                    type="submit"
                    className="bg-gray-900 hover:bg-blue-600 text-white font-bold px-10 py-3.5 rounded-2xl transition-all active:scale-95 shadow-lg shadow-gray-200 hover:shadow-blue-200 flex items-center gap-2"
                >
                    Gửi bình luận
                </button>
            </div>
        </form>
    );
}