import { useQuery } from "@tanstack/react-query";
import PublicBooksItem from "../components/PublicBooksItem";
import API from "../../API/API";
import { useState } from "react";

export default function MyBooks() {
  const accessToken = localStorage.getItem("access");

  const [addBookFirst, setAddBookFirst] = useState(false);

  const { data: myBooks, isLoading } = useQuery({
    queryFn: async () => {
      const res = API.get("/libraries/library/books", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res;
    },
    queryKey: ["myBooks"],
    enabled: !!accessToken,
  });

  return (
    <section className="mb-auto">
      <button
        onClick={() => {
          addBookFirst == true ? setAddBookFirst(false) : setAddBookFirst(true);
        }}
        className="fixed z-1 max-[425px]:right-2 max-[425px]:bottom-2  bg-yellow-700 cursor-pointer active:opacity-90 transition-all duration-300 rounded-lg shadow bottom-[30px] right-[30px] p-[8px_0] max-w-[150px] flex items-center justify-center gap-3 w-full"
      >
        <span className="">
          <i className="text-white bi bi-file-earmark-plus"></i>
        </span>
        <span className="text-[18px] text-white">Add book</span>
      </button>

      {addBookFirst && (
        <div className="fixed bottom-20 right-7 bg-white p-[10px_15px] shadow-2xl rounded-lg max-w-[250px] w-full">
          <button className="flex items-center gap-3 p-[10px_0] cursor-pointer">
            <span className="">
              <i className="text-yellow-700 bi bi-journal-arrow-up"></i>
            </span>
            <span className="text-[18px]">Add one book</span>
          </button>
          <button className="flex items-center gap-3 p-[10px_0] cursor-pointer">
            <span className="">
              <i className="text-yellow-700 bi bi-folder"></i>
            </span>
            <span className="text-[18px]">Add several books</span>
          </button>
          <button className="flex items-center gap-3 p-[10px_0] cursor-pointer">
            <span className="">
              <i className="text-yellow-700 bi bi-filetype-exe"></i>
            </span>
            <span className="text-[18px]">load from exe file</span>
          </button>
        </div>
      )}

      <div className="container">
        <div className="bg-white max-[600px]:p-3 shadow-2xl p-[25px] rounded-lg">
          <h2 className="text-[35px] font-bold mb-5">My Books</h2>
          <ul className="grid grid-cols-4 gap-6 max-[1140px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            {isLoading ? (
              Array.from({ length: 12 }).map((_, index) => (
                <li key={index} className="min-w-[250px]">
                  <div className="mb-3 rounded-lg bg-gray-200 h-[280px]"></div>
                  <div className="px-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </li>
              ))
            ) : myBooks?.data?.length > 0 ? (
              myBooks.data.map((book, index) => (
                <PublicBooksItem
                  index={index}
                  book={book}
                  key={book.id}
                  {...book}
                />
              ))
            ) : (
              <div className="">
                <p className="text-center justify-center text-red-600 text-[40px]">
                  No Books Yet
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
