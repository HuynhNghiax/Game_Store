import { useState } from "react";
import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { postReview } from "../redux/reviewSlice";

export default function ReviewForm({ gameId }) {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        dispatch(postReview({
            productId: gameId, // Liên kết với game hiện tại
            rating,
            comment,
            user: "Guest User",
            createdAt: new Date().toISOString()
        }));

        setComment("");
        setRating(5);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={20}
                        onClick={() => setRating(star)}
                        className={`cursor-pointer transition ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                ))}
            </div>
            <textarea
                className="w-full bg-white border border-gray-200 text-gray-800 p-3 rounded-xl text-sm mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Cảm nhận của bạn về tựa game này..."
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition">
                Gửi bình luận
            </button>
        </form>
    );
}