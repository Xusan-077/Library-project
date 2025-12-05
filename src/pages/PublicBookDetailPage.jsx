import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import API from "../../API/API";

import PublicBooksItem from "../components/PublicBooksItem";

import LibraryImg from "../assets/images/publicImg.jpg";
import publicImg from "../assets/images/book-img.avif";
import BookSkleton from "../components/BookSkleton";
import useLikeStore from "../store/useLikeStore";

export default function PublicBookDetailPage() {
  const navigate = useNavigate();
  const params = useParams();

  const { likesBooks, toggleLike } = useLikeStore();

  const { data: book, isLoading: bookIsLoading } = useQuery({
    queryKey: ["book", params.bookId],
    queryFn: async () => {
      const res = await API.get(`/books/book/${params.bookId}`);

      return res;
    },
  });

  const { data: searchBooksLibrary, isLoading: searchBooksLoading } = useQuery({
    queryFn: async () => {
      const res = await API.get(`/books/search/book/?q=${book?.data?.name}`);
      return res?.data;
    },
    queryKey: ["searchBooksLibrary", book?.data?.name],
  });

  const { data: books, isLoading: booksIsLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books/");

      return res;
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [params]);

  return (
    <section className="">
      <div className="container">
        <div className="">
          <div className="bg-white p-[25px] mb-[30px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg">
            {bookIsLoading ? (
              <div className="">
                <div className="w-[300px] bg-gray-200 h-10 rounded-lg mb-10"></div>

                <div className="flex items-center gap-5">
                  <div className="w-[250px] h-[200px] rounded-lg bg-gray-200"></div>
                  <div className="">
                    <div className="w-20 mb-3 rounded-lg h-[30px] bg-gray-200"></div>
                    <div className="w-[200px] mb-4 rounded-lg h-[35px] bg-gray-200"></div>
                    <div className="w-40 mb-4 rounded-lg h-5 bg-gray-200"></div>
                    <div className="w-40 mb-4 rounded-lg h-5 bg-gray-200"></div>
                    <div className="w-40 rounded-lg h-5 bg-gray-200"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="cursor-pointer absolute  right-5 top-2">
                  <button
                    className="text-[30px]"
                    onClick={(e) => {
                      e.stopPropagation();

                      toggleLike(book?.data);
                    }}
                  >
                    {likesBooks.find((el) => el.id == book?.data?.id) ? (
                      <i className="text-red-500 bi bi-heart-fill"></i>
                    ) : (
                      <i className="bi bi-heart"></i>
                    )}
                  </button>
                </div>

                <h3 className="text-[30px] pb-5 border-b border-b-gray-300 mb-5 font-semibold">
                  book : {book?.data.name}
                </h3>
                <div className="flex items-center gap-5">
                  <img
                    src={publicImg}
                    alt=""
                    className="w-[250px] h-[200px] rounded-lg"
                  />
                  <div className="">
                    <span className="bg-yellow-600 p-[5px_10px] text-white rounded-lg">
                      <span className="">#</span> {book?.data.id}
                    </span>
                    <h3 className="text-[30px] font-semibold">
                      {book?.data.name}
                    </h3>
                    <div className="flex gap-2 items-center mb-2 text-[16px] font-medium">
                      <i className="text-yellow-600 bi bi-person-fill"></i>
                      <div className="flex items-center gap-1">
                        <span className="">Author:</span>
                        <span className="text-[18px] font-semibold">
                          {book?.data.author}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center mb-2 text-[16px] font-medium">
                      <i className="text-yellow-600 bi bi-shop-window"></i>
                      <div className="flex items-center gap-1">
                        <span className="">Publisher:</span>
                        <span className="text-[18px] font-semibold">
                          {book?.data.publisher}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center mb-2 text-[16px] font-medium">
                      <i className="text-yellow-600 bi bi-journal-bookmark-fill"></i>
                      <div className="flex items-center gap-1">
                        <span className="">Quantity:</span>
                        <span className="text-[18px] font-semibold">
                          {book?.data.quantity_in_library}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white shadow-2xl rounded-lg p-5 mb-[30px]">
            <h2 className="text-[35px] font-bold mb-5">In Libraries</h2>
            <ul className="">
              {searchBooksLoading
                ? Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex mb-2.5 items-center gap-5 animate-pulse"
                    >
                      <div className="w-[180px] h-[180px] bg-gray-200 rounded-lg"></div>
                      <div className="flex flex-col gap-4">
                        <div className="w-70 h-4 bg-gray-200 rounded"></div>
                        <div className="w-40 h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))
                : searchBooksLibrary?.slice(0, 3).map((el) => (
                    <li
                      onClick={() => navigate(`/library/${el.library.id}`)}
                      key={el.id}
                      className="bg-white mb-2.5 gap-5 rounded-xl border border-gray-300 p-2.5 cursor-pointer overflow-hidden flex items-center"
                    >
                      <img
                        src={LibraryImg}
                        alt={el.library.name || "Library"}
                        className="w-[180px] rounded-lg h-[180px] object-cover"
                      />
                      <div>
                        <p className="text-gray-600 text-sm mb-5">
                          <span className="text-gray-800 text-[16px] mr-2 font-bold">
                            <i className="text-yellow-700 bi bi-geo-alt"></i>
                          </span>
                          {el.library.address || "Address not available"}
                        </p>
                        {el.quantity_in_library !== undefined && (
                          <p className="text-gray-600 text-sm">
                            <span className="text-gray-800 text-[16px] mr-2 font-bold">
                              Book quantity:
                            </span>
                            {el.quantity_in_library}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
            </ul>
          </div>

          <div className="bg-white p-[25px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg">
            <h2 className="text-[35px] font-bold mb-5">Other Books</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {booksIsLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <BookSkleton key={index} />
                  ))
                : books?.data
                    ?.slice(0, 8)
                    .map((book, index) => (
                      <PublicBooksItem
                        book={book}
                        index={index}
                        library
                        key={book.id}
                        {...book}
                      />
                    ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
