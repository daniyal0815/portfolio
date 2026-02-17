const Home = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 pt-32">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Avatar */}
        <img
          src="https://res.cloudinary.com/dbbe8vlaw/image/upload/v1770280872/WhatsApp_Image_2024-01-14_at_1.06.48_AM-removebg-preview_kepklq.png"
          alt="profile"
          className="size-36 rounded-full object-cover shadow-xl shadow-yellow-400/40 ring-2 ring-yellow-400 grayscale transition-all duration-300 hover:scale-105 hover:grayscale-0 mb-12"
        />




        {/* Availability */}
        <div className="mb-4">
          <div className="relative inline-flex items-center gap-3 rounded-full 
                  border border-gray-200 dark:border-gray-700 
                  bg-white dark:bg-black 
                  px-4 py-1.5">

            {/* Ping Dot */}
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>

            {/* Text */}
            <span className="font-mono text-sm text-gray-600 dark:text-gray-300">
              Available for work
            </span>
          </div>
        </div>


        {/* Location */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Currently based in Pakistan — open to relocate
        </p>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Hi I'm{" "}
          <span className="text-pink-600">Daniyal Raza</span> — MERN Stack Developer building scalable, high-performance web applications.
        </h1>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mt-6">
          I craft fast, secure, and user-focused products using MongoDB, Express, React, Tailwind CSS and Node.js, with clean architecture, smooth UX, and production-ready code.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-10 justify-center">
          <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition">
            Get in touch →
          </button>

          <button className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            View projects →
          </button>

          <button className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Download CV ↓
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
