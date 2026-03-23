import { useState, useEffect } from "react";
import { apiFetch } from "../api";

const Reviews = ({ setPage }) => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const avgRating =
    reviews.length === 0
      ? 0
      : (
        reviews.reduce((sum, r) => sum + Number(r?.rating || 0), 0) /
        reviews.length
      ).toFixed(1);

  useEffect(() => {
    apiFetch("/reviews")
      .then(data => setReviews(data))
      .catch(() => {});
  }, []);

  const submitReview = async () => {
    if (!name || name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      setError("Select a rating between 1 and 5.");
      return;
    }

    if (!comment || comment.trim().length < 5) {
      setError("Comment must contain at least 5 characters.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await apiFetch("/reviews", {
        method: "POST",
        body: {
          name,
          rating: Number(rating),
          comment,
        },
      });

      setReviews(prev => [...prev, data]);
      setName("");
      setRating("");
      setComment("");
    } catch (e) {
      setError(e.message || "Failed to post review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Reviews ⭐</h1>
      <p className="mb-4 text-gray-600">
         Average Rating ⭐ <span className="font-semibold">{avgRating}</span>
      </p>
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded-lg w-full mb-2"
        />

        <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer text-2xl transition ${
                        star <= rating ? "scale-110" : "opacity-40"
                    }`}
                >
                    ⭐
                </span>
            ))}
        </div>
        <p className="text-sm text-gray-500 mb-2">
            Selected: {rating || 0} ⭐
        </p>
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="border p-2 rounded-lg w-full mb-3"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={submitReview}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white ${loading ? "bg-amber-500 cursor-not-allowed" : "bg-amber-900"}`}
        >
          {loading ? "Submitting..." : "Submit Review ⭐"}
        </button>
      </div>

      {reviews.length === 0 ? (
        <p>No reviews yet 😌</p>
      ) : (
        reviews.map(review => (
          <div
            key={review._id || review.id}
            className="bg-white p-4 rounded-xl shadow-md mb-4 hover:shadow-lg transition"
          >
            <h2 className="bg-white p-4 rounded-xl shadow-md mb-4 hover:shadow-lg transition animate-fade-in">
              {review.name} — {"⭐".repeat(review.rating)}
            </h2>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))
      )}

      <button
        onClick={() => setPage("home")}
        className="mt-6 border border-amber-900 text-amber-900 px-4 py-2 rounded-lg"
      >
        Back to Café ☕
      </button>
    </div>
  );
};

export default Reviews;