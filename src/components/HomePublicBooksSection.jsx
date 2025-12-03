import { useQuery } from "@tanstack/react-query";
import API from "../../API/API";
import PublicBooksItem from "./PublicBooksItem";

export default function HomePublicBooksSection() {
  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books/");

      return res;
    },
  });

  return (
    <section className="">
      <div className="container">
        <div className="mb-10">
          <h2 className="text-[30px] text-gray-700 font-semibold mb-5 ml-2">
            most read books
          </h2>

          <div className="overflow-hidden max-w-7xl mx-auto">
            <ul className="public-list flex gap-5 items-center pb-4">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <li key={index} className="min-w-[250px] animate-pulse">
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
                    <PublicBooksItem book={book} key={book.id} {...book} />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
