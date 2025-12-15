import { useState } from "react";
import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addReview } from "../redux/reviewSlice";

export default function ReviewForm() {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        dispatch(addReview({
            rating,
            comment,
            user: "Guest"
        }));

        setComment("");
        setRating(5);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3 bg-gray-900 p-3 rounded-lg">
            <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={18}
                        onClick={() => setRating(star)}
                        className={`cursor-pointer ${
                            star <= rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-500"
                        }`}
                    />
                ))}
            </div>

            <textarea
                className="w-full bg-gray-800 text-white p-2 rounded text-sm mb-2"
                placeholder="Viết đánh giá..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-1 rounded">
                Gửi đánh giá
            </button>
        </form>
    );
}
