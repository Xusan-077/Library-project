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

      return res?.data;
    },
  });

  const [pageSize, setPageSize] = useState(8);
  const [pageNum, setPageNum] = useState(0);

  const start = pageNum * pageSize;
  const end = start + pageSize;

  const pagination = books?.slice(start, end);

  const totalPages = Math.ceil((books?.length || 0) / pageSize);

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

          <div className="mt-5 flex flex-wrap gap-10 items-center justify-center">
            <select
              className={`${
                theme == "light" ? "" : "text-gray-300 bg-gray-800"
              } py-1 px-3`}
              onChange={(e) => {
                setPageSize(+e.target.value);
                setPageNum(0);
              }}
            >
              {[8, 16, 24, 32].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-5 items-center justify-center">
              <button
                disabled={pageNum === 0}
                onClick={() => setPageNum((p) => p - 1)}
                className={`${
                  theme === "light" ? "text-gray-800" : "text-gray-300"
                } disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-[18px]`}
              >
                prev
              </button>

              <p
                className={`${
                  theme == "light" ? "text-black" : "text-gray-200"
                }`}
              >
                {pageNum + 1} / {totalPages}
              </p>

              <button
                disabled={pageNum === totalPages - 1}
                onClick={() => setPageNum((p) => p + 1)}
                className={`${
                  theme === "light" ? "text-gray-800" : "text-gray-300"
                } disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-[18px]`}
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
