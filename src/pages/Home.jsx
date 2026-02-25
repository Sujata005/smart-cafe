import { useEffect, useState } from "react";

const backgrounds = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
];

const Home = ({ setPage }) => {
  const [reviews, setReviews] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // Fetch reviews ✅
  useEffect(() => {
    fetch("https://smart-cafe-tiz3.onrender.com/reviews")
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error("Failed to load reviews", err));
  }, []);

  // Cinematic background rotation ✨
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % backgrounds.length);
    }, 5000); // slower = cinematic

    return () => clearInterval(interval);
  }, []);

  // Slow parallax on scroll ✨
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">

      {/* Background with parallax */}
      <img
        src={backgrounds[bgIndex]}
        alt="Cafe background"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out"
        style={{
          transform: `translateY(${offsetY * 0.2}px) scale(1.05)`,
          opacity: 0.9,
        }}
      />

      {/* Warm Animated Gradient Overlay ✨ */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/40 via-orange-100/30 to-amber-200/40 animate-pulse" />

      {/* Soft Blur Layer */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 text-amber-900">

        <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to HiGa ☕
        </h2>

        <p className="text-amber-800 mb-6 tracking-wide">
          Scan • Order • Relax
        </p>

        <button
          onClick={() => setPage("menu")}
          className="bg-amber-900 text-white px-6 py-3 rounded-xl shadow-md hover:bg-amber-800 hover:shadow-xl transition-all duration-300 mb-10"
        >
          View Menu
        </button>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">
            What Our Customers Say ⭐
          </h2>

          {reviews.length === 0 ? (
            <p className="text-amber-800/70">No reviews yet 😌</p>
          ) : (
            <div className="grid gap-4">
              {reviews.slice(0, 3).map(review => (
                <div
                  key={review.id}
                  className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-md"
                >
                  <h3 className="font-semibold">
                    {review.name} — {"⭐".repeat(review.rating)}
                  </h3>
                  <p className="text-amber-900/80 text-sm">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setPage("reviews")}
          className="mt-6 bg-amber-900 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
        >
          Leave a Review ⭐
        </button>
      </div>
    </div>
  );
};

export default Home;