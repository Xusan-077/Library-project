export default function HomeHeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center leading-tight">
            Discover Endless Worlds of <br className="hidden sm:block" />
            Knowledge, Stories
          </h1>

          <p className="text-base md:text-lg font-medium max-w-2xl text-center text-gray-600 ">
            Welcome to a place where curiosity meets discovery. Our library is
            more than just books on shelves—it's a vibrant community hub where
            learners of all ages come together to explore, create, and grow.
            Whether you're diving into the latest bestseller, researching for
            your next big project, or simply finding a quiet corner to escape
            into another world, we're here to support your journey.
          </p>

          <div className="w-full max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search your book here..."
                className="w-full h-14 pl-6 pr-14 border-2 border-gray-300 rounded-full 
                     focus:border-yellow-600 focus:outline-none transition-colors
                     text-base placeholder:text-gray-400"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 
                     bg-yellow-700 hover:bg-yellow-800 text-white rounded-full 
                     w-10 h-10 flex items-center justify-center transition-colors"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
