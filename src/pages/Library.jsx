import { useQuery } from "@tanstack/react-query";
import API from "../../API/API";
import PublicBooksItem from "../components/PublicBooksItem";

export default function Library() {
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
        <div className="m-[40px_0]">
          <h2 className="text-[35px] font-bold mb-5">All Books</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
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
              : books.data.map((book) => (
                  <PublicBooksItem
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
