import { useEffect, useState } from "react";
const Home = ({setPage}) => {
  const [reviews, setReviews] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/reviews")
    .then(res => res.json())
    .then(data => setReviews(data));
}, []);
  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6 max-w-2xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
        Welcome to HiGa ☕
      </h2>

      <p className="text-amber-700 mb-6">
        Scan • Order • Relax
      </p>

      <button 
        onClick={() => setPage("menu")}
        className="bg-amber-900 text-white px-6 py-3 rounded-xl shadow-md hover:bg-amber-800 hover:shadow-lg transition-all duration-300 mb-10"
      >
        View Menu
      </button>
      <div className="mt-16">
  <h2 className="text-2xl font-bold mb-4">
    What Our Customers Say ⭐
  </h2>

  {reviews.length === 0 ? (
    <p className="text-gray-500">No reviews yet 😌</p>
  ) : (
    <div className="grid gap-4">
      {reviews.slice(0, 3).map(review => (
        <div
          key={review.id}
          className="bg-white p-4 rounded-xl shadow-md"
        >
          <h3 className="font-semibold">
            {review.name} — {"⭐".repeat(review.rating)}
          </h3>
          <p className="text-gray-600 text-sm">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
<button
  onClick={() => setPage("reviews")}
  className="mt-6 bg-amber-900 text-white px-4 py-2 rounded-lg"
>
  Leave a Review ⭐
</button>
    </div>
  );
};

export default Home;