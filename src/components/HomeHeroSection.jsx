import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import API from "../../API/API";

export default function HomeHeroSection() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const { data: searchBooks, isLoading } = useQuery({
    queryFn: async () => {
      if (!search || search.trim() == "") return [];

      const res = await API.get(`/books/search/book/?q=${search.trim()}`);

      return res?.data;
    },
    queryKey: ["searchBooks", search],
  });

  return (
    <section className="hero py-16 md:py-24 h-full">
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

          <div className="w-full relative max-w-2xl">
            <div className="relative mb-[190px]">
              <input
                onChange={(e) => setSearch(e.target.value)}
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
            <div className="absolute top-15 w-full">
              {search &&
                (isLoading ? (
                  <ul className="max-h-60 overflow-y-scroll p-2.5 rounded-lg bg-white">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border-b border-b-gray-300 animate-pulse"
                      >
                        <div>
                          <div className="w-[200px] h-5 bg-gray-200 rounded mb-2"></div>
                          <div className="flex gap-2">
                            <div className="w-24 h-4 bg-gray-200 rounded"></div>
                            <div className="w-20 h-4 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <div className="w-20 h-8 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </ul>
                ) : searchBooks?.length > 0 ? (
                  <ul
                    className="max-h-60 overflow-y-scroll 
      p-2.5 rounded-lg bg-white"
                  >
                    {searchBooks.map((el) => (
                      <li
                        key={el.id}
                        className="flex items-center justify-between p-2 border-b border-b-gray-300"
                      >
                        <div>
                          <h3 className="text-[18px] font-semibold mb-2">
                            {el.name}
                          </h3>
                          <div>
                            <span className="text-[14px] text-gray-400 pr-2 font-medium border-r border-r-gray-400">
                              {el.author}
                            </span>
                            <span className="text-[14px] text-gray-400 pl-2 font-medium">
                              {el.publisher}
                            </span>
                          </div>
                        </div>
                        <div
                          onClick={() => navigate(`/book/${el.id}`)}
                          className="border border-yellow-600 p-[5px_20px] rounded-lg cursor-pointer text-yellow-600 text-[18px]"
                        >
                          visit
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <li className="p-2 text-center mt-10 text-red-500 text-[20px]">
                    No results found
                  </li>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
