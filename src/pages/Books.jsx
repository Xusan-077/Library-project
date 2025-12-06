import { useQuery } from "@tanstack/react-query";
import API from "../../API/API";
import PublicBooksItem from "../components/PublicBooksItem";
import useThemeStore from "../store/useThemeStore";

export default function Books() {
  const { theme } = useThemeStore();

  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books/");

      return res;
    },
  });

  return (
    <section>
      <div className="container">
        <div
          className={`${
            theme == "light"
              ? "bg-white"
              : "bg-[#131A28] border border-gray-800"
          }  max-[600px]:p-3 shadow-2xl p-[25px] rounded-lg`}
        >
          <h2
            className={`${
              theme == "light" ? "" : "text-white"
            } text-[35px] font-bold mb-5`}
          >
            All Books
          </h2>
          <ul className="grid grid-cols-4 gap-6 max-[1140px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            {isLoading
              ? Array.from({ length: 12 }).map((_, index) => (
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
              : books.data.map((book, index) => (
                  <PublicBooksItem
                    index={index}
                    book={book}
                    library
                    key={book.id}
                    {...book}
                  />
                ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
