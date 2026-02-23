const Home = ({setPage}) => {
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
        className="bg-amber-900 text-white px-6 py-3 rounded-xl shadow-md hover:bg-amber-800 hover:shadow-lg transition-all duration-300"
      >
        View Menu
      </button>
    </div>
  );
};

export default Home;