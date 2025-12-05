import { useState } from "react";
import PublicBooksItem from "../components/PublicBooksItem";
import useLikeStore from "../store/useLikeStore";

import LibraryImg from "../assets/images/publicImg.jpg";
import { useNavigate } from "react-router-dom";

export default function Likes() {
  const [toggle, setToggle] = useState("books");

  const { likesBooks, likesLibraries, toggleLibraryLike } = useLikeStore();
  const navigate = useNavigate();

  return (
    <section className="">
      <div className="container">
        <div className="">
          <h2 className="text-[35px] font-bold mb-5">My Favarites</h2>
          <div className="bg-white shadow-2xl p-[25px] rounded-lg">
            <div className="flex items-center mb-5 pb-5 border-b-gray-300 border-b">
              <button
                onClick={() => setToggle("books")}
                className={`pb-2 ${
                  toggle === "books" ? "border-b-2 border-yellow-700" : ""
                } flex gap-5 p-[10px_0] max-w-[200px] justify-center w-full`}
              >
                <span className="">
                  <i className="text-yellow-700 bi bi-journal"></i>
                </span>
                My favarite books
              </button>
              <button
                onClick={() => setToggle("libraries")}
                className={`pb-2 ${
                  toggle === "libraries" ? "border-b-2 border-yellow-700" : ""
                } flex gap-5 p-[10px_0] max-w-[200px] justify-center w-full`}
              >
                <span className="">
                  <i className="text-yellow-700 bi bi-journal-bookmark-fill"></i>
                </span>
                My favarite libraries
              </button>
            </div>
            <div className="">
              {toggle == "books" ? (
                <>
                  {likesBooks.length == 0 && (
                    <div className="text-center py-10">
                      <i className="bi bi-book text-gray-400 text-[100px] mb-4"></i>
                      <p className="text-[30px] font-semibold text-red-500">
                        Your Favarite Books Not Yet
                      </p>
                    </div>
                  )}
                  <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                    {likesBooks.map((book, index) => (
                      <PublicBooksItem
                        index={index}
                        book={book}
                        key={book.id}
                        {...book}
                      />
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  {likesLibraries.length == 0 && (
                    <div className="text-center py-10">
                      <i className="bi bi-book text-gray-400 text-[100px] mb-4"></i>
                      <p className="text-[30px] font-semibold text-red-500">
                        Your Favarite libraries Not Yet
                      </p>
                    </div>
                  )}
                  <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                    {likesLibraries.map((libraryItem, index) => (
                      <li
                        onClick={() => navigate(`/library/${libraryItem.id}`)}
                        key={index}
                        className="bg-white relative cursor-pointer rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                      >
                        <div className="cursor-pointer absolute right-5 bottom-4">
                          <button
                            className="text-[20px] text-white"
                            onClick={(e) => {
                              e.stopPropagation();

                              toggleLibraryLike(libraryItem);
                            }}
                          >
                            {likesLibraries.find(
                              (el) => el.id === libraryItem.id
                            ) ? (
                              <i className="text-red-500 bi bi-heart-fill"></i>
                            ) : (
                              <i className="text-black bi bi-heart"></i>
                            )}
                          </button>
                        </div>
                        <img
                          src={LibraryImg}
                          alt={libraryItem.name || "Library"}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                            <span className="text-gray-800 text-[16px] mr-2 font-bold">
                              Library name:
                            </span>
                            <br />
                            {libraryItem.name || "Library Name"}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                            <span className="text-gray-800 text-[16px] mr-2 font-bold">
                              Location:
                            </span>
                            {libraryItem.address || "Address not available"}
                          </p>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                            <span className="text-gray-800 text-[16px] mr-2 font-bold">
                              Location:
                            </span>
                            {libraryItem.total_books || "books not yet"}
                          </p>
                          {libraryItem.books_count !== undefined && (
                            <p className="text-gray-600 text-sm mb-3">
                              <span className="text-gray-800 text-[16px] mr-2 font-bold">
                                Books:
                              </span>
                              {libraryItem.books_count}
                            </p>
                          )}
                          <span className="text-gray-600 text-sm">
                            {libraryItem.is_active ? (
                              <div className="bg-green-500 text-center p-[5px_0] rounded-lg text-white w-[100px]">
                                Active
                              </div>
                            ) : (
                              <div className="bg-red-500 text-center p-[5px_0] rounded-lg text-white w-[130px]">
                                Not active
                              </div>
                            )}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
