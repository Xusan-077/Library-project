import { useQuery } from "@tanstack/react-query";
import API from "../../API/API";
import PublicBooksItem from "../components/PublicBooksItem";
import useThemeStore from "../store/useThemeStore";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Books() {
  const { theme } = useThemeStore();
  const { t } = useTranslation();

  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books/");
      return res;
    },
  });

  const [pageSize, setPageSize] = useState(8);
  const [pageNum, setPageNum] = useState(0);

  const start = pageNum * pageSize;
  const end = start + pageSize;

  const pagination = books?.data.slice(start, end);

  const totalPages = Math.ceil((books?.data.length || 0) / pageSize);

  return (
    <section>
      <div className="container">
        <div
          className={`${
            theme === "light"
              ? "bg-white"
              : "bg-transparent border border-gray-800"
          } max-[600px]:p-3 shadow-2xl p-[25px] rounded-lg`}
        >
          <h2
            className={`${
              theme === "light" ? "" : "text-white"
            } text-[35px] font-bold mb-5`}
          >
            {t("books.title")}
          </h2>

          <ul className="grid grid-cols-4 gap-6 max-[1140px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
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
              : pagination?.map((book, index) => (
                  <PublicBooksItem
                    index={index}
                    book={book}
                    library
                    key={book.id}
                    {...book}
                  />
                ))}
          </ul>

          <div className="mt-5 flex gap-10 items-center justify-center  flex-wrap">
            <div className="">
              <select
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPageNum(0);
                }}
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="24">24</option>
                <option value="32">32</option>
              </select>
            </div>
            <div className="flex gap-5 items-center justify-center flex-wrap">
              <button
                disabled={pageNum === 0}
                onClick={() => setPageNum((p) => p - 1)}
                className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 text-[18px] font-semibold"
              >
                prev
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  onClick={() => setPageNum(index)}
                  className={`p-2 cursor-pointer w-[35px] rounded-lg border-gray-300 font-medium ${
                    pageNum === index ? "bg-yellow-700 text-white" : ""
                  } border`}
                  key={index}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={pageNum === totalPages - 1}
                onClick={() => setPageNum((p) => p + 1)}
                className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 text-[18px] font-semibold"
              >
                next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
