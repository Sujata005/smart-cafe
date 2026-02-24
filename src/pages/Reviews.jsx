import { useState, useEffect } from "react";

const Reviews = ({ setPage }) => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const avgRating =
    reviews.length === 0
      ? 0
      : (
        reviews.reduce((sum, r) => sum + Number(r.rating), 0) /
        reviews.length
      ).toFixed(1);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  const submitReview = async () => {
    if (!name || !rating || !comment) {
      alert("Please fill all fields");
      return;
    }

    const response = await fetch("http://localhost:5000/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating, comment })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    setReviews(prev => [...prev, data.review]);
    setName("");
    setRating("");
    setComment("");
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

        <button
          onClick={submitReview}
          className="bg-amber-900 text-white px-4 py-2 rounded-lg"
        >
          Submit Review ⭐
        </button>
      </div>

      {reviews.length === 0 ? (
        <p>No reviews yet 😌</p>
      ) : (
        reviews.map(review => (
          <div
            key={review.id}
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