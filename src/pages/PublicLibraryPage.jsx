import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import PublicBooksItem from "../components/PublicBooksItem";
import API from "../../API/API";

import LibraryImg from "../assets/images/publicImg.jpg";
import BookSkleton from "../components/BookSkleton";

export default function PublicLibraryPage() {
  const params = useParams();

  const { data: library, isLoading } = useQuery({
    queryFn: async () => {
      const res = await API.get(`/libraries/library/${params.libraryId}/`);

      return res;
    },
    queryKey: ["library", params.libraryId],
  });

  const libraryData = library?.data?.results?.library;
  const results = library?.data?.results;

  return (
    <section className="">
      <div className="container">
        <div className="m-[50px_0]">
          <div className="bg-white shadow-2xl rounded-lg p-[25px] mb-[30px] ">
            <h2 className="text-[35px] font-bold mb-5 pb-5 border-b border-b-gray-300">
              Library
            </h2>

            <div className="flex items-center gap-5">
              {isLoading ? (
                <>
                  <div className="w-[300px] h-[300px] rounded-lg bg-gray-200"></div>
                  <div className="">
                    <div className="w-20 mb-6 h-5 rounded-lg bg-gray-200"></div>
                    <div className="w-40 mb-4 rounded-lg h-5 bg-gray-200"></div>
                    <div className="w-40 mb-4 rounded-lg h-5 bg-gray-200"></div>
                    <div className="w-40 mb-4 rounded-lg h-5 bg-gray-200"></div>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={LibraryImg}
                    alt=""
                    className="w-[300px] h-[300px] rounded-lg"
                  />
                  <div className="">
                    <h3 className="text-[18px] font-semibold mb-3">
                      #{libraryData?.user}
                    </h3>
                    <div className="mb-3 flex gap-2 items-center">
                      <i className="text-yellow-600 bi bi-book"></i> Total Books
                      :
                      <p className="text-[18px] font-medium ">
                        {results?.total_books}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center mb-3">
                      <i className="text-yellow-600 bi bi-geo-alt"></i>
                      <p className="text-[16px] font-normal  max-w-[300px]">
                        {libraryData?.address}
                      </p>
                    </div>
                    <div className="mb-3 flex gap-2 items-center">
                      <i className="text-yellow-600 bi bi-telephone-inbound"></i>
                      <a
                        className="underline font-medium text-[18px]"
                        href={`tel:${results?.phone}`}
                      >
                        {results?.phone}
                      </a>
                    </div>
                    <span className="text-[18px] font-medium mb-3 flex gap-2 items-center">
                      {results?.is_active}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="bg-white shadow-2xl rounded-lg p-[25px]">
            <h2 className="text-[30px] mb-[30px] font-bold">Books</h2>
            <div
              className={`${
                results?.books?.length
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                  : isLoading
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                  : ""
              }`}
            >
              {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <BookSkleton key={index} full />
                ))
              ) : results?.books?.length ? (
                results.books.map((el, index) => (
                  <PublicBooksItem
                    index={index}
                    book={el}
                    key={el.id || index}
                    {...el}
                  />
                ))
              ) : (
                <div className="text-center py-10">
                  <i className="bi bi-book text-gray-400 text-6xl mb-4"></i>
                  <p className="text-[26px] font-semibold text-red-500">
                    No books found
                  </p>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
