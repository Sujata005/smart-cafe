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
  const [fade, setFade] = useState(true);

  // Reviews
  useEffect(() => {
    fetch("https://smart-cafe-tiz3.onrender.com/reviews")
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(() => {});
  }, []);

  // Cinematic background rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setBgIndex(prev => (prev + 1) % backgrounds.length);
        setFade(true);
      }, 1800);
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <img
        src={backgrounds[bgIndex]}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover
        transition-all duration-[3500ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        ${fade ? "opacity-100 scale-105" : "opacity-0 scale-110"}`}
      />

      {/* Warm cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b 
        from-black/45 via-[#6b3f2a]/10 to-black/55" />

      {/* Soft radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,210,170,0.15),transparent_60%)]" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Ambient floating blur */}
      <div className="absolute w-[500px] h-[500px] bg-amber-200/20 blur-[140px] rounded-full top-[-100px] left-[-120px]" />
      <div className="absolute w-[400px] h-[400px] bg-orange-200/20 blur-[120px] rounded-full bottom-[-120px] right-[-80px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Hero Card */}
        <div className="
          backdrop-blur-2xl
          bg-white/40
          border border-white/20
          shadow-[0_30px_90px_rgba(60,30,10,0.25)]
          rounded-3xl
          px-12 md:px-16
          py-14 md:py-18
          w-full max-w-md sm:max-w-xl
        ">

          {/* Korean Logo */}
          <h1
            style={{ fontFamily: "Noto Sans KR" }}
            className="text-3xl text-[#4A2F27] mb-2 tracking-wide text-5xl font-bold text-amber-900 drop-shadow-md"
          >
            히가
          </h1>

          {/* Main Heading */}
          <h2 className="
            text-5xl md:text-6xl
            font-semibold
            tracking-tight
            text-[#4A2F27]
            leading-tight text-5xl font-bold text-amber-900 drop-shadow-md 
          ">
            Welcome to <span className="italic">HiGa</span> ☕
          </h2>

          {/* Tagline */}
          <p className="
            mt-5
            text-[#4A2F27]/70
            text-lg
            tracking-wide
          ">
            Scan • Order • Relax
          </p>

          {/* Divider */}
          <div className="
            w-24 h-[1px]
            bg-gradient-to-r from-transparent via-[#4A2F27]/40 to-transparent
            mx-auto my-8
          " />

          {/* CTA */}
          <button
            onClick={() => setPage("menu")}
            className="
              premium-btn
            bg-amber-900 text-white
              px-6 sm:px-8
  py-3
  rounded-xl
  text-sm sm:text-base
  w-full sm:w-auto

            "
          >
            <span className="relative z-10 tracking-wide">
              View Menu
            </span>

            <div className="
              absolute inset-0 rounded-xl
              opacity-0 group-hover:opacity-100
              transition duration-500
              bg-gradient-to-r from-amber-600/40 to-orange-400/40
              blur-xl
            " />
          </button>
        </div>

        {/* Reviews */}
        <div className="mt-24 w-full max-w-xl">

          <h3 className="text-2xl font-medium text-white mb-8 drop-shadow">
            What Our Customers Say ⭐
          </h3>

          {reviews.length === 0 ? (
            <p className="text-amber-200/80">No reviews yet 😌</p>
          ) : (
            <div className="grid gap-5">
              {reviews.slice(0, 3).map(review => (
                <div
                  key={review.id}
                  className="
                    bg-white/75
                    backdrop-blur-xl
                    p-5
                    rounded-2xl
                    shadow-[0_15px_50px_rgba(0,0,0,0.35)]
                    text-left
                  "
                >
                  <h4 className="font-semibold text-[#4A2F27]">
                    {review.name} — {"⭐".repeat(review.rating)}
                  </h4>
                  <p className="text-[#4A2F27]/70 text-sm mt-1">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Secondary Button */}
        <button
          onClick={() => setPage("reviews")}
          className="
            mt-10
            px-8 py-2.5
            rounded-full
            bg-white/20
            backdrop-blur-md
            text-white
            shadow-md
            hover:bg-white/40
            transition-all duration-300
          "
        >
          Leave a Review ⭐
        </button>
      </div>
    </div>
  );
};

export default Home;